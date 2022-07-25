<template v-show="!cargando">
  <Navbar />
  <!-- {{ this.usuarios }} -->
  <!-- ["Manuel Rosario"] -->
  <!-- {{ this.asignarADetalles }}<br />
  {{ this.asignarADetalles2 }} <br />
  {{ this.reporte.solicitadoAll }} -->
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
        <i class="fas fa-check"></i> Reporte Registrado Exitosamente!
      </h4>
    </div>
    <div>
      <fieldset>
        <h4><i class="fas fa-file-alt" _mstvisible="2"></i> Nuevo Reporte</h4>
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
                for="detalles"
                >Detalles:</label
              ><input
                id="detalles"
                type="detalles"
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
                id="solicitado"
                type="solicitado"
                v-model="reporte.solicitado"
                @change="defGroup(reporte.solicitado)"
                class="form-select"
              >
                <option v-for="(usuario, index) in usuarios" :key="index">{{
                  usuario.nombre
                }}</option>
              </select>
            </div>

            <!-- <div>
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
            </div> -->
          </div>
          <!-- End Fields -->
        </div>
        <div class="d-grid gap-2">
          <button
            :disabled="
              !reporte.description ||
                !reporte.type ||
                !reporte.solicitado ||
                !reporte.solicitadoAll
            "
            class="btn btn-success btn-sm"
            @click.prevent="saveReporte()"
            type="button"
          >
            <i v-show="cargando2" class="fas fa-spinner" _mstvisible="2"></i>
            Guardar
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Reporte } from "@/interfaces/Reporte";
import { getReportes } from "@/services/almaycru/ReporteService";
import { createMensaje } from "@/services/almaycru/ChatService";
import {
  getUsuariosByUser,
  getUsuariosAsignar,
} from "@/services/almaycru/UsuarioService";
import { Usuario } from "@/interfaces/Usuario";
import {
  createReporte,
  eliminateReportes,
  createReportea,
  getOneReporte,
} from "@/services/almaycru/ReporteService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "reportes-form",
  components: {
    Navbar,
  },
  data() {
    return {
      asignarADetalles: [],
      asignarADetalles2: [],
      usuarios: [] as Usuario[],
      usuario: {} as Usuario,
      usuario2: {} as Usuario,
      message: {
        username: "R",
        message: "H",
      },
      reportes: [] as Reporte[],
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      cargando2: false,
      reporte: {} as Reporte,
      oneReporte: {} as Reporte,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",
    };
  },

  mounted() {
    this.reporte.solicitante = this.$store.state.user.usuario;
    this.usuario.nombre = this.$store.state.user.usuario;
    this.loadReportes();
    this.defFields();
    this.focus();
    this.loadUsuariosByUser();
  },

  methods: {
    defGroup(nombre: string) {
      this.usuario2.nombre = nombre;
      this.loadUsuariosAsignar();
    },

    async loadUsuariosAsignar() {
      this.toggleLoading2();
      try {
        const res = await getUsuariosAsignar(this.usuario2);
        this.asignarADetalles = res.data;

        // Convertir Array de Objetos en Array de Strings
        this.asignarADetalles2 = [];
        this.asignarADetalles2.push(this.reporte.solicitado);
        let i;
        for (i = 0; i <= this.asignarADetalles.length - 1; i++) {
          this.asignarADetalles2.push(this.asignarADetalles[i].nombre);
        }

        this.reporte.solicitadoAll = this.asignarADetalles2;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading2();
    },

    async loadUsuariosByUser() {
      this.toggleLoading();
      try {
        const res = await getUsuariosByUser(this.usuario);
        this.usuarios = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    async loadReportes() {
      this.toggleLoading();
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcReporte() {
      (this.reporte.retension = this.reporte.bruto * 0.1),
        (this.reporte.neto = this.reporte.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    defFields() {
      this.reporte.status = "Reportado";
      this.reporte.no = 1;
    },

    async loadOneReporte() {
      try {
        const res = await getOneReporte();
        this.oneReporte = res.data;
        this.one = this.oneReporte[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.reporte.no = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveReportea() {
      await this.loadOneReporte();
      try {
        const res = await createReportea(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveReporte() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneReporte();
          this.oneReporte = res.data;
          this.one = this.oneReporte[0];
          this.nextNo = this.one.no + 1;
          this.reporte.no = this.nextNo;
          this.reporte.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.reporte.userReg = this.$store.state.user.usuario;
        const res = await createReporte(this.reporte);
        // this.$router.push("/reportes/");
      } catch (error) {
        // // console.error(error);
      }
      await this.definingFields();
      await this.defFields();
      await this.addMessage();
      this.toggleAlert();
      await this.toggleLoading();
      document.getElementById("description").focus();
    },

    async deleteAllReportes() {
      try {
        const res = await eliminateReportes(this.reporte);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      this.reporte.description = "";
      this.reporte.type = "";
      this.reporte.detalles = "";
      this.reporte.solicitado = "";
      this.reporte.solicitadoAll = [];
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    toggleLoading2() {
      this.cargando2 = !this.cargando2;
    },

    focus() {
      document.getElementById("description").focus();
    },
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
