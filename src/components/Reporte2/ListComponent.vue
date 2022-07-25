<template>
  <!-- <h6>
    Reportes: <br />
    {{ this.reportes }}
  </h6>
  <br />

  <h6>
    Ids: <br />
    {{ this.ids }}
  </h6>
  <br />

  <h6>
    Nuevo1: <br />
    {{ this.nuevoReporte }}
  </h6>
  <br />

  <h6>
    Nuevo2: <br />
    {{ this.nuevoReporte2 }}
  </h6>
  <br /> -->

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
        <h5 class="mb-1 text-white">{{ reporte.solicitante }}</h5>
        <small
          ><span :class="toColor2(reporte.status)">{{ reporte.status }}</span>
          <i
            v-show="!cargando"
            @click="
              priorizar(this.reportes, index, index - 1, reporte.description)
            "
            style="cursor: pointer"
            class="fas fa-chevron-circle-up"
          ></i>

          <i v-show="cargando" class="fas fa-spinner" _mstvisible="2"></i>
        </small>
      </div>
      <div
        style="cursor: pointer"
        @click="this.$router.push(`/reporte2s/${reporte._id}`)"
        class="card-body"
      >
        <h4 class="card-title">{{ reporte.description }}</h4>
        <p class="card-text">
          {{ reporte.detalles }}
        </p>
        <small>
          <span
            >{{ newFormatDate(reporte.createdAt) }} ({{
              newFormatDate2(reporte.createdAt)
            }})</span
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
      ids: {
        primero: {
          id: "",
          no: 0,
        },
        segundo: {
          id: "",
          no: 0,
        },
      },
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
      cargando: false,
    };
  },
  methods: {
    async addMessage() {
      this.cargando = !this.cargando;
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
      this.cargando = !this.cargando;
    },

    async priorizar(
      arr: any,
      fromIndex: number,
      toIndex: number,
      descripcion: string
    ) {
      if (fromIndex !== 0) {
        // Array Local
        // let element = arr[fromIndex];
        // arr.splice(fromIndex, 1);
        // arr.splice(toIndex, 0, element);

        // Seleccionar
        this.ids.primero = {};
        this.ids.segundo = {};
        this.ids.primero.id = this.reportes[fromIndex - 1]._id;
        this.ids.primero.no = this.reportes[fromIndex - 1].no;
        this.ids.segundo.id = this.reportes[fromIndex]._id;
        this.ids.segundo.no = this.reportes[fromIndex].no;

        // Base de Datos
        this.nuevoReporte = this.reportes[fromIndex - 1];
        this.nuevoReporte2 = this.reportes[fromIndex];
        this.nuevoReporte.no = this.ids.segundo.no;
        this.nuevoReporte2.no = this.ids.primero.no;

        await updateReporte(this.ids.primero.id, this.nuevoReporte);

        await updateReporte(this.ids.segundo.id, this.nuevoReporte2);

        await this.addMessage();
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

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("DD/MM/YYYY h:mm");
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
    },

    newFormatDate2(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue)
        .startOf("hour")
        .fromNow();
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
