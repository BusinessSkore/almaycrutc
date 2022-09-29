<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <!-- {{ this.empleados }} -->
  <!-- {{ this.pago }} -->

  <div>
    <!-- <Navbar /> -->
    <!-- <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition> -->

    <div v-show="!cargando" class="general">
      <h6 :class="isError(error)">{{ error }}</h6>
      <form>
        <fieldset>
          <h6>{{ encabezado }}</h6>
          <label class="form-label"><b>Datos del Pago</b></label>
          <div class="form-group">
            <div class="grid-jun">
              <!-- Start Fields -->
              <p>
                <span class="bold"> No.: </span>{{ formatSecuence(pago.no) }}
              </p>

              <p>
                <span class="bold"> Fecha: </span>{{ formatDate(pago.fecha) }}
              </p>
              <p>
                <span class="bold"> Cant.: </span>{{ formatNumber2(pago.cant) }}
              </p>
              <p>
                <span class="bold"> Valor: </span>{{ formatNumber(pago.valor) }}
              </p>

              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha</label
                ><input
                  disabled
                  id="fecha"
                  type="date"
                  v-model="pago.fecha"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="pagoNo"
                  >Pago:</label
                ><input
                  id="pagoNo"
                  type="number"
                  v-model="pago.pagoNo"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><select
                  disabled
                  id="empleado"
                  v-model="pago.empleado"
                  class="form-select"
                >
                  <option
                    v-for="(empleado, index) in empleados"
                    :key="index"
                    :value="empleado.nombre"
                    >{{ empleado.nombre }}</option
                  >
                </select>
              </div> -->
              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="cant"
                  >Cant.:</label
                ><input
                  disabled
                  id="cant"
                  type="number"
                  v-model="pago.cant"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="valor"
                  >Valor:</label
                ><input
                  disabled
                  id="valor"
                  type="number"
                  v-model="pago.valor"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="origen"
                  >Orígen:</label
                ><select id="origen" v-model="pago.origen" class="form-select">
                  <option>Producción</option>
                  <option>Recapada</option>
                  <option>Incentivo</option>
                  <option>Salario</option>
                  <option>Jornada</option>
                </select>
              </div> -->
            </div>
            <div class="grid">
              <p><span class="bold"> Empleado: </span>{{ pago.empleado }}</p>
            </div>
            <label v-if="this.modoForm == 'show'" class="form-label"
              ><b>Novedades</b></label
            >
            <div v-if="this.modoForm == 'show'" class="grid">
              <table id="customers">
                <!-- Head -->
                <tr>
                  <th>No.</th>
                  <th>Fecha</th>
                  <th>Orígen</th>
                  <th>Descripción</th>
                  <th>Cant.</th>
                  <th>Valor</th>
                </tr>
                <!-- Body -->
                <tr v-for="(item, index) in pagos" :key="index">
                  <td class="ta-r">
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ formatDate2(item._id.day, true) }}
                  </td>
                  <td>
                    {{ item._id.origen }}
                  </td>
                  <td>
                    {{ item._id.desc }}
                  </td>
                  <td class="ta-r">
                    {{ formatNumber2(item.count) }}
                  </td>
                  <td class="ta-r">
                    {{ formatNumber(item.valor) }}
                  </td>
                </tr>
                <!-- End -->
                <!-- <tr style="font-weight: bold">
                  <td>Total: {{ this.totales.cantPagos }}</td>
                  <td></td>
                  <td class="ta-r">
                    {{ formatNumber(this.totales.pagos) }}
                  </td>
                </tr> -->
              </table>
            </div>
          </div>

          <!-- <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="savePago()"
            :disabled="!pago.fecha || !pago.empleado || !pago.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!pago.fecha || !pago.empleado || !pago.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-warning"
            @click="this.$router.push(`/pagos2/${pago._id}`)"
          >
            <i class="fas fa-print"></i> Imprimir
          </button>

          <button
            v-if="showDelete"
            class="btn btn-danger"
            @click.prevent="handleDelete()"
          >
            <i class="fas fa-trash-alt"></i> Eliminar
          </button> -->
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// Components
// import Navbar from "@/components/Navbar.vue";

// Vue
import { defineComponent } from "vue";

// Interfaces
import { Pago } from "@/interfaces/Pago";
import { Funcion } from "@/interfaces/Funcion";
import { Empleado } from "@/interfaces/Empleado";

//Services
import { createMensaje } from "@/services/almaycru/ChatService";
import { getEmpleados } from "@/services/almaycru/Empleado";
import {
  createPago,
  eliminatePagos,
  createPagoa,
  getOnePago,
  deletePago,
  getPago,
  updatePago,
} from "@/services/almaycru/Pago";
import { getFuncions } from "@/services/almaycru/Funcion";
import { getCxpByPag } from "@/services/almaycru/Cxp";

// Modules
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "pagos-form",
  components: {
    // Navbar,
  },
  data() {
    return {
      empleados: [] as Empleado[],
      campoFocus: "empleado",
      mensageError: "Error",
      mensageExito: "Pago Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Pago?",
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
      pago: {} as Pago,
      onePago: {} as Pago,
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
    if (this.$route.fullPath == "/pagos/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Pago";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Pago";
    }

    if (this.modoForm == "add") {
      this.pago.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadPago(this.$route.params.id);
        this.documento.pago = this.pago.no;
        await this.loadNomina2();
      }
      this.fixTime();
      this.toPrint();
      this.$router.push(`/pagos/${this.pago._id}`);
    }

    this.focus();
    this.loadEmpleados();
  },

  methods: {
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    toPrint() {
      window.print();
    },

    async loadNomina2() {
      this.toggleLoading();
      try {
        const res = await getCxpByPag(this.documento);
        this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

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
      this.pago.fecha = this.formatDateToFix(this.pago.fecha, false);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-D");
      }
    },

    async loadPago(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getPago(id);
        this.pago = data;
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
          this.pago.userMod = this.$store.state.user.usuario;
          await updatePago(this.$route.params.id, this.pago);
          // this.addMessage();
          this.$router.push("/pagos");
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
            await deletePago(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/pagos");
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
    calcPago() {
      (this.pago.retension = this.pago.bruto * 0.1),
        (this.pago.neto = this.pago.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },
    formatNumber2(value: number) {
      return numeral(value).format("0,0");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/yyyy");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/yyyy");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.pago.fecha = this.formatDate(new Date());
      this.pago.nomina = 0;
    },

    async loadOnePago() {
      try {
        const res = await getOnePago();
        this.onePago = res.data;
        this.one = this.onePago[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.pago.no = this.nextNo;
        this.pago.principal = this.nextNo;
        this.pago.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async savePagoa() {
      await this.loadOnePago();
      try {
        const res = await createPagoa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async savePago() {
      this.toggleLoading();
      try {
        try {
          const res = await getOnePago();
          this.onePago = res.data;
          this.one = this.onePago[0];
          this.nextNo = this.one.no + 1;
          this.pago.no = this.nextNo;
          this.pago.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.pago.userReg = this.$store.state.user.usuario;
        const res = await createPago(this.pago).then(
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
        // this.$router.push("/pagos/");
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

    async deleteAllPagos() {
      try {
        const res = await eliminatePagos(this.pago);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.pago.fecha = "";
      this.pago.empleado = "";
      this.pago.valor = "";
      this.pago.origen = "";
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
  /* cursor: pointer; */
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
  background-color: rgb(147, 147, 147);
  color: white;
}

td,
th {
  font-size: 75%;
}

.ta-r {
  text-align: right;
}

/* End Table */

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
.grid-jun {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
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

.bold {
  font-weight: bold;
}
</style>
