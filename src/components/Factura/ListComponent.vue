<template>
  <table v-if="this.totales.facturas" id="customers">
    <tr>
      <th>ID</th>
      <th>Fecha</th>
      <!-- <th>Orígen</th> -->
      <th>ARS</th>
      <!-- <th>Autorización</th> -->
      <th>Paciente</th>
      <!-- <th>No. Afiliado</th> -->
      <!-- <th>Cédula</th> -->
      <th>Cobertura</th>
      <!-- <th>Total</th> -->
      <!-- <th></th> -->
    </tr>
    <tr
      v-for="(factura, index) in facturas"
      :key="index"
      @click="this.$router.push(`/facturas/${factura._id}`)"
    >
      <td :class="toColor(factura.status)">{{ factura.idfact }}</td>
      <td :class="toColorDate(diffDate(factura.fecha_ingreso))">
        {{ formatDate(factura.fecha_ingreso) }} ({{
          diffDate(factura.fecha_ingreso)
        }}
        días)
      </td>
      <!-- <td>{{ factura.tipo_factura }}</td> -->
      <td>{{ getARS(factura.id_ars) }}</td>
      <!-- <td>{{ factura.nro_autorizacion_salida }}</td> -->
      <td>{{ factura.nom }}</td>
      <!-- <td>{{ factura.numero_afiliado }}</td> -->
      <!-- <td>{{ factura.rnc }}</td> -->
      <td class="der" :class="toColorNumber(factura.cobertura)">
        {{ formatNumber(factura.cobertura, true) }}
      </td>
      <!-- <td class="der" >{{ formatNumber(factura.total_servicio) }}</td> -->
      <!-- <td :class="toColor(factura.status)">{{ factura.status }}</td> -->
    </tr>
    <tr>
      <td>Total: {{ formatNumber(this.totales.facturas) }}</td>
      <td></td>
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <td></td>
      <td></td>
      <td :class="toColorNumber(this.totales.cobertura)" class="der">
        {{ formatNumber(this.totales.cobertura, true) }}
      </td>
      <!-- <td></td> -->
      <!-- <td></td> -->
    </tr>
  </table>

  <h6 class="noRegist" v-if="!this.totales.facturas">
    No se Encontraron Registros.
  </h6>

  <!-- <div class="gridlistafacturas">
    <table class="table table-hover">
      <thead v-if="this.totales.facturas">
        <tr class="mith">
          <th class="cwhite">Título</th>
          <th class="cwhite">Descripción</th>
          <th class="cwhite"></th>
          <th class="cwhite"></th>
        </tr>
      </thead>
      <tbody v-for="(factura, index) in facturas" :key="index">
        <tr :class="toColor2(factura.type)">
          <td class="bold">
            {{ factura.title }}
          </td>
          <td class="bold">
            {{ factura.description }}
          </td>
          <td class="bold">
            <i
              style="cursor: pointer"
              @click="this.$router.push(`/facturas/${factura._id}`)"
              class="fas fa-edit"
            ></i>
          </td>
          <td class="bold">
            <i
              style="cursor: pointer"
              @click="marcarListo(factura)"
              class="fas fa-check"
            ></i>
          </td>
        </tr>
      </tbody>
      <tbody>
        <h6 class="noRegist" v-if="!this.totales.facturas">
          No se encontraron registros.
        </h6>
        <tr v-if="this.totales.facturas">
          <td class="bold izq bold">
            Total: {{ formatNumber2(this.totales.facturas) }}
          </td>
          <td class="bold der"></td>
          <td class="bold der"></td>
          <td class="bold der"></td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<script lang="ts">
import numeral from "numeral";
import moment from "moment";
import { updateOne } from "@/services/cuetasporcobrarcj/FacturaService";
import { Factura } from "@/interfaces/Factura";

export default {
  props: ["facturas"],
  data() {
    return {
      data: false,
      totales: {},
    };
  },
  methods: {
    diffDate(dateValue: Date) {
      var NowMoment = moment().format("DD/MM/YYYY");
      // var Date = "2022-06-07";
      var Date = dateValue;

      return moment().diff(moment(Date), "days");
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
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

    toColorDate(type: string) {
      if (type >= "6") {
        return "valor1";
      } else if (type >= "5") {
        return "valor2";
      } else if (type >= "4") {
        return "valor3";
      } else if (type >= "3") {
        return "valor4";
      } else if (type >= "2") {
        return "valor5";
      } else if (type >= "1") {
        return "valor6";
      } else if (type >= "0") {
        return "valor7";
      }
    },

    toColorNumber(type: number) {
      if (type >= 500000) {
        return "valor1";
      } else if (type >= 350000) {
        return "valor2";
      } else if (type >= 225000) {
        return "valor3";
      } else if (type >= 63000) {
        return "valor4";
      } else if (type >= 28000) {
        return "valor5";
      } else if (type >= 7000) {
        return "valor6";
      } else if (type >= 0) {
        return "valor7";
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

    async marcarListo(factura: Factura) {
      alert("Factura Lista.");
      try {
        const res = await updateOne(factura);
      } catch (error) {
        // console.error(error);
      }
    },

    toColor2(type: string) {
      if (type == "Error") {
        return "table-danger";
      } else if (type == "Función") {
        return "table-success";
      } else if (type == "Factura") {
        return "table-warning";
      }
    },
    valorTotal() {
      this.totales.facturas = this.facturas.length;
      this.totales.cobertura = this.facturas.reduce(
        (accum: any, item: any) => accum + item.cobertura,
        0
      );
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    // formatNumber2(value: number) {
    //   return numeral(value).format("0,0");
    // },

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
.valor1 {
  /* text-align: center; */
  /* background-color: rgb(255, 0, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 0, 0);
}

.valor2 {
  /* text-align: center; */
  /* background-color: rgb(255, 64, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 64, 0);
}

.valor3 {
  /* text-align: center; */
  /* background-color: rgb(255, 128, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 128, 0);
}

.valor4 {
  /* text-align: center; */
  /* background-color: rgb(255, 192, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor5 {
  /* text-align: center; */
  /* background-color: rgb(171, 187, 26); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(171, 187, 26);
}

.valor6 {
  /* text-align: center; */
  /* background-color: rgb(86, 182, 53); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(86, 182, 53);
}

.valor7 {
  /* text-align: center; */
  /* background-color: rgb(0, 176, 80); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.bold {
  font-weight: bold;
}

.gridlistafacturas {
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
  background-color: rgb(5, 24, 250);
}

.cwhite {
  color: white;
}

.der {
  text-align: right;
}

.noRegist {
  font-weight: bold;
  color: rgb(255, 85, 85);
  text-align: center;
  /* background-color: rgb(255, 85, 85); */
  font-size: 75%;
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
</style>
