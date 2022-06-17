<template v-show="!cargando">
  <Navbar />
  <!-- {{ this.factura.actividad }} -->
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
        <i class="fas fa-check"></i> Factura Actualizada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h6>Detalles de Factura</h6>
        <div class="form-group">
          <!-- <label class="form-label"><b>Datos Generales</b></label> -->
          <!-- Start Fields -->
          <div class="grid">
            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="no"
                >No:</label
              ><input
                id="no"
                type="number"
                v-model="factura.no }}</p>
            </div> -->
            <div>
              <p><span class="bold">No: </span>{{ factura.idfact }}</p>
            </div>
            <div>
              <p><span class="bold">Id ARS: </span>{{ factura.id_ars }}</p>
            </div>
            <div>
              <p><span class="bold">ARS: </span>{{ getARS(factura.id_ars) }}</p>
            </div>
            <div>
              <p><span class="bold">Paciente: </span>{{ factura.nom }}</p>
            </div>
            <div>
              <p>
                <span class="bold">Autorización: </span
                >{{ factura.nro_autorizacion_salida }}
              </p>
            </div>
            <div>
              <p>
                <span class="bold">Fecha: </span
                >{{ formatDate2(factura.fecha_ingreso) }}
              </p>
            </div>
            <div>
              <p>
                <span class="bold">Afiliado No.: </span
                >{{ factura.numero_afiliado }}
              </p>
            </div>
            <div>
              <p><span class="bold">Cédula: </span>{{ factura.rnc }}</p>
            </div>
            <div>
              <p>
                <span class="bold">Orígen: </span>{{ factura.tipo_factura }}
              </p>
            </div>
            <div>
              <p>
                <span class="bold">Cobertura: </span
                >{{ formatNumber(factura.cobertura) }}
              </p>
            </div>
            <div>
              <p>
                <span class="bold">Total: </span
                >{{ formatNumber(factura.total_servicio) }}
              </p>
            </div>
            <!-- <div>
              <p>
                <span class="bold">Estatus: </span
                ><span :class="toColor(factura.status)">{{
                  factura.status
                }}</span>
              </p>
            </div> -->

            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="estatus"
                >Estatus:</label
              ><select
                id="estatus"
                type="estatus"
                v-model="factura.status"
                class="form-select"
              >
                <option selected>1 - Recibido por Auditoría Interna</option>
                <option>2 - Verificado por Auditoría Interna</option>
                <option>3 - Verificado por Auditoría Externa</option>
                <option>4 - Recibido por Reclamaciones Médicas</option>
                <option>5 - Verificado por Reclamaciones Médicas</option>
                <option>6 - Cargado a Lote</option>
                <option>7 - Enviado a la Aseguradora</option>
              </select>
            </div> -->

            <!-- <div>
<p><span class="bold">No: </span>{{ factura.actividad }}</p>
            </div> -->
          </div>
          <!-- End Fields -->
        </div>
        <br />
        <p><span class="bold">Actividades: </span></p>
        <div class="grid-0">
          <div>
            <!-- <label class="ta-l col-form-label col-form-label-sm" for="estatus"
              >Estatus:</label
            > -->
            <select
              id="estatus"
              type="estatus"
              v-model="factura.status"
              class="form-select"
              @change="changeStatus()"
            >
              <option selected>1 - Recibido por Auditoría Interna</option>
              <option>2 - Verificado por Auditoría Interna</option>
              <option>3 - Verificado por Auditoría Externa</option>
              <option>4 - Recibido por Reclamaciones Médicas</option>
              <option>5 - Verificado por Reclamaciones Médicas</option>
              <option>6 - Cargado a Lote</option>
              <option>7 - Enviado a la Aseguradora</option>
            </select>
          </div>
          <div>
            <input
              id="currentActivity"
              type="currentActivity"
              v-model="currentActivity"
              class="form-control"
            />
          </div>
          <div>
            <button class="btn btn-success" @click.prevent="addActivity()">
              <i class="fas fa-plus"></i> Agregar Actividad
            </button>
          </div>
        </div>

        <table id="customers">
          <tr>
            <th>No.</th>
            <th>Actividad</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th></th>
          </tr>
          <tr v-for="(actividad, index) in factura.actividad" :key="index">
            <td class="input-r">{{ index + 1 }}</td>
            <td>{{ actividad.description }}</td>
            <td>{{ newFormatDate(actividad.date) }}</td>
            <td>{{ actividad.user }}</td>
            <td>
              <i
                @click.prevent="deleteService(index, actividad.user)"
                class="fas fa-minus-circle redOption"
              ></i>
            </td>
          </tr>
        </table>

        <br />
        <!-- <div class="grid"> -->
        <!-- <button class="btn btn-success" @click.prevent="handleUpdate()">
          <i class="fas fa-edit"></i> Actualizar
        </button> -->
        <button class="btn btn-danger" @click.prevent="handleDelete()">
          <i class="fas fa-trash-alt"></i> Eliminar
        </button>
        <!-- </div> -->
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Factura } from "@/interfaces/Factura";
import {
  deleteFactura,
  getFactura,
  updateFactura,
} from "@/services/cuetasporcobrarcj/FacturaService";
import { createMensaje } from "@/services/cuetasporcobrarcj/ChatService";
import numeral from "numeral";
import moment from "moment";
import Pusher from "pusher-js";

