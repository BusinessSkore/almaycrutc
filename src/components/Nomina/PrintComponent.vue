<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <!-- {{ this.empleados }} -->
  <!-- {{ this.nomina }} -->

  <div>
    <!-- <Navbar /> -->
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>

    <div v-show="!cargando" class="general">
      <h6 :class="isError(error)">{{ error }}</h6>
      <form>
        <fieldset>
          <!-- <div class="header">
            <img class="localIMG" src="@/assets/images/logoN.png" />
          </div> -->

          <div class="mycontainer">
            <a
              class="item navbar-brand"
              @click="this.$router.push(`/dashboard`)"
              href="#"
            >
              <img class="localIMG" src="@/assets/images/logoN.png" /> Alma &
              Cru
            </a>
          </div>

          <h6>{{ encabezado }}</h6>
          <label class="form-label"><b>Datos de la Nómina</b></label>
          <div class="form-group">
            <div class="grid">
              <!-- Start Fields -->

              <p>
                <span class="bold"> No: </span>{{ formatSecuence(nomina.no) }}
              </p>

              <p>
                <span class="bold"> Fecha: </span>{{ formatDate(nomina.fecha) }}
              </p>

              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha:</label
                ><input
                  id="fecha"
                  type="date"
                  v-model="nomina.fecha"
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
                  v-model="nomina.pagoNo"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><select
                  id="empleado"
                  v-model="nomina.empleado"
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

              <p>
                <span class="bold"> Pagos: </span
                >{{ formatNumber(nomina.cant, false) }}
              </p>

              <p>
                <span class="bold"> Valor: </span
                >{{ formatNumber(nomina.valor, true) }}
              </p>

              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="cant"
                  >Pagos:</label
                ><input
                  id="cant"
                  type="number"
                  v-model="nomina.cant"
                  class="form-control"
                />
              </div> -->

              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="valor"
                  >Valor:</label
                ><input
                  id="valor"
                  type="number"
                  v-model="nomina.valor"
                  class="form-control"
                />
              </div> -->

              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="origen"
                  >Orígen:</label
                ><select
                  id="origen"
                  v-model="nomina.origen"
                  class="form-select"
                >
                  <option>Producción</option>
                  <option>Recapada</option>
                  <option>Incentivo</option>
                  <option>Salario</option>
                  <option>Jornada</option>
                </select>
              </div> -->
            </div>
            <label class="form-label"><b>Pagos</b></label>
            <div class="grid">
              <table id="customers">
                <!-- Head -->
                <tr>
                  <th>No.</th>
                  <th>Empleado</th>
                  <th>Valor</th>
                </tr>
                <!-- Body -->
                <tr v-for="(item, index) in pagos" :key="index">
                  <td class="ta-r">
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ item.empleado }}
                  </td>
                  <td class="ta-r">
                    {{ formatNumber(item.valor, true) }}
                  </td>
                </tr>
                <!-- End -->
                <!-- <tr style="font-weight: bold">
                  <td>Total: {{ this.totales.cantPagos }}</td>
                  <td></td>
                  <td class="ta-r">
                    {{ formatNumber(this.totales.pagos, true) }}
                  </td>
                </tr> -->
              </table>
            </div>
          </div>

          <!-- <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="saveNomina()"
            :disabled="!nomina.fecha || !nomina.cant || !nomina.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button> -->

          <!-- <button
            v-if="this.modoForm == 'show'"
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!nomina.fecha || !nomina.cant || !nomina.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button> -->

          <!-- <button
            v-if="this.modoForm == 'show'"
            class="btn btn-warning"
            @click="this.$router.push(`/nominas2/${nomina._id}`)"
          >
            <i class="fas fa-print"></i> Imprimir
          </button> -->

          <!-- <button
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
// import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Nomina } from "@/interfaces/Nomina";
import { Funcion } from "@/interfaces/Funcion";
import { Pago } from "@/interfaces/Pago";
import { getPagByNom } from "@/services/almaycru/Pago";
import {
  createNomina,
  eliminateNominas,
  createNominaa,
  getOneNomina,
  deleteNomina,
  getNomina,
  updateNomina,
} from "@/services/almaycru/Nomina";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "nominas-form",
  components: {
    // Navbar,
  },
  data() {
    return {
      // empleados: [] as Empleado[],
      campoFocus: "cant",
      mensageError: "Error",
      mensageExito: "Nómina Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Nómina?",
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
      nomina: {} as Nomina,
      oneNomina: {} as Nomina,
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
      pagos: [],
      totales: {} as any,
    };
  },

  async mounted() {
    if (this.$route.fullPath == "/nominas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Nómina";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Nómina";
    }

    if (this.modoForm == "add") {
      this.nomina.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadNomina(this.$route.params.id);
        this.documento.nomina = this.nomina.no;
        await this.loadNomina2();
      }
      this.fixTime();
      this.toPrint();
      this.$router.push(`/nominas/${this.nomina._id}`);
    }

    this.focus();
  },

  // updated() {
  //   this.valorTotal();
  // },

  methods: {
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    toPrint() {
      window.print();
    },
    valorTotal() {
      this.totales.pagos = this.pagos.reduce(
        (accum: any, item: any) => accum + item.valor,
        0
      );

      this.totales.cantPagos = this.pagos.length;
    },

    fixTime() {
      this.nomina.fecha = this.formatDateToFix(this.nomina.fecha, false);
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

    async loadNomina(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getNomina(id);
        this.nomina = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async loadNomina2() {
      // this.toggleLoading();
      try {
        const res = await getPagByNom(this.documento);
        this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // await this.toggleLoading();
    },

    // async loadPagosByNom() {
    //   alert("Loading Pagos");
    //   this.toggleLoading();
    //   try {
    //     const res = await getPagByNom();
    //     this.pagos = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    async handleUpdate() {
      // this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.nomina.userMod = this.$store.state.user.usuario;
          await updateNomina(this.$route.params.id, this.nomina);
          // this.addMessage();
          this.$router.push("/nominas");
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
            await deleteNomina(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/nominas");
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
    calcNomina() {
      (this.nomina.retension = this.nomina.bruto * 0.1),
        (this.nomina.neto = this.nomina.bruto * 0.9);
    },
    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/yyyy");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.nomina.fecha = this.formatDate(new Date());
    },

    async loadOneNomina() {
      try {
        const res = await getOneNomina();
        this.oneNomina = res.data;
        this.one = this.oneNomina[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.nomina.no = this.nextNo;
        this.nomina.principal = this.nextNo;
        this.nomina.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveNominaa() {
      await this.loadOneNomina();
      try {
        const res = await createNominaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveNomina() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneNomina();
          this.oneNomina = res.data;
          this.one = this.oneNomina[0];
          this.nextNo = this.one.no + 1;
          this.nomina.no = this.nextNo;
          this.nomina.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.nomina.userReg = this.$store.state.user.usuario;
        const res = await createNomina(this.nomina).then(
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
        // this.$router.push("/nominas/");
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

    async deleteAllNominas() {
      try {
        const res = await eliminateNominas(this.nomina);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.nomina.fecha = "";
      this.nomina.cant = "";
      this.nomina.valor = "";
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
.navbar-brand {
  color: white;
  font-family: "Agency FB";
  margin-left: 5px;
}

.header {
  background-color: black;
}

.mycontainer {
  /* height: 40px; */
  background-color: black;
  /* padding: 5px; */

  display: flex;
  justify-content: space-between;
}

img {
  /* display: block; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 25px;
  /* margin-bottom: 10px; */
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
