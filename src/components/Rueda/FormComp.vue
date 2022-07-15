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
            <label class="form-label"><b>Datos de la Rueda</b></label>
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
                    v-model="rueda.fecha"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="liga"
                    >Liga:</label
                  ><select id="liga" v-model="rueda.liga" class="form-select">
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
                    v-model="rueda.vitola"
                    class="form-select"
                    @change="selectVitola(rueda.vitola)"
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
                    disabled
                    id="cantidad"
                    type="Number"
                    v-model="rueda.cantidad"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="monos"
                    >Monos:</label
                  ><input
                    id="monos"
                    type="Number"
                    v-model="rueda.monos"
                    class="form-control"
                  />
                </div>
              </div>
              <label class="form-label"><b>Datos de Empleados</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosMez"
                    >Mezclador:</label
                  ><select
                    id="empleadosMez"
                    v-model="rueda.empleadoMezclador"
                    class="form-select"
                  >
                    <option
                      v-for="(emp, index) in empleadosMez"
                      :key="index"
                      :value="emp.nombre"
                      >{{ emp.nombre }}</option
                    >
                  </select>
                </div>

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosMez"
                    >Empuñero:</label
                  ><select
                    :disabled="this.modoForm == 'show'"
                    id="empleadosEmp"
                    v-model="rueda.empleadoEmpunero"
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

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="empleadosPeg"
                    >Pegador:</label
                  ><select
                    :disabled="this.modoForm == 'show'"
                    id="empleadosPeg"
                    v-model="rueda.empleadoPegador"
                    class="form-select"
                  >
                    <option
                      v-for="(emp, index) in empleadosPeg"
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
              @click.prevent="saveRueda()"
              :disabled="
                !rueda.fecha ||
                  !rueda.liga ||
                  !rueda.empleadoMezclador ||
                  !rueda.empleadoEmpunero ||
                  !rueda.empleadoPegador ||
                  !rueda.vitola ||
                  !rueda.cantidad
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !rueda.fecha ||
                  !rueda.liga ||
                  !rueda.empleadoMezclador ||
                  !rueda.empleadoEmpunero ||
                  !rueda.empleadoPegador ||
                  !rueda.vitola ||
                  !rueda.cantidad
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/ruedas2/${rueda._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
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
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Rueda } from "@/interfaces/Rueda";
import { Funcion } from "@/interfaces/Funcion";
import { Vitola } from "@/interfaces/Vitola";
import { Empleado } from "@/interfaces/Empleado";
import { getPeg, getMez, getEmp } from "@/services/almaycru/Empleado";
import { getLigas } from "@/services/almaycru/Liga";
import {
  createRueda,
  eliminateRuedas,
  createRuedaa,
  getOneRueda,
  deleteRueda,
  getRueda,
  updateRueda,
} from "@/services/almaycru/Rueda";
import { createCxp, getOneCxp } from "@/services/almaycru/Cxp";
import { getVitolas } from "@/services/almaycru/Vitola";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import { Cxp } from "@/interfaces/Cxp";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "ruedas-form",
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
      mensageExito: "Rueda Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Rueda?",
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
      rueda: {} as Rueda,
      oneRueda: {} as Rueda,
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
    if (this.$route.fullPath == "/ruedas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Rueda";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Rueda";
    }

    if (this.modoForm == "add") {
      this.rueda.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadRueda(this.$route.params.id);
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
      this.cxp.valor = this.vitolaSelected[0].pago;
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
      this.rueda.fecha = this.formatDateToFix(this.rueda.fecha, true);
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

    async loadRueda(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getRueda(id);
        this.rueda = data;
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
          this.rueda.userMod = this.$store.state.user.usuario;
          await updateRueda(this.$route.params.id, this.rueda);
          this.addMessage();
          this.$router.push("/ruedas");
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
            await deleteRueda(this.$route.params.id);
            this.addMessage();
            this.$router.push("/ruedas");
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
    calcRueda() {
      (this.rueda.retension = this.rueda.bruto * 0.1),
        (this.rueda.neto = this.rueda.bruto * 0.9);
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
      this.rueda.fecha = new Date();
      this.rueda.cantidad = 50;
      this.rueda.monos = 0;
      this.rueda.empleadoMezclador = "ROBERTO EPIFANIO CABRERA SANTOS";
      this.cxp.fecha = new Date();
    },

    async loadOneRueda() {
      try {
        const res = await getOneRueda();
        this.oneRueda = res.data;
        this.one = this.oneRueda[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.rueda.no = this.nextNo;
        this.rueda.principal = this.nextNo;
        this.rueda.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveRuedaa() {
      await this.loadOneRueda();
      try {
        const res = await createRuedaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveRueda() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneRueda();
          this.oneRueda = res.data;
          this.one = this.oneRueda[0];
          this.nextNo = this.one.no + 1;
          this.rueda.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.rueda.userReg = this.$store.state.user.usuario;
        this.cxp.pago = 0;
        this.cxp.origen = "Producción";
        this.cxp.empleado = this.rueda.empleadoEmpunero;
        await this.saveCxp();
        this.cxp.empleado = this.rueda.empleadoPegador;
        await this.saveCxp();
        const res = await createRueda(this.rueda).then(
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
        // this.$router.push("/ruedas/");
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

    async deleteAllRuedas() {
      try {
        const res = await eliminateRuedas(this.rueda);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.rueda.fecha = "";
      this.rueda.liga = "";
      this.rueda.empleadoEmpunero = "";
      this.rueda.empleadoPegador = "";
      this.rueda.vitola = "";
      this.rueda.cantidad = "";
      this.rueda.monos = "";
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
