<template v-show="!cargando">
  <Navbar />
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <div v-show="!cargando" class="general">
    <div v-show="showAlert" class="alert alert-dismissible alert-success">
      <button
        @click="toggleAlert()"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
      ></button>
      <h4 class="alert-heading">
        <i class="fas fa-check"></i> Mejora Actualizada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h6>Detalles de Mejora</h6>
        <div class="form-group">
          <label class="form-label"><b>Datos Generales</b></label>
          <!-- Start Fields -->
          <div class="grid">
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="title"
                >Título:</label
              ><input
                id="title"
                type="title"
                v-model="mejora.title"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="description"
                >Descripción:</label
              ><input
                id="description"
                type="description"
                v-model="mejora.description"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="type"
                >Tipo:</label
              ><select
                id="type"
                type="type"
                v-model="mejora.type"
                class="form-select"
              >
                <option>Error</option>
                <option>Mejora</option>
                <option>Función</option>
              </select>
            </div>
            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="estatus"
                >Estatus:</label
              ><select
                id="estatus"
                type="estatus"
                v-model="mejora.estatus"
                class="form-select"
              >
                <option>Pendiente</option>
                <option>Listo</option>
              </select>
            </div> -->
          </div>
          <!-- End Fields -->
        </div>
        <div class="grid">
          <button
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!mejora.title || !mejora.description || !mejora.type"
          >
            <i class="fas fa-edit"></i> Actualizar
          </button>
          <button class="btn btn-danger" @click.prevent="handleDelete()">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Mejora } from "@/interfaces/Mejora";
import {
  deleteMejora,
  getMejora,
  updateMejora,
} from "@/services/cuetasporcobrarcj/MejoraService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "mejora-list",
  components: {
    Navbar,
  },
  data() {
    return {
      showAlert: false,
      cargando: false,
      clienteSelected: [],
      medicoSelected: [],
      mejora: {} as Mejora,
      estado: {} as object,
    };
  },
  methods: {
    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    async facturar() {
      this.mejora.cantPrefactura = 0;
      this.mejora.cantFactura = 1;
      this.mejora.credito = 0;
      this.mejora.debito = 0;
      this.mejora.subTipo = "Factura";
      this.mejora.factura = this.mejora.prefactura;
      this.mejora.prefactura = 0;
      await this.selectCliente(this.mejora.descCliente);
      this.mejora.literal = this.clienteSelected[0].tipoComprobante.substring(
        0,
        3
      );
      await this.selectMedico(this.mejora.medico);
      if (this.mejora.literal == "B15") {
        this.mejora.ncf = this.medicoSelected[0].compGuberAsig;
        this.mejora.vencimiento = this.medicoSelected[0].fechGuberAsig;
        this.mejora.fechaNCF = new Date();
      } else {
        this.mejora.ncf = this.medicoSelected[0].compNoGuberAsig;
        this.mejora.vencimiento = this.medicoSelected[0].fechNoGuberAsig;
        this.mejora.fechaNCF = new Date();
      }
      this.handleUpdate();
    },
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fixTime() {
      this.mejora.fechaProceso = this.formatDate(this.mejora.fechaProceso);
      this.mejora.fechaEfectivo = this.formatDate(this.mejora.fechaEfectivo);
      this.mejora.fechaVence = this.formatDate(this.mejora.fechaVence);
    },

    async loadMejora(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getMejora(id);
        this.mejora = data;
        this.estado = this.mejora.estado;
        this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },
    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.mejora.userMod = this.$store.state.user.usuario;
          await updateMejora(this.$route.params.id, this.mejora);
          if (this.mejora.literal == "B15") {
            this.medicoSelected[0].compGuberAsig += 1;
          } else {
            this.medicoSelected[0].compNoGuberAsig += 1;
          }
          this.$router.push("/mejoras");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      this.toggleAlert();
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteMejora(this.$route.params.id);
          this.$router.push("/mejoras");
        }
      } catch (error) {
        //console.error(error);
      }
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadMejora(this.$route.params.id);
    }
  },
});
</script>

<style lang="css" scoped>
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
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

h6 {
  color: rgb(5, 24, 250);
  font-weight: bold;
  text-align: center;
}

h5 {
  font-size: 90%;
  color: rgb(51, 163, 67);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  background-color: white;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 4px;
  padding: 2%;
}

legend {
  color: rgb(5, 24, 250);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
}

legend {
  margin: 0;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  color: black;
  border-radius: 7px;
}

.ta-l {
  text-align: left;
}

label {
  text-align: center;
}

.col-form-label {
  font-weight: bold;
  line-height: 0;
}

/* button {
  background-color: rgb(51, 163, 67);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
} */

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
  /* opacity: 0.7; */
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.input-r {
  text-align: right;
}
</style>
