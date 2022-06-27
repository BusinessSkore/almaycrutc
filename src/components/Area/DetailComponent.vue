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
        <i class="fas fa-check"></i> Area Actualizada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h6>Detalles de Area</h6>
        <div class="form-group">
          <label class="form-label"><b>Datos Generales</b></label>
          <!-- Start Fields -->
          <div class="grid">
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="superior"
                >Superior:</label
              ><select
                id="superior"
                type="superior"
                v-model="area.superior"
                class="form-select"
              >
                <option
                  :value="area.no"
                  v-for="(area, index) in areas"
                  :key="index"
                  >{{ area.description }}</option
                >
              </select>
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="description"
                >Descripción:</label
              ><input
                id="description"
                type="description"
                v-model="area.description"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="type"
                >Tipo:</label
              ><select
                id="type"
                type="type"
                v-model="area.type"
                class="form-select"
              >
                <option>Empresa</option>
                <option>Sucursal</option>
                <option>Departamento</option>
                <option>Función</option>
                <option>Grupo</option>
              </select>
            </div>
          </div>
          <!-- End Fields -->
        </div>
        <div class="grid">
          <button
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!area.description || !area.type"
          >
            <i class="fas fa-edit"></i> Actualizar
          </button>
          <!-- <button class="btn btn-danger" @click.prevent="handleDelete()">
            <i class="fas fa-trash-alt"></i> Eliminar
          </button> -->
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Area } from "@/interfaces/Area";
import { getAreas } from "@/services/almaycru/AreaService";
import { deleteArea, getArea, updateArea } from "@/services/almaycru/AreaService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "area-list",
  components: {
    Navbar,
  },
  data() {
    return {
      areas: [] as Area[],
      showAlert: false,
      cargando: false,
      clienteSelected: [],
      medicoSelected: [],
      area: {} as Area,
      estado: {} as object,
    };
  },
  methods: {
    async loadAreas() {
      try {
        const res = await getAreas();
        this.areas = res.data;
      } catch (error) {
        // console.error(error);
      }
    },
    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    async facturar() {
      this.area.cantPrefactura = 0;
      this.area.cantFactura = 1;
      this.area.credito = 0;
      this.area.debito = 0;
      this.area.subTipo = "Factura";
      this.area.factura = this.area.prefactura;
      this.area.prefactura = 0;
      await this.selectCliente(this.area.descCliente);
      this.area.literal = this.clienteSelected[0].tipoComprobante.substring(
        0,
        3
      );
      await this.selectMedico(this.area.medico);
      if (this.area.literal == "B15") {
        this.area.ncf = this.medicoSelected[0].compGuberAsig;
        this.area.vencimiento = this.medicoSelected[0].fechGuberAsig;
        this.area.fechaNCF = new Date();
      } else {
        this.area.ncf = this.medicoSelected[0].compNoGuberAsig;
        this.area.vencimiento = this.medicoSelected[0].fechNoGuberAsig;
        this.area.fechaNCF = new Date();
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
      this.area.fechaProceso = this.formatDate(this.area.fechaProceso);
      this.area.fechaEfectivo = this.formatDate(this.area.fechaEfectivo);
      this.area.fechaVence = this.formatDate(this.area.fechaVence);
    },

    async loadArea(id: string) {
      this.toggleLoading();
      this.loadAreas();
      try {
        const { data } = await getArea(id);
        this.area = data;
        this.estado = this.area.estado;
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
          this.area.userMod = this.$store.state.user.usuario;
          await updateArea(this.$route.params.id, this.area);
          if (this.area.literal == "B15") {
            this.medicoSelected[0].compGuberAsig += 1;
          } else {
            this.medicoSelected[0].compNoGuberAsig += 1;
          }
          this.$router.push("/areas");
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
          deleteArea(this.$route.params.id);
          this.$router.push("/areas");
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
      this.loadArea(this.$route.params.id);
    }
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
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 4px;
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
</style>
