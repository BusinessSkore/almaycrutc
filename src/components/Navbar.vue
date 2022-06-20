<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" @click="this.$router.push(`/dashboard`)" href="#"
        >CxC ARS <span class="version">V 1.0</span></a
      >
      <button
        @click="tglMenu()"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        :class="{ show: this.showMenu }"
        class="collapse navbar-collapse"
        id="navbarColor01"
      >
        <ul class="navbar-nav me-auto">
          <!-------------------------------------Start Option------------------------------------->
          <li
            v-if="this.$store.state.user.type == 'Power User'"
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/usuarios`)" href="#"
              >Usuarios
              <span class="visually-hidden">(current)</span>
            </a>
          </li>
          <!--------------------------------------End Option-------------------------------------->
          <!-------------------------------------Start Option------------------------------------->
          <li
            v-if="this.$store.state.user.type == 'Power User'"
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/mejoras`)" href="#"
              >Mejoras
            </a>
          </li>
          <!--------------------------------------End Option-------------------------------------->
          <!-------------------------------------Start Option------------------------------------->
          <!-- <li
            v-if="this.$store.state.user.type == 'Power User'"
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/areas`)" href="#"
              >Áreas
            </a>
          </li> -->
          <!--------------------------------------End Option-------------------------------------->
          <!-------------------------------------Start Option------------------------------------->
          <!-- <li
            v-if="
              this.$store.state.user.type == 'Power User' ||
                this.$store.state.user.type == 'Administrador' ||
                this.$store.state.user.type == 'Encargado' ||
                this.$store.state.user.type == 'Agente'
            "
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/reportes`)" href="#"
              >Reportes
            </a>
          </li> -->
          <!-- <li
            v-if="
              this.$store.state.user.type == 'Power User' ||
                this.$store.state.user.type == 'Administrador' ||
                this.$store.state.user.type == 'Encargado' ||
                this.$store.state.user.type == 'Agente'
            "
            class="nav-item"
          >
            <a
              class="nav-link"
              @click="this.$router.push(`/reporte2s`)"
              href="#"
              >Asignaciones
            </a>
          </li> -->
          <!-------------------------------------Start Option------------------------------------->
          <!-- <li
            v-if="
              this.$store.state.user.type == 'Power User' ||
                this.$store.state.user.type == 'Administrador' ||
                this.$store.state.user.type == 'Encargado'
            "
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/facturas`)" href="#"
              >Facturas
            </a>
          </li> -->

          <!-------------------------------------Menu Option------------------------------------->
          <li
            class="nav-item dropdown"
            v-if="
              this.$store.state.user.type == 'Power User' ||
                this.$store.state.user.type == 'Administrador' ||
                this.$store.state.user.type == 'Encargado' ||
                this.$store.state.user.type == 'Agente'
            "
          >
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              @click="tshowFactura()"
              >Facturas</a
            >
            <div :class="{ show: this.showFactura }" class="dropdown-menu">
              <a
                class="dropdown-item"
                @click="this.$router.push(`/facturas/new`)"
                href="#"
                ><i class="fas fa-plus"></i> Recibir Factura</a
              >
              <a
                @click="this.$router.push(`/facturas`)"
                class="dropdown-item"
                href="#"
                ><i class="fas fa-list"></i> Listado de Facturas</a
              >
            </div>
          </li>
          <!-------------------------------------***********------------------------------------->

          <!--------------------------------------End Option-------------------------------------->
          <!-- <li
            v-if="
              this.$store.state.user.type == 'Power User' ||
                this.$store.state.user.type == 'Administrador'
            "
            class="nav-item"
          >
            <a class="nav-link" @click="this.$router.push(`/chat`)" href="#"
              >Chat
            </a>
          </li> -->
          <!--------------------------------------End Option-------------------------------------->
        </ul>

        <!--------------------------------------User Name --------------------------------------->
        <div class="d-flex">
          <ul class="navbar-nav me-auto">
            <li
              class="nav-item dropdown"
              v-if="
                this.$store.state.user.type == 'Power User' ||
                  this.$store.state.user.type == 'Administrador' ||
                  this.$store.state.user.type == 'Agente' ||
                  this.$store.state.user.type == 'Encargado'
              "
            >
              <a
                class="nav-link dropdown-toggle blue"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @click="tglName()"
                >{{ this.$store.state.user.usuario }} ({{
                  this.$store.state.user.type
                }})</a
              >
              <div :class="{ show: this.showName }" class="dropdown-menu">
                <a class="dropdown-item" @click="salir()" href="#"
                  ><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
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
    };
  },

  methods: {
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
.version {
  font-size: 50%;
}

/* li{
  font-size: 75%;
} */

/* .container-fluid{
  height: 10px;
}*/
</style>
