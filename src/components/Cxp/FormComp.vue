<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <!-- {{ this.empleados }} -->

  <div>
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>

    <div v-show="!cargando" class="general">
      <h6 :class="isError(error)">{{ error }}</h6>
      <form>
        <fieldset>
          <h6>{{ encabezado }}</h6>
          <label class="form-label"><b>Datos de la Cuenta por Pagar</b></label>
          <div class="form-group">
            <div class="grid">
              <!-- Start Fields -->
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha:</label
                ><input
                  id="fecha"
                  type="date"
                  v-model="cxp.fecha"
                  class="form-control"
                />
              </div>
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="pagoNo"
                  >Pago:</label
                ><input
                  id="pagoNo"
                  type="number"
                  v-model="cxp.pagoNo"
                  class="form-control"
                />
              </div> -->
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><select
                  id="empleado"
                  v-model="cxp.empleado"
                  class="form-select"
                >
                  <option
                    v-for="(empleado, index) in empleados"
                    :key="index"
                    :value="empleado.nombre"
                    >{{ empleado.nombre }}</option
                  >
                </select>
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="valor"
                  >Valor:</label
                ><input
                  id="valor"
                  type="number"
                  v-model="cxp.valor"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="origen"
                  >Orígen:</label
                ><select id="origen" v-model="cxp.origen" class="form-select">
                  <option>Producción</option>
                  <option>Insentivo</option>
                  <option>Salario</option>
                </select>
              </div>
            </div>
          </div>

          <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="saveCxp()"
            :disabled="!cxp.fecha || !cxp.empleado || !cxp.valor || !cxp.origen"
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!cxp.fecha || !cxp.empleado || !cxp.valor || !cxp.origen"
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="showDelete"
            class="btn btn-danger"
            @click.prevent="handleDelete()"
          >
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Cxp } from "@/interfaces/Cxp";
import { Funcion } from "@/interfaces/Funcion";
import { Empleado } from "@/interfaces/Empleado";
import { getEmpleados } from "@/services/almaycru/Empleado";
import {
  createCxp,
  eliminateCxps,
  createCxpa,
  getOneCxp,
  deleteCxp,
  getCxp,
  updateCxp,
} from "@/services/almaycru/Cxp";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "cxps-form",
  components: {
    Navbar,
  },
  data() {
    return {
      empleados: [] as Empleado[],
      campoFocus: "empleado",
      mensageError: "Error",
      mensageExito: "Cuenta por Pagar Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Cuenta por Pagar?",
      encabezado: "",
      modoForm: "",
      funciones: [] as Funcion[],
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "Ronnald",
        message: "Hola",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      cxp: {} as Cxp,
      oneCxp: {} as Cxp,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showDelete: false,
      currentActivity: "",
      estado: {} as object,
    };
  },

  async mounted() {
    if (this.$route.fullPath == "/cxps/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Cuenta por Pagar";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Cuenta por Pagar";
    }

    if (this.modoForm == "add") {
      this.cxp.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadCxp(this.$route.params.id);
      }
      this.fixTime();
    }

    this.focus();
    this.loadEmpleados();
  },

  methods: {
    async loadEmpleados() {
      this.toggleLoading();
      try {
        const res = await getEmpleados();
        this.empleados = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    fixTime() {
      this.cxp.fecha = this.formatDateToFix(this.cxp.fecha, false);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-D");
      }
    },

    async loadCxp(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getCxp(id);
        this.cxp = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async handleUpdate() {
      // this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.cxp.userMod = this.$store.state.user.usuario;
          await updateCxp(this.$route.params.id, this.cxp);
          this.addMessage();
          this.$router.push("/cxps");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteCxp(this.$route.params.id);
            this.addMessage();
            this.$router.push("/cxps");
          }
        } catch (error) {
          //console.error(error);
        }
      }
    },

    showDeleteMethod() {
      if (this.$store.state.user.type == "Power User") {
        this.showDelete = true;
      }
    },

    toggleShowDatosPadre() {
      this.showDatosPadre = !this.showDatosPadre;
    },
    toggleShowDatosMadre() {
      this.showDatosMadre = !this.showDatosMadre;
    },
    toggleShowDatosTutor() {
      this.showDatosTutor = !this.showDatosTutor;
    },

    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    isError(message: string) {
      if (message == this.mensageExito) {
        return "success";
      } else {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcCxp() {
      (this.cxp.retension = this.cxp.bruto * 0.1),
        (this.cxp.neto = this.cxp.bruto * 0.9);
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

    fillFields() {
      this.cxp.fecha = this.formatDate(new Date());
    },

    async loadOneCxp() {
      try {
        const res = await getOneCxp();
        this.oneCxp = res.data;
        this.one = this.oneCxp[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.cxp.no = this.nextNo;
        this.cxp.principal = this.nextNo;
        this.cxp.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveCxpa() {
      await this.loadOneCxp();
      try {
        const res = await createCxpa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveCxp() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneCxp();
          this.oneCxp = res.data;
          this.one = this.oneCxp[0];
          this.nextNo = this.one.no + 1;
          this.cxp.no = this.nextNo;
          this.cxp.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.cxp.userReg = this.$store.state.user.usuario;
        const res = await createCxp(this.cxp).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
          }
        );
        // this.$router.push("/cxps/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllCxps() {
      try {
        const res = await eliminateCxps(this.cxp);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.cxp.fecha = "";
      this.cxp.empleado = "";
      this.cxp.valor = "";
      this.cxp.origen = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById(this.campoFocus).focus();
    },
  },
});
</script>

<style lang="css" scoped>
/* Start Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* End Transition */

/* <!-------------------------------------------------- Menú --------------------------------------------------> */
* {
  box-sizing: border-box;
}

#btn-mas {
  display: none;
}
.container {
  position: fixed;
  bottom: 0%;
  left: 80%;
  z-index: 100;
}
.redes a,
.btn-mas label {
  display: block;
  text-decoration: none;
  color: #fff;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
  transition: all 500ms ease;
}
.redes a:hover {
  background: #fff;
  color: #2780e3;
}
.redes a {
  margin-bottom: -15px;
  opacity: 0;
  visibility: hidden;
}
#btn-mas:checked ~ .redes a {
  margin-bottom: 10px;
  opacity: 1;
  visibility: visible;
}
.btn-mas label {
  cursor: pointer;
  background: #2780e3;
  font-size: 23px;
}
#btn-mas:checked ~ .btn-mas label {
  transform: rotate(135deg);
  font-size: 25px;
  background-color: grey;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

/* <!----------------------------------------------------------------------------------------------------------> */

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
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
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
  color: white;
  /* font-weight: bold; */
  text-align: center;
  background-color: rgb(147, 147, 147);
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(0, 0, 0);
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

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

.success {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 255, 0);
}
</style>
