<template v-show="!cargando">
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <div v-show="!cargando" class="general">
    <div class="grid">
      <div class="areas">
        <h4><i class="fas fa-location-arrow" _mstvisible="2"></i> Areas</h4>
        <Filters
          :filterAreas="filterAreas"
          :search="search"
          :filteredAreas="filteredAreas"
        />
        <ListadoComponent :areas="areas" v-show="!cargando" />
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Area/FiltersComponent.vue";
import ListadoComponent from "@/components/Area/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Area } from "@/interfaces/Area";
import { getAreas } from "@/services/almaycru/AreaService";

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
      areas: [] as Area[],
      str: "",
      type: "",
    };
  },

  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },

    async filterAreas(catName: string) {
      try {
        const res = await getAreas();
        this.areas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.areas = this.areas.filter((area: Area) => {
          return area.type === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getAreas();
        this.areas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.areas = this.areas.filter((area: Area) => {
          return area.description.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

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
  },

  mounted() {
    this.loadAreas();
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
    "areas areas areas areas areas areas areas";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
}

.grid .areas {
  grid-area: areas;
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
</style>
