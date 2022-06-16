<template v-show="!cargando">
  <!-- {{ this.factura }} -->
  <!-- {{ this.respuesta }} -->
  <!-- {{this.documento}} -->
  <Navbar />
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <div v-show="!cargando" class="general">
    <h6 :class="isError(error)">{{ error }}</h6>
    <form>
      <fieldset>
        <h6>Nueva Factura</h6>
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
                v-model="factura.no"
                class="form-control"
              />
            </div> -->
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="idfact"
                >Id:</label
              ><input
                id="idfact"
                type="idfact"
                v-model="factura.idfact"
                class="form-control"
                @keypress.enter="getFactura()"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="id_ars"
                >Id ARS:</label
              ><input
                id="id_ars"
                type="id_ars"
                v-model="factura.id_ars"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="nom"
                >Paciente:</label
              ><input
                id="nom"
                type="nom"
                v-model="factura.nom"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="nro_autorizacion_salida"
                >Autorización:</label
              ><input
                id="nro_autorizacion_salida"
                type="nro_autorizacion_salida"
                v-model="factura.nro_autorizacion_salida"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="fecha_ingreso"
                >Fecha:</label
              ><input
                id="fecha_ingreso"
                type="date"
                v-model="factura.fecha_ingreso"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="numero_afiliado"
                >Afiliado No.:</label
              ><input
                id="numero_afiliado"
                type="numero_afiliado"
                v-model="factura.numero_afiliado"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="rnc"
                >Cédula:</label
              ><input
                id="rnc"
                type="rnc"
                v-model="factura.rnc"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="tipo_factura"
                >Orígen:</label
              ><input
                id="tipo_factura"
                type="tipo_factura"
                v-model="factura.tipo_factura"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="cobertura"
                >Cobertura:</label
              ><input
                id="cobertura"
                type="number"
                v-model="factura.cobertura"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="total_servicio"
                >Total:</label
              ><input
                id="total_servicio"
                type="number"
                v-model="factura.total_servicio"
                class="form-control"
              />
            </div>
            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="status"
                >Estatus:</label
              ><input
                id="status"
                type="status"
                v-model="factura.status"
                class="form-control"
              />
            </div> -->
            <!-- <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="actividad"
                >Actividad:</label
              ><input
                id="actividad"
                type="actividad"
                v-model="factura.actividad"
                class="form-control"
              />
            </div> -->
          </div>
          <!-- End Fields -->
        </div>
        <button
          class="btn btn-primary"
          @click.prevent="saveFactura()"
          :disabled="
            !factura.idfact ||
              !factura.id_ars ||
              !factura.nom ||
              !factura.nro_autorizacion_salida ||
              !factura.fecha_ingreso ||
              !factura.numero_afiliado ||
              !factura.rnc ||
              !factura.tipo_factura ||
              !factura.cobertura ||
              !factura.total_servicio
          "
        >
          Guardar
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Factura } from "@/interfaces/Factura";
import {
  createFactura,
  eliminateFacturas,
  createFacturaa,
  getOneFactura,
} from "@/services/cuetasporcobrarcj/FacturaService";

import {
  APIgetFactura,
  getFacturas,
} from "@/services/datasamicj/FacturaService";
import { createMensaje } from "@/services/cuetasporcobrarcj/ChatService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "facturas-form",
  components: {
    Navbar,
  },
  data() {
    return {
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
      factura: {} as Factura,
      oneFactura: {} as Factura,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",
    };
  },

  mounted() {
    this.factura.no = 1;
    // this.defFields();
    this.focus();
  },

  methods: {
    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    async getFactura() {
      this.toggleLoading();
      this.documento.idfact = this.factura.idfact;
      if (this.documento) {
        try {
          const res = await APIgetFactura(this.documento);
          // const res = await getFacturas();
          // this.factura = res.data;
          // Asignar Campos Seleccionandolos
          this.factura.idfact = res.data.idfact;
          this.factura.id_ars = res.data.id_ars;
          this.factura.nom = res.data.nom;
          this.factura.nro_autorizacion_salida =
            res.data.nro_autorizacion_salida;
          this.factura.fecha_ingreso = res.data.fecha_ingreso;
          this.factura.numero_afiliado = res.data.numero_afiliado;
          this.factura.rnc = res.data.rnc;
          this.factura.tipo_factura = res.data.tipo_factura;
          this.factura.cobertura = res.data.cobertura;
          this.factura.total_servicio = res.data.total_servicio;

          this.factura.status = "Recibido por Reclamaciones Médicas";
          this.factura.actividad.push({
            description: "Recibido por Reclamaciones Médicas",
            date: new Date(),
          });
        } catch (error) {
          // console.error(error);
        }
      }
      await this.toggleLoading();
      if (this.factura.cobertura > 0) {
        this.saveFactura();
      } else {
        alert("Factura no Encontrada");
        this.focus();
      }
    },

    isError(message: string) {
      if (message == "Factura Registrada Exitosamente") {
        return "success";
      } else if (message == "Ya Existe una Factura Registrada con este Id") {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcFactura() {
      (this.factura.retension = this.factura.bruto * 0.1),
        (this.factura.neto = this.factura.bruto * 0.9);
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

    // defFields() {
    // this.factura.status = "Recibido por Reclamaciones Médicas";
    // this.actividad = "Recibido por Reclamaciones Médicas";
    // this.factura.actividad.push(this.actividad);
    // },

    async loadOneFactura() {
      try {
        const res = await getOneFactura();
        this.oneFactura = res.data;
        this.one = this.oneFactura[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.factura.no = this.nextNo;
        this.factura.principal = this.nextNo;
        this.factura.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveFacturaa() {
      await this.loadOneFactura();
      try {
        const res = await createFacturaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveFactura() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneFactura();
          this.oneFactura = res.data;
          this.one = this.oneFactura[0];
          this.nextNo = this.one.no + 1;
          this.factura.no = this.nextNo;
          this.factura.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.factura.userReg = this.$store.state.user.usuario;
        const res = await createFactura(this.factura).then(
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
        // this.$router.push("/facturas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      await this.definingFields();
      // await this.defFields();
      document.getElementById("idfact").focus();
      this.toggleAlert();
    },

    async deleteAllFacturas() {
      try {
        const res = await eliminateFacturas(this.factura);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      // this.factura.no = "";
      this.factura.idfact = "";
      this.factura.id_ars = "";
      this.factura.nom = "";
      this.factura.nro_autorizacion_salida = "";
      this.factura.fecha_ingreso = "";
      this.factura.numero_afiliado = "";
      this.factura.rnc = "";
      this.factura.tipo_factura = "";
      this.factura.cobertura = "";
      this.factura.total_servicio = "";
      // this.factura.status = "";
      // this.factura.actividad = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("idfact").focus();
    },
  },
});
</script>

<style lang="css" scoped>
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
</style>
