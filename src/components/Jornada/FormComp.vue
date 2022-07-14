<template v-show="!cargando">
  <!-- {{ this.jornada }} -->
  <div>
    <Navbar />
    <div v-if="showModal7" class="modal7">
      <div class="contenedor7">
        <header>Empleados</header>
        <div class="contenido7">
          <label @click="this.showModalMethod7()" for="btn-modal">X</label>
          <div class="contenido7">
            <div>
              <input
                id="search"
                type="search"
                v-model="search"
                class="form-control"
                @keypress="buscar()"
              />
            </div>
            <div>
              <p
                style="cursor: pointer"
                v-for="(seguro, index) in seguros2"
                :key="index"
                @click="setSeguro(seguro, index)"
              >
                {{ seguro.nombre }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <label class="form-label"><b>Datos de la Jornada</b></label>
          <div class="form-group">
            <div class="grid">
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha:</label
                ><input
                  :disabled="this.modoForm == 'show'"
                  id="fecha"
                  type="datetime-local"
                  v-model="jornada.fecha"
                  class="form-control"
                  @change="fechaCxp(jornada.fecha)"
                />
              </div>
            </div>
          </div>

          <div>
            <h4>
              Empleados
              <i
                @click="this.showModalMethod7()"
                style="cursor:pointer"
                class="fas fa-plus"
                _mstvisible="2"
              ></i>
            </h4>
          </div>
          <div>
            <ul>
              <li v-for="(empleado, index) in jornada.empleados" :key="index">
                <i
                  v-if="this.modoForm == 'add'"
                  @click.prevent="deleteService(index)"
                  style="cursor:pointer"
                  class="fas fa-minus-circle redOption"
                ></i>
                {{ empleado }}
              </li>
            </ul>
          </div>
          <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="saveJornada()"
            :disabled="!jornada.fecha || !jornada.empleados"
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
import { Jornada } from "@/interfaces/Jornada";
import { Funcion } from "@/interfaces/Funcion";
import { Vitola } from "@/interfaces/Vitola";
import { Empleado } from "@/interfaces/Empleado";
import { getPeg, getMez, getEmp } from "@/services/almaycru/Empleado";
import { getLigas } from "@/services/almaycru/Liga";
import { getEmpleados } from "@/services/almaycru/Empleado";
import {
  createJornada,
  eliminateJornadas,
  createJornadaa,
  getOneJornada,
  deleteJornada,
  getJornada,
  updateJornada,
} from "@/services/almaycru/Jornada";
import { createCxp, getOneCxp } from "@/services/almaycru/Cxp";
import { getVitolas } from "@/services/almaycru/Vitola";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import { Cxp } from "@/interfaces/Cxp";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "jornadas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      seguros2: [],
      seguros: [
        "NINGUNO",
        "ARS CMD",
        "MAPFRE SALUD ARS, S.A.",
        "FUTURO",
        "META SALUD",
        "YUNEN",
        "RESERVAS",
        "MONUMENTAL",
        "ASEMAP",
        "ARS APS S A",
        "SIMAG",
        "RENACER",
        "GRUPO MEDICO ASOCIADO",
        "PRIMERA ARS DE HUMANO",
        "UNIVERSAL",
        "HUMANO SEGUROS",
        "SENASA CONTRIBUTIVO",
        "SENASA SUBSIDIADO",
        "SEMMA",
        "IDOPPRIL",
        "ARS UASD",
        "OTRA",
      ],
      search: "",
      showModal7: false,
      oneCxp: {} as Cxp,
      cxp: {} as Cxp,
      vitolaSelected: [],
      vitolas: [] as Vitola[],
      empleados: [] as Empleado[],
      empleadosEmp: [] as Empleado[],
      empleadosPeg: [] as Empleado[],
      empleadosMez: [] as Empleado[],
      campoFocus: "empleados",
      mensageError: "Error",
      mensageExito: "Jornada Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Jornada?",
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
      jornada: {} as Jornada,
      oneJornada: {} as Jornada,
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
    this.jornada.empleados = [];
    this.loadEmpleados();
    // this.fillEmpleados();
    if (this.$route.fullPath == "/jornadas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Jornada";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Jornada";
    }

    if (this.modoForm == "add") {
      this.jornada.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadJornada(this.$route.params.id);
      }
      this.fixTime();
    }

    // this.focus();
    // this.loadEmpleados();
    this.loadLigas();
    this.loadVitolas();
    this.filterEmpleados();
  },

  methods: {
    fechaCxp(fech: Date) {
      this.cxp.fecha = fech;
      this.fixTime();
    },

    deleteService(it: any) {
      if (confirm("Está Seguro que desea Eliminar Este Empleado?")) {
        this.jornada.empleados.splice(it, 1);
      }
    },

    setSeguro(seguro: Empleado) {
      if (this.jornada.empleados.includes(seguro.nombre)) {
        alert("Empleado ya Registrado");
      } else {
        this.jornada.empleados.push(seguro.nombre);
        // this.showModalMethod7();
        this.search = "";
      }
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: Empleado) => {
          return seguro.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0].nombre + "?")) {
          this.setSeguro(this.seguros2[0]);
        }
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
    },

    valorTotal() {
      this.totales.empleados = this.empleados.length;
      // this.totales.reclamacion = this.reclams.reduce(
      //   (accum: any, item: any) => accum + item.reclamacion,
      //   0
      // );

      // this.totales.documentos3 = this.reclams2.length;
      // this.totales.reclamacion3 = this.reclams2.reduce(
      //   (accum: any, item: any) => accum + item.reclamacion,
      //   0
      // );
    },

    async loadEmpleados() {
      this.toggleLoading();
      try {
        const res = await getEmpleados();
        this.seguros = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    // fillEmpleados() {
    //   this.jornada.empleados = [];
    //   this.jornada.empleados.push("Ronnald");
    //   this.jornada.empleados.push("Anabel");
    // },

    calcValor() {
      this.cxp.valor =
        (this.vitolaSelected[0].pago / 50) * this.jornada.cantidad;
    },

    async saveCxp() {
      // this.toggleLoading();
      try {
        try {
          const res = await getOneCxp();
          this.oneCxp = res.data;
          this.one = this.oneCxp[0];
          this.nextNo = this.one.no + 1;
          this.cxp.no = this.nextNo;
          // this.cxp.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.cxp.userReg = this.$store.state.user.usuario;

        const res = await createCxp(this.cxp);
        // this.$router.push("/cxps/");
      } catch (error) {
        // // console.error(error);
      }
      // await this.toggleLoading();
      // if (this.error !== this.mensageError) {
      //   await this.cleanFields();
      // }
      // await this.fillFields();
      // document.getElementById(this.campoFocus).focus();
      // this.toggleAlert();
    },

    selectVitola(term: string) {
      this.vitolaSelected = this.vitolas.filter((vitola: Vitola) => {
        return vitola.descripcion.toLowerCase().includes(term.toLowerCase());
      });
      this.cxp.valor =
        (this.vitolaSelected[0].pago / 50) * this.jornada.cantidad;
    },

    async filterEmpleados() {
      this.toggleLoading();
      try {
        const res = await getPeg();
        this.empleadosPeg = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getEmp();
        this.empleadosEmp = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getMez();
        this.empleadosMez = res.data;
      } catch (error) {
        // console.error(error);
      }

      this.toggleLoading();
    },

    async loadLigas() {
      // this.toggleLoading();
      try {
        const res = await getLigas();
        this.empleadoss = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadVitolas() {
      // this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    // async loadEmpleados() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getEmpleados();
    //     this.empleados = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    fixTime() {
      this.jornada.fecha = this.formatDateToFix(this.jornada.fecha, true);
      this.cxp.fecha = this.formatDateToFix(this.cxp.fecha, true);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadJornada(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getJornada(id);
        this.jornada = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.jornada.userMod = this.$store.state.user.usuario;
          await updateJornada(this.$route.params.id, this.jornada);
          this.addMessage();
          this.$router.push("/jornadas");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteJornada(this.$route.params.id);
            this.addMessage();
            this.$router.push("/jornadas");
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
    calcJornada() {
      (this.jornada.retension = this.jornada.bruto * 0.1),
        (this.jornada.neto = this.jornada.bruto * 0.9);
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
      this.jornada.fecha = new Date();
      // this.jornada.cantidad = 0;
      // this.jornada.monos = 0;
      // this.jornada.empleadoMezclador = "ROBERTO EPIFANIO CABRERA SANTOS";
      this.cxp.fecha = new Date();
    },

    async loadOneJornada() {
      try {
        const res = await getOneJornada();
        this.oneJornada = res.data;
        this.one = this.oneJornada[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.jornada.no = this.nextNo;
        this.jornada.principal = this.nextNo;
        this.jornada.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveJornadaa() {
      await this.loadOneJornada();
      try {
        const res = await createJornadaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveJornada() {
      if (this.jornada.empleados.length == 0) {
        alert("Asegúrece de Agregar Empleados a la Jornada");
      } else {
        this.toggleLoading();
        try {
          try {
            const res = await getOneJornada();
            this.oneJornada = res.data;
            this.one = this.oneJornada[0];
            this.nextNo = this.one.no + 1;
            this.jornada.no = this.nextNo;
          } catch (error) {
            // // console.error(error);
          }
          this.jornada.userReg = this.$store.state.user.usuario;
          this.cxp.origen = "Jornada";
          this.cxp.valor = 600;
          let i: number;
          for (i = 0; i <= this.jornada.empleados.length - 1; i++) {
            this.cxp.empleado = this.jornada.empleados[i];
            await this.saveCxp();
          }

          const res = await createJornada(this.jornada).then(
            (res: { data: { title: any } }) => {
              this.error = this.respuesta = res.data.title;
              // this.$router.push("/");
              this.res = res;
              this.respuesta = res.data;
              this.addMessage();
            },
            (err: { response: { data: { error: any } } }) => {
              // console.log(err.response);
              this.error = err.response.data.error;
            }
          );
          // this.$router.push("/jornadas/");
        } catch (error) {
          // // console.error(error);
        }
        await this.toggleLoading();
        if (this.error !== this.mensageError) {
          await this.cleanFields();
        }
        await this.fillFields();
        // document.getElementById(this.campoFocus).focus();
        this.toggleAlert();
      }
    },

    async deleteAllJornadas() {
      try {
        const res = await eliminateJornadas(this.jornada);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.jornada.fecha = "";
      // this.jornada.empleados = "";
      // this.jornada.empleadoEmpunero = "";
      this.jornada.empleados = [];
      // this.jornada.empleadoPegador = "";
      // this.jornada.vitola = "";
      // this.jornada.cantidad = "";
      // this.jornada.monos = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    // focus() {
    //   document.getElementById(this.campoFocus).focus();
    // },
  },
});
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}
.redOption {
  color: red;
}

/* Modal 7 */
.modal7 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
  overflow-y: scroll;
}

.contenedor7 {
  width: 350px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: black;
  color: #fff;
}

.contenedor7 label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido7 {
  padding: 7px;
}

/* End Modal */

h4 {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  font-size: 75%;
  text-align: center;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

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
