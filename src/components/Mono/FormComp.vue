<template v-show="!cargando">
  <!-- {{ this.vitolas }} -->
  <!-- {{ this.vitolaSelected }}<br/> -->
  <!-- {{ this.cxp }} -->
  <div>
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
            <label class="form-label"><b>Datos de la Mono</b></label>
            <div class="form-group">
              <div class="grid">
                <!-- Start Fields -->
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fecha"
                    >Fecha:</label
                  ><input
                    :disabled="this.modoForm == 'show'"
                    id="fecha"
                    type="datetime-local"
                    v-model="mono.fecha"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="liga"
                    >Liga:</label
                  ><select
                    id="liga"
                    v-model="mono.liga"
                    class="form-select"
                  >
                    <option
                      v-for="(liga, index) in ligas"
                      :key="index"
                      :value="liga.descripcion"
                      >{{ liga.descripcion }}</option
                    >
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="vitola"
                    >Vitola:</label
                  ><select
                    :disabled="this.modoForm == 'show'"
                    id="vitola"
                    type="String"
                    v-model="mono.vitola"
                    class="form-select"
                    @change="selectVitola(mono.vitola)"
                  >
                    <option
                      v-for="(vitola, index) in vitolas"
                      :key="index"
                      :value="vitola.descripcion"
                      >{{ vitola.descripcion }}</option
                    >
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cantidad"
                    >Cantidad:</label
                  ><input
                    id="cantidad"
                    type="Number"
                    min="1"
                    v-model="mono.cantidad"
                    class="form-control"
                    @change="calcValor()"
                  />
                </div>
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="monos"
                    >Monos:</label
                  ><input
                    id="monos"
                    type="Number"
                    v-model="mono.monos"
                    class="form-control"
                  />
                </div> -->
              </div>
              <label class="form-label"><b>Datos de Empleados</b></label>
              <div class="grid">
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosMez"
                    >Mezclador:</label
                  ><select
                    id="empleadosMez"
                    v-model="mono.empleadoMezclador"
                    class="form-select"
                  >
                    <option
                      v-for="(emp, index) in empleadosMez"
                      :key="index"
                      :value="emp.nombre"
                      >{{ emp.nombre }}</option
                    >
                  </select>
                </div> -->

                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosMez"
                    >Empuñero:</label
                  ><select
                    :disabled="this.modoForm == 'show'"
                    id="empleadosEmp"
                    v-model="mono.empleadoEmpunero"
                    class="form-select"
                  >
                    <option
                      v-for="(emp, index) in empleadosEmp"
                      :key="index"
                      :value="emp.nombre"
                      >{{ emp.nombre }}</option
                    >
                  </select>
                </div> -->

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosPeg"
                    >Empuñero:</label
                  ><select
                    :disabled="this.modoForm == 'show'"
                    id="empleadosPeg"
                    v-model="mono.empleadoEmpunero"
                    class="form-select"
                  >
                    <option
                      v-for="(emp, index) in empleadosEmp"
                      :key="index"
                      :value="emp.nombre"
                      >{{ emp.nombre }}</option
                    >
                  </select>
                </div>
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-success"
              @click.prevent="saveMono()"
              :disabled="
                !mono.fecha ||
                  !mono.empleadoEmpunero ||
                  !mono.vitola ||
                  !mono.cantidad
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !mono.fecha ||
                  !mono.empleadoEmpunero ||
                  !mono.vitola ||
                  !mono.cantidad
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <!-- <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/monos2/${mono._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
            </button> -->

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
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Mono } from "@/interfaces/Mono";
import { Funcion } from "@/interfaces/Funcion";
import { Vitola } from "@/interfaces/Vitola";
import { Empleado } from "@/interfaces/Empleado";
import { getPeg, getMez, getEmp } from "@/services/almaycru/Empleado";
import { getLigas } from "@/services/almaycru/Liga";
import {
  createMono,
  eliminateMonos,
  createMonoa,
  getOneMono,
  deleteMono,
  getMono,
  updateMono,
} from "@/services/almaycru/Mono";
import { createCxp, getOneCxp } from "@/services/almaycru/Cxp";
import { getVitolas } from "@/services/almaycru/Vitola";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import { Cxp } from "@/interfaces/Cxp";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "monos-form",
  components: {
    Navbar,
  },
  data() {
    return {
      oneCxp: {} as Cxp,
      cxp: {} as Cxp,
      vitolaSelected: [],
      vitolas: [] as Vitola[],
      empleados: [] as Empleado[],
      empleadosEmp: [] as Empleado[],
      empleadosPeg: [] as Empleado[],
      empleadosMez: [] as Empleado[],
      campoFocus: "liga",
      mensageError: "Error",
      mensageExito: "Mono Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Mono?",
      encabezado: "",
      modoForm: "",
      funciones: [] as Funcion[],
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "R",
        message: "H",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      mono: {} as Mono,
      oneMono: {} as Mono,
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
    if (this.$route.fullPath == "/monos/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Mono";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Mono";
    }

    if (this.modoForm == "add") {
      this.mono.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadMono(this.$route.params.id);
      }
      this.fixTime();
    }

    this.focus();
    // this.loadEmpleados();
    this.loadLigas();
    this.loadVitolas();
    this.filterEmpleados();
  },

  methods: {
    calcValor() {
      this.cxp.valor =
        (this.vitolaSelected[0].pago / 50) * this.mono.cantidad;
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
        this.cxp.pagar = false;
        this.cxp.desc =
          this.mono.vitola +
          " " +
          this.mono.liga +
          " (RD$ " +
          this.vitolaSelected[0].pago / 50 +
          " x " +
          this.mono.cantidad + ")";
        const res = await createCxp(this.cxp).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            // this.addMessage();
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
        (this.vitolaSelected[0].pago / 50) * this.mono.cantidad;
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
        this.ligas = res.data;
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
      this.mono.fecha = this.formatDateToFix(this.mono.fecha, true);
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

    async loadMono(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getMono(id);
        this.mono = data;
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
          this.mono.userMod = this.$store.state.user.usuario;
          await updateMono(this.$route.params.id, this.mono);
          // this.addMessage();
          this.$router.push("/monos");
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
            await deleteMono(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/monos");
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
    calcMono() {
      (this.mono.retension = this.mono.bruto * 0.1),
        (this.mono.neto = this.mono.bruto * 0.9);
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
      this.mono.fecha = new Date();
      this.mono.cantidad = 1;
      // this.mono.monos = 0;
      // this.mono.empleadoMezclador = "ROBERTO EPIFANIO CABRERA SANTOS";
      this.cxp.fecha = new Date();
    },

    async loadOneMono() {
      try {
        const res = await getOneMono();
        this.oneMono = res.data;
        this.one = this.oneMono[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.mono.no = this.nextNo;
        this.mono.principal = this.nextNo;
        this.mono.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveMonoa() {
      await this.loadOneMono();
      try {
        const res = await createMonoa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveMono() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneMono();
          this.oneMono = res.data;
          this.one = this.oneMono[0];
          this.nextNo = this.one.no + 1;
          this.mono.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.mono.userReg = this.$store.state.user.usuario;
        // this.cxp.pago = 0;
        // this.cxp.origen = "Mono";
        // this.cxp.empleado = this.mono.empleadoEmpunero;
        // await this.saveCxp();
        this.cxp.empleado = this.mono.empleadoEmpunero;
        // await this.saveCxp();
        const res = await createMono(this.mono).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            // this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
          }
        );
        // this.$router.push("/monos/");
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

    async deleteAllMonos() {
      try {
        const res = await eliminateMonos(this.mono);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.mono.fecha = "";
      // this.mono.liga = "";
      // this.mono.empleadoEmpunero = "";
      this.mono.empleadoEmpunero = "";
      this.mono.vitola = "";
      this.mono.cantidad = 1;
      // this.mono.monos = "";
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
