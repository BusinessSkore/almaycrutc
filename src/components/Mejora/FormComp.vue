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
        <i class="fas fa-check"></i> Mejora Registrada Exitosamente!
      </h4>
    </div>
    <form>
      <fieldset>
        <h6>Nueva Mejora</h6>
        <div class="form-group">
          <label class="form-label"><b>Datos Generales</b></label>
          <!-- Start Fields -->
          <div class="grid">
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="title"
                >Título:</label
              ><input
                id="title"
                type="title"
                v-model="mejora.title"
                class="form-control"
              />
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="description"
                >Descripción:</label
              ><input
                id="description"
                type="description"
                v-model="mejora.description"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="type"
                >Tipo:</label
              ><select
                id="type"
                type="type"
                v-model="mejora.type"
                class="form-select"
              >
                <option>Error</option>
                <option>Mejora</option>
                <option>Función</option>
              </select>
            </div>
          </div>
          <!-- End Fields -->
        </div>
        <button
          class="btn btn-primary"
          @click.prevent="saveMejora()"
          :disabled="!mejora.title || !mejora.description || !mejora.type"
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
import { Mejora } from "@/interfaces/Mejora";
import {
  createMejora,
  eliminateMejoras,
  createMejoraa,
  getOneMejora,
} from "@/services/cuetasporcobrarcj/MejoraService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "mejoras-form",
  components: {
    Navbar,
  },
  data() {
    return {
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      mejora: {} as Mejora,
      oneMejora: {} as Mejora,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",
    };
  },

  mounted() {
    this.defFields();
    this.focus();
  },

  methods: {
    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcMejora() {
      (this.mejora.retension = this.mejora.bruto * 0.1),
        (this.mejora.neto = this.mejora.bruto * 0.9);
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
      this.mejora.estatus = "Pendiente";
    },

    async loadOneMejora() {
      try {
        const res = await getOneMejora();
        this.oneMejora = res.data;
        this.one = this.oneMejora[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.mejora.no = this.nextNo;
        this.mejora.principal = this.nextNo;
        this.mejora.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveMejoraa() {
      await this.loadOneMejora();
      try {
        const res = await createMejoraa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveMejora() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneMejora();
          this.oneMejora = res.data;
          this.one = this.oneMejora[0];
          this.nextNo = this.one.no + 1;
          this.mejora.no = this.nextNo;
          this.mejora.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.mejora.userReg = this.$store.state.user.usuario;
        const res = await createMejora(this.mejora);
        // this.$router.push("/mejoras/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      await this.definingFields();
      await this.defFields();
      document.getElementById("title").focus();
      this.toggleAlert();
    },

    async deleteAllMejoras() {
      try {
        const res = await eliminateMejoras(this.mejora);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      this.mejora.title = "";
      this.mejora.description = "";
      this.mejora.type = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("title").focus();
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
