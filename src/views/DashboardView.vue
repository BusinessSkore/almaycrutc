<template v-show="!cargando">
  <Navbar />
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
              class="card bg-secondary mb-3"
              style="max-width: 20rem;"
            >
              <div class="card-header">Cantidad de Mejoras por Estatus</div>
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
              class="card bg-secondary mb-3"
              style="max-width: 20rem;"
            >
              <div class="card-header">Cantidad de Usuarios por Rol</div>
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
              class="card bg-secondary mb-3"
              style="max-width: 20rem;"
            >
              <div class="card-header">Cantidad de Reportes por Tipo</div>
              <div class="card-body">
                <p
                  v-for="(item, index) in reportesCant"
                  :key="index"
                  class="card-text"
                >
                  {{ item._id.type }} : {{ item.count }}
                </p>
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
import { getReportesCant } from "@/services/cuetasporcobrarcj/ReporteService";
import numeral from "numeral";
export default {
  name: "DashboardView",
  components: {
    Navbar,
  },

  data() {
    return {
      usuariosCant: [] as any,
      reportesCant: [] as any,
      mejorasPend: [] as any,
      totales: {} as any,
      cargando: false,
    };
  },

  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },

    formatNumber2(value: number) {
      return numeral(value).format("0,0");
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

    async loadReportesCant() {
      // this.toggleLoading();
      try {
        const res = await getReportesCant();
        this.reportesCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },
  },

  mounted() {
    this.loadMejorasPendientes();
    this.loadUsuariosCant();
    this.loadReportesCant();
  },
};
</script>

<style lang="css" scoped>
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
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
