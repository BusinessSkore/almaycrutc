<template>
  <div>
    <h6>Detalles de Recapada</h6>
    <label class="form-label"><b>Datos de la Recapada</b></label>
    <div class="form-group">
      <div class="grid">
        <!-- Start Fields -->
        <p><span class="bold"> No.: </span>{{ formatSecuence(recapada.no) }}</p>
        <p><span class="bold"> Fecha: </span>{{ formatDate(recapada.fecha) }}</p>
        <p><span class="bold"> Liga: </span>{{ recapada.liga }}</p>
        <p><span class="bold"> Vitola: </span>{{ recapada.vitola }}</p>
        <!-- <p>Cantidad:{{ recapada.cantidad }}</p> -->
        <!-- <p><span class="bold"> Monos: </span>{{ recapada.monos }}</p> -->
      </div>
      <label class="form-label"><b>Datos de Empleados</b></label>
      <div class="grid">
        <p>
          <span class="bold"> Mezclador: </span>{{ recapada.empleadoMezclador }}
        </p>
        <p><span class="bold"> Empuñero: </span>{{ recapada.empleadoEmpunero }}</p>
        <p><span class="bold"> Pegador: </span>{{ recapada.empleadoPegador }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Recapada } from "@/interfaces/Recapada";
import { deleteRecapada, getRecapada, updateRecapada } from "@/services/almaycru/Recapada";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "recapada-list",
  data() {
    return {
      cargando: false,
      recapada: {} as Recapada,
    };
  },
  methods: {
    toPrint() {
      window.print();
    },
    toggleLoading() {
      this.cargando = !this.cargando;
    },
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatNumber2(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy HH:mm");
    },
    async loadRecapada(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getRecapada(id);
        this.recapada = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      this.toPrint();

      if (this.$store.state.ids.length == 0) {
        this.$router.push(`/recapadas/${this.recapada._id}`);
      } else {
        this.$router.push(`/recapadaslot/new`);
      }

      // this.$router.push(`/recapadas/${this.recapada._id}`);
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateRecapada(this.$route.params.id, this.recapada);
          this.$router.push("/recapadas");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteRecapada(this.$route.params.id);
          this.$router.push("/recapadas");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadRecapada(this.$route.params.id);
    }
  },

  // beforeUnmount() {
  //   this.toPrint();
  // }
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
  max-width: 750px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
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

p {
  font-size: 130%;
  margin: 0;
}

.bold {
  font-weight: bold;
}
</style>
