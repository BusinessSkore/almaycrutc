<template v-show="!cargando">
  <Navbar />
  <!-- {{ this.totales }} -->
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <div v-show="!cargando" class="general">
    <form>
      <!---------------------------------------- Start Dashboard por Usuario ---------------------------------------->
      <fieldset>
        <!-- <h4>
          <i class="fas fa-file-spreadsheet" _mstvisible="2"></i> Dashboard
        </h4> -->
        <div class="form-group">
          <div class="grid">
            <!------------------------------------------ Campo ------------------------------------------>
            <div
              v-show="!cargando"
              v-if="this.$store.state.user.type == 'Power User'"
              class="card bg-secondary"
              style="max-width: 40rem;"
            >
              <div class="card-header">
                <p>Cantidad de Mejoras por Estatus</p>
              </div>
              <div class="card-body">
                <p
                  v-for="(tipoMejora, index) in mejorasPend"
                  :key="index"
                  class="card-text"
                >
                  {{ tipoMejora._id.estatus }} : {{ tipoMejora.count }}
                </p>
              </div>
            </div>

            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div
              v-show="!cargando"
              v-if="this.$store.state.user.type == 'Power User'"
              class="card bg-secondary"
              style="max-width: 40rem;"
            >
              <div class="card-header"><p>Cantidad de Usuarios por Rol</p></div>
              <div class="card-body">
                <p
                  v-for="(item, index) in usuariosCant"
                  :key="index"
                  class="card-text"
                >
                  {{ item._id.role }} : {{ item.count }}
                </p>
              </div>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div
              v-show="!cargando"
              v-if="
                this.$store.state.user.type == 'Power User' ||
                  this.$store.state.user.type == 'Administrador'
              "
              class="card bg-secondary"
              style="max-width: 40rem;"
            >
              <div class="card-header">
                <p>Cantidad de Facturas por Estatus</p>
              </div>
              <div class="card-body">
                <table id="customers">
                  <tr>
                    <th>Estatus</th>
                    <th>Cant.</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="(item, index) in facturasCant" :key="index">
                    <td :class="toColor(item._id.status)">
                      {{ item._id.status }}
                    </td>
                    <td class="ta-r">{{ formatNumber(item.count) }}</td>
                    <td class="ta-r">
                      {{ formatNumber(item.cobertura, true) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="ta-r">
                      {{ formatNumber(this.totales.facturas) }}
                    </td>
                    <td class="ta-r">
                      {{ formatNumber(this.totales.cobertura, true) }}
                    </td>
                  </tr>
                </table>

                <!-- <p
                  v-for="(item, index) in facturasCant"
                  :key="index"
                  class="card-text"
                >
                  {{ item._id.status }} : {{ item.count }} :
                  {{ item.cobertura }}
                </p> -->
              </div>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
          </div>
        </div>
      </fieldset>
      <!---------------------------------------- Finish Dashboard por Usuario ---------------------------------------->
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { getMejPend } from "@/services/cuetasporcobrarcj/MejoraService";
import { getUsuariosCant } from "@/services/cuetasporcobrarcj/UsuarioService";
import { getfacturasCant } from "@/services/cuetasporcobrarcj/FacturaService";
import numeral from "numeral";
import Pusher from "pusher-js";
export default {
  name: "DashboardView",
  components: {
    Navbar,
  },

  data() {
    return {
      usuariosCant: [] as any,
      facturasCant: [] as any,
      mejorasPend: [] as any,
      totales: {} as any,
      cargando: false,
    };
  },

  methods: {
    toColor(type: string) {
      if (type == "1 - Recibido por Auditoría Interna") {
        return "valor1";
      } else if (type == "2 - Verificado por Auditoría Interna") {
        return "valor2";
      } else if (type == "3 - Verificado por Auditoría Externa") {
        return "valor3";
      } else if (type == "4 - Recibido por Reclamaciones Médicas") {
        return "valor4";
      } else if (type == "5 - Verificado por Reclamaciones Médicas") {
        return "valor5";
      } else if (type == "6 - Cargado a Lote") {
        return "valor6";
      } else if (type == "7 - Enviado a la Aseguradora") {
        return "valor7";
      } else if (type == "Todos") {
        return "Todos";
      }
    },

    valorTotal() {
      this.totales.facturas = this.facturasCant.reduce(
        (accum: any, item: any) => accum + item.count,
        0
      );

      this.totales.cobertura = this.facturasCant.reduce(
        (accum: any, item: any) => accum + item.cobertura,
        0
      );
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("ec64cab5b5fa0b45d374", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadfacturasCant2();
        this.player.src = this.song.src;
        this.player.play();
      });
      // End pusher subscribe
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    async loadMejorasPendientes() {
      // this.toggleLoading();
      try {
        const res = await getMejPend();
        this.mejorasPend = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadUsuariosCant() {
      // this.toggleLoading();
      try {
        const res = await getUsuariosCant();
        this.usuariosCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadfacturasCant() {
      this.toggleLoading();
      try {
        const res = await getfacturasCant();
        this.facturasCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadfacturasCant2() {
      // this.toggleLoading();
      try {
        const res = await getfacturasCant();
        this.facturasCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },
  },

  mounted() {
    this.loadMejorasPendientes();
    this.loadUsuariosCant();
    this.loadfacturasCant();
    this.pusherSubscribe();
  },

  updated() {
    this.valorTotal();
  },
};
</script>

<style lang="css" scoped>
.valor1 {
  text-align: left;
  background-color: rgb(255, 0, 0);
  margin: 1px;
  color: white;
}

.valor2 {
  text-align: left;
  background-color: rgb(255, 64, 0);
  margin: 1px;
  color: white;
}

.valor3 {
  text-align: left;
  background-color: rgb(255, 128, 0);
  margin: 1px;
  color: white;
}

.valor4 {
  text-align: left;
  background-color: rgb(255, 192, 0);
  margin: 1px;
  color: white;
}

.valor5 {
  text-align: left;
  background-color: rgb(171, 187, 26);
  margin: 1px;
  color: white;
}

.valor6 {
  text-align: left;
  background-color: rgb(86, 182, 53);
  margin: 1px;
  color: white;
}

.valor7 {
  text-align: left;
  background-color: rgb(0, 176, 80);
  margin: 1px;
  color: white;
}

.ta-r {
  text-align: right;
}
/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 3px;
  cursor: pointer;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(51, 163, 67);
  color: white;
}

td,
th {
  font-size: 75%;
}

p {
  font-size: 75%;
  margin: 0;
}
/* -------------------------------Structure... -------------------------------*/
h4 {
  text-align: center;
}
* {
  margin: 0;
}

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
}
/* -------------------------------**********-------------------------------*/
/* -------------------------------Loading... -------------------------------*/

@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: rgb(5, 24, 250);
  border-radius: 50%;
  content: "";
  height: 90px;
  width: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}

.img {
  pointer-events: none;
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/
</style>
