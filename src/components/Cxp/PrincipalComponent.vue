<template v-show="!cargando">
  <div>
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
                    :filterCxps="filterCxps"
                    :search="search"
                    :filteredCxps="filteredCxps"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <!-- Cuerpo -->
        <div class="grid">
          <div class="cxps">
            <!-- <label
          style="cursor:pointer"
          @click="this.showModalMethod()"
          for="btn-modal"
          >Opciones</label
        > -->
            <h4>
              Cuentas por Pagar
              <i
                style="cursor:pointer"
                @click="this.$router.push(`/cxps/new`)"
                class="fas fa-plus"
                _mstvisible="2"
              ></i>
            </h4>
            <div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="onlyRange"
                  id="esVol"
                />
                <label class="form-check-label" for="esVol"
                  >Filtro Completo</label
                >
              </div>
            </div>
            <div v-if="onlyRange" class="grid">
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="desde"
                  >Desde:</label
                ><input
                  id="desde"
                  type="date"
                  v-model="criterio.desde"
                  class="form-control"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="hasta"
                  >Hasta:</label
                ><input
                  id="hasta"
                  type="date"
                  v-model="criterio.hasta"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><select
                  id="empleado"
                  v-model="criterio.empleado"
                  class="form-select"
                >
                  <option
                    v-for="(empleado, index) in empleados"
                    :key="index"
                    :value="empleado.nombre"
                    >{{ empleado.nombre }}</option
                  >
                </select>
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="origen"
                  >Orígen:</label
                ><select
                  id="origen"
                  v-model="criterio.origen"
                  class="form-select"
                >
                  <option>Producción</option>
                  <option>Recapada</option>
                  <option>Incentivo</option>
                  <option>Salario</option>
                  <option>Jornada</option>
                  <option>Otro</option>
                </select>
              </div>
              <button
                class="btn btn-success"
                @click.prevent="loadCxps()"
                :disabled="
                  !criterio.desde ||
                    !criterio.hasta ||
                    !criterio.empleado ||
                    !criterio.origen
                "
              >
                <i class="fas fa-search"></i> Buscar
              </button>
            </div>
            <div v-if="!onlyRange" class="grid">
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="desde"
                  >Desde:</label
                ><input
                  id="desde"
                  type="date"
                  v-model="criterioTwo.desde"
                  class="form-control"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="hasta"
                  >Hasta:</label
                ><input
                  id="hasta"
                  type="date"
                  v-model="criterioTwo.hasta"
                  class="form-control"
                />
              </div>

              <button
                class="btn btn-success"
                @click.prevent="loadCxpsTwo()"
                :disabled="!criterioTwo.desde || !criterioTwo.hasta"
              >
                <i class="fas fa-search"></i> Buscar
              </button>
            </div>
            <ListadoComponent :cxps="cxps" v-show="!cargando" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Cxp/FiltersComponent.vue";
import ListadoComponent from "@/components/Cxp/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Cxp } from "@/interfaces/Cxp";
import { getCxps, getCxpsTwo } from "@/services/almaycru/Cxp";
import { getEmpleados } from "@/services/almaycru/Empleado";
import { Empleado } from "@/interfaces/Empleado";
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
      cxps: [] as Cxp[],
      str: "",
      type: "",
      criterio: {} as any,
      criterioTwo: {} as any,
      empleados: [] as Empleado[],
      onlyRange: true,
    };
  },

  methods: {
    async loadEmpleados() {
      this.toggleLoading();
      try {
        const res = await getEmpleados();
        this.empleados = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadCxps2();
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
    async filterCxps(catName: string) {
      try {
        const res = await getCxps(this.criterio);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.cxps = this.cxps.filter((cxp: Cxp) => {
          return cxp.empleado === catName;
        });
      }
    },
    async filterCxpsTwo(catName: string) {
      try {
        const res = await getCxpsTwo(this.criterioTwo);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.cxps = this.cxps.filter((cxp: Cxp) => {
          return cxp.empleado === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getCxps(this.criterio);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.cxps = this.cxps.filter((cxp: Cxp) => {
          return cxp.empleado.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async searchTwo(term: string) {
      this.toggleLoading();
      try {
        const res = await getCxpsTwo(this.criterioTwo);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.cxps = this.cxps.filter((cxp: Cxp) => {
          return cxp.empleado.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async loadCxps() {
      this.toggleLoading();
      try {
        const res = await getCxps(this.criterio);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadCxpsTwo() {
      this.toggleLoading();
      try {
        const res = await getCxpsTwo(this.criterioTwo);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadCxps2() {
      this.toggleLoading();
      try {
        const res = await getCxps(this.criterio);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadCxpsTwo2() {
      this.toggleLoading();
      try {
        const res = await getCxpsTwo(this.criterioTwo);
        this.cxps = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
  },

  mounted() {
    this.loadEmpleados();
    // this.loadCxps();
    // this.pusherSubscribe();
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
    "cxps cxps cxps cxps cxps cxps cxps";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  border-radius: 7px;
}

.grid .cxps {
  grid-area: cxps;
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
