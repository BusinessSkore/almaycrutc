<template v-show="!cargando">
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <div v-show="!cargando" class="general">
    <div class="grid">
      <div class="reportes">
        <h4>
          <i class="fas fa-file-alt" _mstvisible="2"></i> Reportes
          <button
            @click="this.$router.push(`/reportes/new`)"
            class="btn btn-success btn-sm"
            type="button"
          >
            <i class="fas fa-plus" _mstvisible="2"></i> Agregar Reporte
          </button>
        </h4>

        <!-- <Filters
          :filterReportes="filterReportes"
          :search="search"
          :filteredReportes="filteredReportes"
        /> -->
        <ListadoComponent :reportes="reportes" v-show="!cargando" />
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Reporte/FiltersComponent.vue";
import ListadoComponent from "@/components/Reporte/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Reporte } from "@/interfaces/Reporte";
import { getReportes, getReportesByUser } from "@/services/cuetasporcobrarcj/ReporteService";
import { Usuario } from "@/interfaces/Usuario";
import Pusher from "pusher-js";
import { createMensaje } from "@/services/cuetasporcobrarcj/ChatService";

export default {
  name: "App",

  components: {
    // Filters,
    ListadoComponent,
    Navbar,
  },

  data() {
    return {
      song: {
        title: "Notification",
        src: require("@/assets/sounds/notification.mp3"),
      },
      player: new Audio(),
      usuario: {} as Usuario,
      cargando: false,
      reportes: [] as Reporte[],
      str: "",
      type: "",
    };
  },

  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },

    async filterReportes(catName: string) {
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.reportes = this.reportes.filter((reporte: Reporte) => {
          return reporte.type === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.reportes = this.reportes.filter((reporte: Reporte) => {
          return reporte.description.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async loadReportes() {
      this.toggleLoading();
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadReportesByUser() {
      this.toggleLoading();
      try {
        const res = await getReportesByUser(this.usuario);
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadReportesByUser2() {
      try {
        const res = await getReportesByUser(this.usuario);
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
    },

    async loadReportes2() {
      try {
        const res = await getReportes();
        this.reportes = res.data;
      } catch (error) {
        // console.error(error);
      }
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("ec64cab5b5fa0b45d374", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadReportesByUser2();
      });
      // End pusher subscribe
    },
  },

  mounted() {
    this.usuario.nombre = this.$store.state.user.usuario;
    // this.loadReportes();
    this.loadReportesByUser();
    this.pusherSubscribe();
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
}
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
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

/* .grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto auto;
  gap: 1em;
  grid-template-areas:
    "filters filters filters filters filters filters filters"
    "reportes reportes reportes reportes reportes reportes reportes";
} */

/* .grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
} */

.grid .reportes {
  grid-area: reportes;
  background-color: rgb(255, 255, 255);
  border-radius: 7px;
  padding-top: 20px;
}

h4 {
  margin-bottom: 10px;
}
</style>
