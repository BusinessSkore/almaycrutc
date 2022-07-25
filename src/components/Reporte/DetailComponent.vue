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
        <i class="fas fa-check"></i> Reporte Actualizada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h4>
          <i class="fas fa-file-alt" _mstvisible="2"></i> Detalle de Reporte
        </h4>
        <div class="form-group">
          <label class="form-label"><b>Datos Generales</b></label>
          <!-- Start Fields -->
          <div class="grid">
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="description"
                >Descripción:</label
              ><input
                id="description"
                type="description"
                v-model="this.reporte.description"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="description"
                >Detalles:</label
              ><input
                id="description"
                type="description"
                v-model="this.reporte.detalles"
                class="form-control"
              />
            </div>
            

            <!-- <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="solicitante"
                >Solicitante:</label
              ><select
                disabled
                id="solicitante"
                type="solicitante"
                v-model="reporte.solicitante"
                class="form-select"
              >
                <option v-for="(usuario, index) in usuarios" :key="index">{{
                  usuario.nombre
                }}</option>
              </select>
            </div> -->

            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="type"
                >Tipo:</label
              ><select
                id="type"
                type="type"
                v-model="reporte.type"
                class="form-select"
              >
                <option>Soporte</option>
                <option>Servicio</option>
                <option>Asistencia</option>
              </select>
            </div>

            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="solicitado"
                >Asignar a:</label
              ><select
                disabled
                id="solicitado"
                type="solicitado"
                v-model="reporte.solicitado"
                class="form-select"
              >
                <option v-for="(usuario, index) in usuarios" :key="index">{{
                  usuario.nombre
                }}</option>
              </select>
            </div>

            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="type"
                >Status:</label
              ><select
                disabled
                id="type"
                type="type"
                v-model="reporte.status"
                class="form-select"
              >
                <option>Reportado</option>
                <option>Recibido</option>
                <option>Evaluado</option>
                <option>Priorizado</option>
                <option>Inicializado</option>
                <option>Detenido</option>
                <option>Concluído</option>
                <option>Entregado</option>
                <option>Seguido</option>
                <option>Validado</option>
              </select>
            </div>
          </div>
          <!-- End Fields -->
        </div>
        <div class="grid">
          <button
            class="btn btn-success btn-sm"
            @click.prevent="handleUpdate()"
            :disabled="!reporte.description || !reporte.type"
          >
            <i class="fas fa-edit"></i> Actualizar
          </button>
          <button class="btn btn-danger btn-sm" @click.prevent="handleDelete()">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { createMensaje } from "@/services/almaycru/ChatService";
import { defineComponent } from "vue";
import { getUsuarios } from "@/services/almaycru/UsuarioService";
import { Reporte } from "@/interfaces/Reporte";
import { Usuario } from "@/interfaces/Usuario";
import {
  getReportes,
  deleteReporte,
  getReporte,
  updateReporte,
} from "@/services/almaycru/ReporteService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "reporte-list",
  components: {
    Navbar,
  },
  data() {
    return {
      usuarios: [] as Usuario[],
      message: {
        username: "R",
        message: "H",
      },
      reportes: [] as Reporte[],
      showAlert: false,
      cargando: false,
      clienteSelected: [],
      medicoSelected: [],
      reporte: {} as Reporte,
      estado: {} as object,
    };
  },
  methods: {
    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    async loadReportes() {
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
    },
    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    async facturar() {
      this.reporte.cantPrefactura = 0;
      this.reporte.cantFactura = 1;
      this.reporte.credito = 0;
      this.reporte.debito = 0;
      this.reporte.subTipo = "Factura";
      this.reporte.factura = this.reporte.prefactura;
      this.reporte.prefactura = 0;
      await this.selectCliente(this.reporte.descCliente);
      this.reporte.literal = this.clienteSelected[0].tipoComprobante.substring(
        0,
        3
      );
      await this.selectMedico(this.reporte.medico);
      if (this.reporte.literal == "B15") {
        this.reporte.ncf = this.medicoSelected[0].compGuberAsig;
        this.reporte.vencimiento = this.medicoSelected[0].fechGuberAsig;
        this.reporte.fechaNCF = new Date();
      } else {
        this.reporte.ncf = this.medicoSelected[0].compNoGuberAsig;
        this.reporte.vencimiento = this.medicoSelected[0].fechNoGuberAsig;
        this.reporte.fechaNCF = new Date();
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
      this.reporte.fechaProceso = this.formatDate(this.reporte.fechaProceso);
      this.reporte.fechaEfectivo = this.formatDate(this.reporte.fechaEfectivo);
      this.reporte.fechaVence = this.formatDate(this.reporte.fechaVence);
    },

    async loadReporte(id: string) {
      this.toggleLoading();
      this.loadReportes();
      try {
        const { data } = await getReporte(id);
        this.reporte = data;
        this.estado = this.reporte.estado;
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
          this.reporte.userMod = this.$store.state.user.usuario;
          await updateReporte(this.$route.params.id, this.reporte);
          if (this.reporte.literal == "B15") {
            this.medicoSelected[0].compGuberAsig += 1;
          } else {
            this.medicoSelected[0].compNoGuberAsig += 1;
          }
        }
      } catch (error) {
        //console.error(error);
      }
      await this.addMessage();
      this.toggleLoading();
      this.$router.push("/reportes");
      // this.toggleAlert();
    },
    async handleDelete() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          await deleteReporte(this.$route.params.id);
          this.$router.push("/reportes");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      await this.addMessage();
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    async loadUsuarios() {
      // this.toggleLoading();
      try {
        const res = await getUsuarios();
        this.usuarios = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadReporte(this.$route.params.id);
    }
    this.loadUsuarios();
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
  color: rgb(0, 0, 0);
  font-weight: bold;
  text-align: center;
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  background-color: white;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  border-radius: 4px;
  padding: 2%;
}

legend {
  color: rgb(0, 0, 0);
  text-align: center;
}

input,
select,
textreporte {
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
  background-color: rgb(147, 147, 147);
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
  border-bottom-color: rgb(0, 0, 0);
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
