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
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="status"
                >Estatus:</label
              ><input
                id="status"
                type="status"
                v-model="factura.status"
                class="form-control"
              />
            </div>
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
        <div class="grid">
          <button
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!factura.title || !factura.description || !factura.type"
          >
            <i class="fas fa-edit"></i> Actualizar
          </button>
          <button class="btn btn-danger" @click.prevent="handleDelete()">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button>
        </div>
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
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "factura-list",
  components: {
    Navbar,
  },
  data() {
    return {
      showAlert: false,
      cargando: false,
      clienteSelected: [],
      medicoSelected: [],
      factura: {} as Factura,
      estado: {} as object,
    };
  },
  methods: {
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

    fixTime() {
      this.factura.fechaProceso = this.formatDate(this.factura.fechaProceso);
      this.factura.fechaEfectivo = this.formatDate(this.factura.fechaEfectivo);
      this.factura.fechaVence = this.formatDate(this.factura.fechaVence);
    },

    async loadFactura(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getFactura(id);
        this.factura = data;
        this.estado = this.factura.estado;
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
          this.factura.userMod = this.$store.state.user.usuario;
          await updateFactura(this.$route.params.id, this.factura);
          if (this.factura.literal == "B15") {
            this.medicoSelected[0].compGuberAsig += 1;
          } else {
            this.medicoSelected[0].compNoGuberAsig += 1;
          }
          this.$router.push("/facturas");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      this.toggleAlert();
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteFactura(this.$route.params.id);
          this.$router.push("/facturas");
        }
      } catch (error) {
        //console.error(error);
      }
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadFactura(this.$route.params.id);
    }
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
