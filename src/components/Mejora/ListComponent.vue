<template>
  <div class="gridlistamejoras">
    <table class="table table-hover">
      <thead v-if="this.totales.mejoras">
        <tr class="mith">
          <!-- <th class="cwhite">No.</th> -->
          <th class="cwhite">Título</th>
          <th class="cwhite">Descripción</th>
          <th class="cwhite"></th>
          <th class="cwhite"></th>
          <!-- <th class="cwhite">Tipo</th> -->
        </tr>
      </thead>
      <tbody v-for="(mejora, index) in mejoras" :key="index">
        <!------------------------------- linea ------------------------------->
        <tr :class="toColor(mejora.type)">
          <!-- <td class="t izq bold">
            {{ formatSecuence(mejora.no) }}
          </td> -->
          <td class="bold">
            {{ mejora.title }}
          </td>
          <td class="bold">
            {{ mejora.description }}
          </td>
          <td class="bold">
            <i
              style="cursor: pointer"
              @click="this.$router.push(`/mejoras/${mejora._id}`)"
              class="fas fa-edit"
            ></i>
          </td>
          <td class="bold">
            <i
              style="cursor: pointer"
              @click="marcarListo(mejora)"
              class="fas fa-check"
            ></i>
          </td>
          <!-- <td class="bold">
            {{ mejora.type }}
          </td> -->
        </tr>
        <!------------------------------- ***** ------------------------------->
      </tbody>
      <tbody>
        <h6 class="noRegist" v-if="!this.totales.mejoras">
          No se encontraron registros.
        </h6>
        <tr v-if="this.totales.mejoras">
          <td class="bold izq bold">
            Total: {{ formatNumber2(this.totales.mejoras) }}
          </td>
          <td class="bold der"></td>
          <td class="bold der"></td>
          <td class="bold der"></td>

          <!-- <td class="bold der blue"></td> -->
          <!-- <td class="bold der blue"></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import numeral from "numeral";
import moment from "moment";
import { updateOne } from "@/services/almaycru/MejoraService";
import { Mejora } from "@/interfaces/Mejora";

export default {
  props: ["mejoras"],
  data() {
    return {
      data: false,
      totales: {
        mejoras: 0,
        bruto: 0,
        retension: 0,
        neto: 0,
      },
    };
  },
  methods: {
    async marcarListo(mejora: Mejora) {
      alert("Mejora Lista.");
      try {
        const res = await updateOne(mejora);
      } catch (error) {
        // console.error(error);
      }
    },

    toColor(type: string) {
      if (type == "Error") {
        return "table-danger";
      } else if (type == "Función") {
        return "table-success";
      } else if (type == "Mejora") {
        return "table-warning";
      }
    },
    valorTotal() {
      this.totales.mejoras = this.mejoras.length;
      this.totales.prefactura = this.mejoras.reduce(
        (accum: any, item: any) => accum + item.prefactura,
        0
      );
    },

    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatNumber2(value: number) {
      return numeral(value).format("0,0");
    },

    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("DD/MM/YYYY");
    },
  },

  updated() {
    this.valorTotal();
    // this.data = !this.data;
  },
};
</script>

<style lang="css" scoped>
.bold {
  font-weight: bold;
}

.gridlistamejoras {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-c {
  text-align: center;
}

p {
  margin: 0px;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

.green {
  color: green;
}

td,
th {
  font-size: 75%;
}

.mith {
  background-color: rgb(0, 0, 0);
}

.cwhite {
  color: white;
}

.der {
  text-align: right;
}

.noRegist {
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: rgb(255, 85, 85);
}
</style>
