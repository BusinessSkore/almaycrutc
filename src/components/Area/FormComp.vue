<template v-show="!cargando">
  <Navbar />
  <!-- {{ this.areas }}<br /><br />
  {{ area.superior }} -->
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
        <i class="fas fa-check"></i> Area Registrada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h6>Nueva Area</h6>
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
            <!-- <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="superior"
                >Superior:</label
              ><input
                id="superior"
                type="superior"
                v-model="area.superior"
                class="form-control"
              />
            </div> -->
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
        <button
          :disabled="!area.superior || !area.description || !area.type"
          class="btn btn-primary"
          @click.prevent="saveArea()"
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
import { Area } from "@/interfaces/Area";
import { getAreas } from "@/services/cuetasporcobrarcj/AreaService";
import {
  createArea,
  eliminateAreas,
  createAreaa,
  getOneArea,
} from "@/services/cuetasporcobrarcj/AreaService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "areas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      areas: [] as Area[],
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      area: {} as Area,
      oneArea: {} as Area,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",
    };
  },

  mounted() {
    this.loadAreas();
    this.defFields();
    this.focus();
  },

  methods: {
    async loadAreas() {
      this.toggleLoading();
      try {
        const res = await getAreas();
        this.areas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcArea() {
      (this.area.retension = this.area.bruto * 0.1),
        (this.area.neto = this.area.bruto * 0.9);
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

    defFields() {
      this.area.estatus = "Pendiente";
    },

    async loadOneArea() {
      try {
        const res = await getOneArea();
        this.oneArea = res.data;
        this.one = this.oneArea[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.area.no = this.nextNo;
        this.area.principal = this.nextNo;
        this.area.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveAreaa() {
      await this.loadOneArea();
      try {
        const res = await createAreaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveArea() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneArea();
          this.oneArea = res.data;
          this.one = this.oneArea[0];
          this.nextNo = this.one.no + 1;
          this.area.no = this.nextNo;
          this.area.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.area.userReg = this.$store.state.user.usuario;
        const res = await createArea(this.area);
        // this.$router.push("/areas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      await this.definingFields();
      await this.defFields();
      document.getElementById("superior").focus();
      this.toggleAlert();
    },

    async deleteAllAreas() {
      try {
        const res = await eliminateAreas(this.area);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      this.area.description = "";
      this.area.type = "";
      this.area.superior = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("superior").focus();
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
  background-color: white;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 4px;
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
</style>