export default defineComponent({
  name: "factura-list",
  components: {
    Navbar,
  },
  data() {
    return {
      currentActivity: "",
      showAlert: false,
      cargando: false,
      clienteSelected: [],
      medicoSelected: [],
      factura: {} as Factura,
      estado: {} as object,
    };
  },
  methods: {
    changeStatus() {
      // alert("Change...");
      this.currentActivity = this.factura.status;
      this.addActivity();
    },
    deleteService(it: any, user: string) {
      if (user == this.$store.state.user.usuario) {
        this.factura.actividad.splice(it, 1);
        this.handleUpdate();
      } else {
        alert("No puede Eliminar una Actividad de Otro Usuario");
      }
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
    },

    async addActivity() {
      if (this.currentActivity !== "") {
        this.factura.actividad.push({
          description: this.currentActivity,
          date: new Date(),
          user: this.$store.state.user.usuario,
        });
        this.currentActivity = "";
        await this.handleUpdate();
      }
      document.getElementById("currentActivity").focus();
    },
    toColor(type: string) {
      if (type == "1 - Recibido por Auditoría Interna") {
        return "valor1";
      } else if (type == "2 - Verificado por Auditoría Interna") {
        return "valor2";
      } else if (type == "3 - Verificado por Auditoría Externa") {
        return "valor3";
      } else if (type == "4 - Recibido por Reclamaciones Médicas") {
        return "valor4";
      } else if (type == "5 - Verificado por Reclamaciones Médicas") {
        return "valor5";
      } else if (type == "6 - Cargado a Lote") {
        return "valor6";
      } else if (type == "7 - Enviado a la Aseguradora") {
        return "valor7";
      } else if (type == "Todos") {
        return "Todos";
      }
    },
    getARS(id_ars: string) {
      switch (id_ars) {
        case "5":
          return "ARS CMD";
        case "14":
          return "MAPFRE SALUD ARS, S.A.";
        case "8":
          return "FUTURO";
        case "12":
          return "META SALUD";
        case "23":
          return "YUNEN";
        case "17":
          return "RESERVAS";
        case "13":
          return "MONUMENTAL";
        case "4":
          return "ASEMAP";
        case "1":
          return "ARS APS S A";
        case "21":
          return "SIMAG";
        case "16":
          return "RENACER";
        case "59":
          return "GRUPO MEDICO ASOCIADO";
        case "24":
          return "PRIMERA  ARS DE HUMANO";
        case "22":
          return "UNIVERSAL";
        case "29":
          return "ALBA GAS S.R.L.";
        case "10":
          return "HUMANO SEGUROS";
        case "20":
          return "SENASA CONTRIBUTIVO";
        case "61":
          return "SENASA SUBSIDIADO";
        case "18":
          return "SEMMA";
        case "65":
          return "IDOPPRIL";
        default:
          return "ARS Descripcion";
      }
    },
    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },
    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    async facturar() {
      this.factura.cantPrefactura = 0;
      this.factura.cantFactura = 1;
      this.factura.credito = 0;
      this.factura.debito = 0;
      this.factura.subTipo = "Factura";
      this.factura.factura = this.factura.prefactura;
      this.factura.prefactura = 0;
      await this.selectCliente(this.factura.descCliente);
      this.factura.literal = this.clienteSelected[0].tipoComprobante.substring(
        0,
        3
      );
      await this.selectMedico(this.factura.medico);
      if (this.factura.literal == "B15") {
        this.factura.ncf = this.medicoSelected[0].compGuberAsig;
        this.factura.vencimiento = this.medicoSelected[0].fechGuberAsig;
        this.factura.fechaNCF = new Date();
      } else {
        this.factura.ncf = this.medicoSelected[0].compNoGuberAsig;
        this.factura.vencimiento = this.medicoSelected[0].fechNoGuberAsig;
        this.factura.fechaNCF = new Date();
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

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("D/MM/yyyy HH:mm");
    },

    fixTime() {
      this.factura.fecha_ingreso = this.formatDate2(this.factura.fecha_ingreso);
    },

    async loadFactura(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getFactura(id);
        this.factura = data;
        this.estado = this.factura.estado;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async loadFactura2(id: string) {
      try {
        const { data } = await getFactura(id);
        this.factura = data;
        this.estado = this.factura.estado;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
    },

    async handleUpdate() {
      // this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.factura.userMod = this.$store.state.user.usuario;
          await updateFactura(this.$route.params.id, this.factura);
          this.addMessage();
          // this.$router.push("/facturas");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          await deleteFactura(this.$route.params.id);
          this.addMessage();
          this.$router.push("/facturas");
        }
      } catch (error) {
        //console.error(error);
      }
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("ec64cab5b5fa0b45d374", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        if (typeof this.$route.params.id === "string") {
          this.loadFactura2(this.$route.params.id);
        }
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadFactura(this.$route.params.id);
    }
    this.pusherSubscribe();
  },
});
</script>

<style lang="css" scoped>
.redOption {
  color: red;
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
  cursor: pointer;
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
  background-color: rgb(51, 163, 67);
  color: white;
}

td,
th {
  font-size: 75%;
}

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

.grid-0 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
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
  background-color: rgb(51, 163, 67);
}

h5 {
  font-size: 90%;
  color: rgb(51, 163, 67);
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

p {
  margin: 0;
}

.valor1 {
  text-align: center;
  background-color: rgb(255, 0, 0);
  margin: 1px;
  color: white;
}

.valor2 {
  text-align: center;
  background-color: rgb(255, 64, 0);
  margin: 1px;
  color: white;
}

.valor3 {
  text-align: center;
  background-color: rgb(255, 128, 0);
  margin: 1px;
  color: white;
}

.valor4 {
  text-align: center;
  background-color: rgb(255, 192, 0);
  margin: 1px;
  color: white;
}

.valor5 {
  text-align: center;
  background-color: rgb(171, 187, 26);
  margin: 1px;
  color: white;
}

.valor6 {
  text-align: center;
  background-color: rgb(86, 182, 53);
  margin: 1px;
  color: white;
}

.valor7 {
  text-align: center;
  background-color: rgb(0, 176, 80);
  margin: 1px;
  color: white;
}
</style>
