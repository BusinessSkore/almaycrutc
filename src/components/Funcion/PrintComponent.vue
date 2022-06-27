<template>
  <!-- <button @click="toPrint()"></button> -->
  <div v-if="cargando" class="spin"><img src="@/assets/images/logo.png" /></div>
  <body v-show="!cargando">
    <div class="grid-layout">
      <div class="caja c0"></div>
      <div class="caja c1">
        <h4 class="bold">{{ this.funcion.medico }}</h4>
        <h5>{{ this.funcion.direccion }}</h5>
        <!-- <h5>
          <span class="bold">RNC / Cédula: </span>
          <span>{{ this.funcion.rncMedico }}</span>
        </h5> -->
        <h5>
          <span class="bold">Teléfono: </span>
          <span>(829) 995-1122 </span>
        </h5>
        <h5>
          <span class="bold">E-Mail: </span>
          <span>admfinancierarodriguez@gmail.com </span>
        </h5>
      </div>
      <div class="caja c2">
        <h3 class="bold">Funcion<br /></h3>
        <h5>
          <span class="bold">No: </span>
          <span>{{ formatSecuence(funcion.no) }}</span>
        </h5>
        <!-- <h5>
          <span class="bold">NCF: </span>
        </h5> -->
        <h5>
          <span class="bold">Fecha: </span>
          <span>{{ formatDate(this.funcion.fechaProceso) }}</span>
        </h5>
        <!-- <h5>
          <span class="bold">Vencimiento: </span>
          <span>{{ formatDate(this.funcion.vencimiento) }}</span>
        </h5> -->
      </div>
      <div class="caja c7"></div>
      <div class="caja c3">
        <!-- <h5>
          <span class="bold">RNC Cliente: </span>
          <span>{{ this.funcion.rncCliente }}</span>
        </h5> -->
        <h5>
          <span class="bold">Cliente: </span>
          <span>{{ this.funcion.descCliente }}</span>
        </h5>
      </div>
      <div class="caja c4">
        <table class="table table-hover">
          <tr>
            <th>Descripción</th>
            <th>Valor</th>
          </tr>
          <tr>
            <td class="t izq">{{ this.funcion.descServicios }}</td>
            <td class="t der">
              {{ formatNumber(this.funcion.prefuncion) }}
            </td>
          </tr>
        </table>
      </div>
      <div class="caja c7"></div>
      <div class="caja c5">
        <h6 class="bold">Sub Total</h6>
        <h6 class="bold">N.D.</h6>
        <h6 class="bold">N.C.</h6>
        <h6 class="bold">Total</h6>
        <div class="firma">
          <p>____________________________</p>
          <p>Entregado Por</p>
        </div>
      </div>
      <div class="caja c6">
        <h6>{{ formatNumber(this.funcion.prefuncion) }}</h6>
        <h6>{{ formatNumber(this.funcion.descuento) }}</h6>
        <h6>{{ formatNumber(this.funcion.descuento) }}</h6>
        <h6 class="bold">
          {{ formatNumber(this.funcion.prefuncion) }}
        </h6>
        <div class="firma">
          <p>____________________________</p>
          <p>Recibido Por</p>
        </div>
      </div>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Funcion } from "@/interfaces/Funcion";
import {
  deleteFuncion,
  getFuncion,
  updateFuncion,
} from "@/services/almaycru/Funcion";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "funcion-list",
  data() {
    return {
      cargando: false,
      funcion: {} as Funcion,
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
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("DD/MM/YYYY");
    },
    async loadFuncion(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getFuncion(id);
        this.funcion = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      this.toPrint();

      if (this.$store.state.ids.length == 0) {
        this.$router.push(`/funcions/${this.funcion._id}`);
      } else {
        this.$router.push(`/funcionslot/new`);
      }

      // this.$router.push(`/funcions/${this.funcion._id}`);
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateFuncion(this.$route.params.id, this.funcion);
          this.$router.push("/funcions");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteFuncion(this.$route.params.id);
          this.$router.push("/funcions");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadFuncion(this.$route.params.id);
    }
  },

  // beforeUnmount() {
  //   this.toPrint();
  // }
});
</script>

<style lang="css" scoped>
.grid-layout {
  /* background-color: blanchedalmond; */
  display: grid;
  grid-template-columns: auto auto;
  /*background-color: chartreuse;*/
  /* padding-bottom: 30%; */

  /* width: 100%;  */
  max-width: 730px;
  margin: 0px auto;
  /* background-color: white; */
  /* font-size: 15px;
  margin-top: 0px;
  padding: 10px;
  margin-top: 0px; */
}

h1 {
  margin: 0;
}

h2 {
  margin: 0;
}

h3 {
  margin: 0;
}

.bold {
  font-weight: bold;
}

h4 {
  margin: 0;
}

.caja {
  /*background-color: burlywood;
      border: 2px solid black;*/
  margin: 5px;
}

.c0 {
  grid-column: 1/3;
  background-color: rgb(5, 24 ,250);
  height: 20px;
}

.c3 {
  grid-column: 1/3;
}

.c4 {
  grid-column: 1/3;
}

.c5 {
  grid-column: 1/2;
  text-align: right;
  text-align: left;
}

.c6 {
  grid-column: 2/3;
  text-align: right;
}

.c7 {
  grid-column: 1/3;
  background-color: rgb(5, 24 ,250);
  height: 3px;
}

table {
  width: 100%;
}

tr:nth-child(odd) {
  background-color: rgb(224, 224, 224);
}

th,
td {
  width: 100/6%;
  font-size: 100%;
}

td {
  text-align: right;
  font-size: 100%;
}

th {
  background-color: rgb(5, 24 ,250);
  color: white;
}

.izq {
  text-align: left;
}

body {
  background-color: white;
}

.h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

img {
  pointer-events: none;
  /* opacity: 0.7; */
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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
  border-bottom-color: rgb(5, 24 ,250);
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

p {
  margin: 0;
}

.firma {
  margin-top: 150px;
  /* background-color: violet; */
  font-weight: bold;
}
</style>