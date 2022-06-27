<template v-show="!cargando">
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <div v-show="!cargando" class="general">
    <div class="grid">
      <div class="mejoras">
        <h4><i class="fas fa-check" _mstvisible="2"></i> Mejoras</h4>
        <Filters
          :filterMejoras="filterMejoras"
          :search="search"
          :filteredMejoras="filteredMejoras"
        />
        <ListadoComponent :mejoras="mejoras" v-show="!cargando" />
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Mejora/FiltersComponent.vue";
import ListadoComponent from "@/components/Mejora/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Mejora } from "@/interfaces/Mejora";
import { getMejoras } from "@/services/almaycru/MejoraService";

export default {
  name: "App",

  components: {
    Filters,
    ListadoComponent,
    Navbar,
  },

  data() {
    return {
      cargando: false,
      mejoras: [] as Mejora[],
      str: "",
      type: "",
    };
  },

  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },
    async filterMejoras(catName: string) {
      try {
        const res = await getMejoras();
        this.mejoras = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.mejoras = this.mejoras.filter((mejora: Mejora) => {
          return mejora.type === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getMejoras();
        this.mejoras = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.mejoras = this.mejoras.filter((mejora: Mejora) => {
          return mejora.title.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async loadMejoras() {
      this.toggleLoading();
      try {
        const res = await getMejoras();
        this.mejoras = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
  },

  mounted() {
    this.loadMejoras();
  },
};
</script>

<style lang="css" scoped>
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

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto auto;
  gap: 1em;
  grid-template-areas:
    "filters filters filters filters filters filters filters"
    "mejoras mejoras mejoras mejoras mejoras mejoras mejoras";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
}

.grid .mejoras {
  grid-area: mejoras;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
  padding-top: 20px;
}

h4 {
  background-color: rgb(147, 147, 147);
  /* border-radius: 7px; */
  color: white;
  text-align: center;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

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

.yellow {
  background-color: orange;
}

/* <!----------------------------------------------------------------------------------------------------------> */
</style>
