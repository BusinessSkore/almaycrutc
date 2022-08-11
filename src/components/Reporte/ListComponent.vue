<template>
  <div class="gridlistareportes">
    <!-- Start Tarjeta -->
    <div
      v-for="(reporte, index) in reportes"
      :key="index"
      :class="toColor(reporte.type)"
      class="card text-white bg-primary mb-3"
      style="max-width: 20rem;"
    >
      <div class="card-header d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-white">{{ reporte.solicitado }}</h5>
        <small>
          <span :class="toColor2(reporte.status)">{{
            reporte.status
          }}</span></small
        >
      </div>
      <div
        style="cursor: pointer"
        @click="this.$router.push(`/reportes/${reporte._id}`)"
        class="card-body"
      >
        <h4 class="card-title">{{ reporte.description }}</h4>
        <p class="card-text">
          {{ reporte.detalles }}
        </p>
        <small>
          <span
            >{{ newFormatDate(reporte.createdAt) }}</span
          ></small
        >
      </div>
    </div>
    <!-- End Tarjeta -->
  </div>
</template>

<script lang="ts">
import numeral from "numeral";
import moment from "moment";
import { updateOne, updateReporte } from "@/services/almaycru/ReporteService";
import { Reporte } from "@/interfaces/Reporte";
import { createMensaje } from "@/services/almaycru/ChatService";

export default {
  props: ["reportes"],
  data() {
    return {
      message: {
        username: "R",
        message: "H",
      },
      nuevoReporte: {} as any,
      nuevoReporte2: {} as any,
      data: false,
      totales: {
        reportes: 0,
        bruto: 0,
        retension: 0,
        neto: 0,
      },
    };
  },
  methods: {
    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    async priorizar(
      arr: any,
      fromIndex: number,
      toIndex: number,
      descripcion: string
    ) {
      if (fromIndex !== 0) {
        // Array Local
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);

        // Base de Datos
        this.nuevoReporte = this.reportes[fromIndex - 1];
        this.nuevoReporte2 = this.reportes[fromIndex];
        this.nuevoReporte.no = this.reportes[fromIndex].no;
        this.nuevoReporte2.no = this.reportes[fromIndex].no + 1;

        await updateReporte(
          this.reportes[fromIndex - 1]._id,
          this.nuevoReporte
        );

        await updateReporte(this.reportes[fromIndex]._id, this.nuevoReporte2);

        // this.addMessage();
      } else {
        alert(descripcion + ", Ya está en su Máxima Prioridad.");
      }
    },

    async marcarListo(reporte: Reporte) {
      alert("Reporte Lista.");
      try {
        const res = await updateOne(reporte);
      } catch (error) {
        // console.error(error);
      }
    },

    toColor2(status: string) {
      if (status == "Reportado") {
        return "badge rounded-pill bg-secondary";
      } else if (status == "Recibido") {
        return "badge rounded-pill bg-dark";
      } else if (status == "Evaluado") {
        return "badge rounded-pill bg-danger";
      } else if (status == "Priorizado") {
        return "badge rounded-pill bg-danger";
      } else if (status == "Inicializado") {
        return "badge rounded-pill bg-warning";
      } else if (status == "Detenido") {
        return "badge rounded-pill bg-warning";
      } else if (status == "Concluído") {
        return "badge rounded-pill bg-success";
      } else if (status == "Entregado") {
        return "badge rounded-pill bg-success";
      } else if (status == "Seguido") {
        return "badge rounded-pill bg-info";
      } else if (status == "Validado") {
        return "badge rounded-pill bg-primary";
      }
    },

    toColor(type: string) {
      if (type == "Soporte") {
        return "card text-white bg-danger mb-3";
      } else if (type == "Asistencia") {
        return "card text-white bg-success mb-3";
      } else if (type == "Servicio") {
        return "card text-white bg-warning mb-3";
      }
    },
    valorTotal() {
      this.totales.reportes = this.reportes.length;
      this.totales.prefactura = this.reportes.reduce(
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

    newFormatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      return moment(out).startOf('hour').fromNow();
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

<style scoped>
.gridlistareportes {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 1px;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
