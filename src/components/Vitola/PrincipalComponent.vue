<template v-show="!cargando">
  <!-- Spinner -->
  <Transition>
    <div v-if="cargando" class="spin">
      <img class="img" src="@/assets/images/logo.png" />
    </div>
  </Transition>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <Transition>
    <div v-show="!cargando" class="general">
      <!-- Modal -->
      <Transition>
        <div v-if="showModal" class="modal">
          <div class="contenedor">
            <header>Filtros</header>
            <div class="contenido">
              <label @click="this.showModalMethod()" for="btn-modal">X</label>
              <div class="contenido">
                <Filters
                  :filterVitolas="filterVitolas"
                  :search="search"
                  :filteredVitolas="filteredVitolas"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <!-- Cuerpo -->
      <div class="grid">
        <div class="vitolas">
          <!-- <label
          style="cursor:pointer"
          @click="this.showModalMethod()"
          for="btn-modal"
          >Opciones</label
        > -->
          <h4>
            Vitolas
            <i
              style="cursor:pointer"
              @click="this.$router.push(`/vitolas/new`)"
              class="fas fa-plus"
              _mstvisible="2"
            ></i>
          </h4>
          <ListadoComponent :vitolas="vitolas" v-show="!cargando" />
        </div>
      </div>
    </div>
  </Transition>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Vitola/FiltersComponent.vue";
import ListadoComponent from "@/components/Vitola/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Vitola } from "@/interfaces/Vitola";
import { getVitolas } from "@/services/almaycru/Vitola";
import Pusher from "pusher-js";

export default {
  name: "App",

  components: {
    Filters,
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
      showModal: false,
      cargando: false,
      vitolas: [] as Vitola[],
      str: "",
      type: "",
    };
  },

  methods: {
    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadVitolas2();
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },
    async filterVitolas(catName: string) {
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.vitolas = this.vitolas.filter((vitola: Vitola) => {
          return vitola.tamano === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.vitolas = this.vitolas.filter((vitola: Vitola) => {
          return vitola.descripcion.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async loadVitolas() {
      this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadVitolas2() {
      this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
  },

  mounted() {
    this.loadVitolas();
    this.pusherSubscribe();
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
    "vitolas vitolas vitolas vitolas vitolas vitolas vitolas";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  border-radius: 7px;
}

.grid .vitolas {
  grid-area: vitolas;
  /* background-color: rgb(255, 255, 255); */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 7px; */
  padding-top: 0px;
}

h4 {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  font-size: 75%;
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

/* Modal */
.modal {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
}

.contenedor {
  width: 400px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  background: rgb(147, 147, 147);
  color: #fff;
}

.contenedor label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido {
  padding: 7px;
}

/* End Modal */

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
</style>
