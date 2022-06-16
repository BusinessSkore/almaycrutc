<template v-show="!cargando">
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <div v-show="!cargando" class="general">
    <div class="grid">
      <div class="usuarios">
        <h4><i class="fas fa-users" _mstvisible="2"></i> Usuarios</h4>

        <!-- <h4>
          <small><i class="fas fa-users" _mstvisible="2"></i></small> Usuarios
        </h4> -->
        <Filters
          :filterUsuarios="filterUsuarios"
          :search="search"
          :filteredUsuarios="filteredUsuarios"
        />
        <UsuariosComponent :usuarios="usuarios" />
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Usuario/FiltersComponent.vue";
import UsuariosComponent from "@/components/Usuario/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import { Usuario } from "@/interfaces/Usuario";
import { getUsuarios } from "@/services/cuetasporcobrarcj/UsuarioService";

export default {
  name: "App",

  components: {
    Filters,
    UsuariosComponent,
    Navbar,
  },

  data() {
    return {
      cargando: false,
      usuarios: [] as Usuario[],
      str: "",
      type: "",
    };
  },

  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },
    async filterUsuarios(catName: string) {
      try {
        const res = await getUsuarios();
        this.usuarios = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.usuarios = this.usuarios.filter((usuario: Usuario) => {
          return usuario.role === catName;
        });
      }
    },

    async search(term: string) {
      try {
        const res = await getUsuarios();
        this.usuarios = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.usuarios = this.usuarios.filter((usuario: Usuario) => {
        return usuario.nombre.toLowerCase().includes(term.toLowerCase());
      });
    },

    async loadUsuarios() {
      this.toggleLoading();
      try {
        const res = await getUsuarios();
        this.usuarios = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
  },

  mounted() {
    this.loadUsuarios();
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
    "usuarios usuarios usuarios usuarios usuarios usuarios usuarios";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
}

.grid .usuarios {
  grid-area: usuarios;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
  padding-top: 20px;
}

h4 {
  background-color: rgb(51, 163, 67);
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
