<template>
  <nav>
    <div class="content">
      <nav :class="navMenuClas">
        <label class="equis" @click="this.hamburger()" for="btn-modal">X</label>

        <label
          class="closeSesion"
          @click="this.hamburger('Cerrar Sesión')"
          for="btn-modal"
          ><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</label
        >

        <label class="versionNumber"><span class="version">V 1.1.2</span></label>

        <label class="name" @click="this.hamburger()" for="btn-modal"
          ><i class="fas fa-user"></i>
          {{ this.$store.state.user.usuario }}</label
        >
        <div class="line"></div>
        <!-- Start Option -->
        <a
          v-if="this.$store.state.user.type == 'Power User'"
          class="navbar-option"
          @click="this.hamburger('Mejoras')"
          href="#"
          ><i class="fas fa-check"></i> Mejoras</a
        >
        <!-- End Option -->
        <!-- Start Option -->
        <a
          v-if="this.$store.state.user.type == 'Power User'"
          class="navbar-option"
          @click="this.hamburger('Usuarios')"
          href="#"
          ><i class="fas fa-users"></i> Usuarios</a
        >
        <!-- End Option -->
        <!-- Start Option -->
        <a
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="navbar-option"
          @click="this.hamburger('Dashboard')"
          href="#"
          ><i class="fas fa-columns"></i> Dashboard</a
        >
        <!-- End Option -->
        <!-- Start Option -->
        <a
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="navbar-option"
          @click="this.hamburger('Vitolas')"
          href="#"
          ><i class="fas fa-ruler"></i> Vitolas</a
        >
        <!-- End Option -->
        <!-- Start Option -->
        <a
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="navbar-option"
          @click="this.hamburger('Funciones')"
          href="#"
          ><i class="fas fa-cog"></i> Funciones</a
        >
        <!-- End Option -->
        <!-- Start Option -->
        <a
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="navbar-option"
          @click="this.hamburger('Empleados')"
          href="#"
          ><i class="fas fa-user-circle"></i> Empleados</a
        >
        <!-- End Option -->

        <!-- Start Option -->
        <!-- <a
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="navbar-option"
          @click="this.hamburger('Cerrar Sesión')"
          href="#"
          ><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a
        > -->
        <!-- End Option -->
      </nav>

      <nav>
        <div class="mycontainer">
          <a
            class="item navbar-brand"
            @click="this.$router.push(`/dashboard`)"
            href="#"
          >
            <img class="localIMG" src="@/assets/images/logoN.png" /> Alma & Cru
          </a>
          <a class="item navbar-brand2" @click="hamburger()" href="#"
            ><i class="item fas fa-ellipsis-v"></i
          ></a>
        </div>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav-bar",

  data() {
    return {
      showMenu: false,
      showName: false,
      showFactura: false,
      navMenuClas: ["menu-navegacion"],
    };
  },

  methods: {
    hamburger(texto: string) {
      switch (texto) {
        case "Empleados":
          this.$router.push("/empleados");
          break;
        case "Funciones":
          this.$router.push("/funcions");
          break;
        case "Mejoras":
          this.$router.push("/mejoras");
          break;
        case "Usuarios":
          this.$router.push("/usuarios");
          break;
        case "Dashboard":
          this.$router.push("/dashboard");
          break;
        case "Vitolas":
          this.$router.push("/vitolas");
          break;
        case "Cerrar Sesión":
          this.salir();
          break;
      }
      if (this.navMenuClas.length == 1) {
        this.navMenuClas.push("spread");
      } else {
        this.navMenuClas.pop();
      }
    },

    tglMenu() {
      this.showMenu = !this.showMenu;
    },

    tshowFactura() {
      (this.showName = false), (this.showFactura = !this.showFactura);
    },

    tglName() {
      this.showName = !this.showName;
      this.showFactura = false;
    },

    salir() {
      this.$router.push("/");
      this.$store.dispatch("logoutAction");
    },
  },
});
</script>

<style scoped>
img {
  /* display: block; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 25px;
  /* margin-bottom: 10px; */
}

.navbar-option {
  margin: 7px;
}

.line {
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  height: 2px;
  background: rgb(147, 147, 147);
  /* margin-bottom: 60px; */
}

.mycontainer {
  /* height: 40px; */
  background-color: black;
  /* padding: 5px; */

  display: flex;
  justify-content: space-between;
}

.navbar-brand {
  color: white;
  font-family: "Agency FB";
  margin-left: 5px;
}

.navbar-brand2 {
  color: white;
  margin-right: 28px;
  margin-top: 7px;
}

.navbar-option {
  color: white;
  /* font-family: "Agency FB Bold"; */
  text-decoration: none;
}

.version {
  font-size: 50%;
}

li {
  font-size: 75%;
}

/* Menú Lateral */

.menu-navegacion {
  position: fixed;
  top: 0;
  right: 0;
  width: 20vw;
  height: 100%;
  background-image: linear-gradient(180deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  transition: transform 0.3s ease-in-out;
  transform: translate(110%);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding-left: 10px;
  padding-top: 70px;
}

.spread {
  transform: translate(0);
}

.equis {
  position: absolute;
  top: 20px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.name {
  position: absolute;
  top: 40px;
  right: 10px;
  color: #fff;
  font-size: 15px;
}

.closeSesion {
  position: absolute;
  bottom: 0;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.versionNumber {
  position: absolute;
  bottom: 0;
  left: 10px;
  color: #fff;
  /* font-size: 15px; */
  /* cursor: pointer; */
}

/* Responsiveness */
@media screen and (max-width: 800px) {
  .menu-navegacion {
    width: 50vw;
  }
}

@media screen and (max-width: 500px) {
  .menu-navegacion {
    width: 65vw;
  }
}
</style>
