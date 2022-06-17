<template v-show="!cargando">
  <Navbar />
  <!-- {{ this.usuarios }} -->
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <div v-show="!cargando" class="general">
    <form>
      <fieldset>
        <legend><b>Detalles de Usuario</b></legend>
        <div class="form-group">
          <label class="form-label"><b>Datos Generales</b></label>
          <div class="grid">
            <!------------------------------------------ Campo ------------------------------------------>
            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="no"
                >No.</label
              ><input
                disabled
                id="no"
                type="no"
                v-model="currentUsuario.no"
                class="form-control"
              />
            </div> -->
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="email"
                >Email:</label
              ><input
                id="email"
                type="email"
                v-model="currentUsuario.email"
                class="form-control"
              />
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <!-- <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="password"
                >Contraseña:</label
              ><input
                id="password"
                type="password"
                v-model="currentUsuario.password"
                class="form-control"
              />
            </div> -->
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="role"
                >Rol:</label
              ><select
                id="role"
                type="role"
                v-model="currentUsuario.role"
                class="form-select"
              >
                <option>Administrador</option>
                <option>Soporte Técnico</option>
                <option>Usuario Final</option>
              </select>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="role"
                >Estatus por Defecto:</label
              ><select
                id="role"
                type="role"
                v-model="currentUsuario.defaultStatus"
                class="form-select"
              >
                <option>1 - Recibido por Auditoría Interna</option>
                <option>4 - Recibido por Reclamaciones Médicas</option>
              </select>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="grupo"
                >Grupo:</label
              ><select
                id="grupo"
                type="grupo"
                v-model="currentUsuario.grupo"
                class="form-select"
              >
                <option v-for="(usuario, index) in usuarios" :key="index">{{
                  usuario.nombre
                }}</option>
              </select>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="nombre"
                >Nombre:</label
              ><input
                id="nombre"
                type="nombre"
                v-model="currentUsuario.nombre"
                class="form-control"
              />
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="puedeVer"
                >Puede Ver:</label
              ><select
                id="puedeVer"
                multiple
                type="puedeVer"
                v-model="currentUsuario.puedeVer"
                class="form-select"
              >
                <option v-for="(usuario, index) in usuarios" :key="index">{{
                  usuario.nombre
                }}</option>
              </select>
            </div>
            <!------------------------------------------ ***** ------------------------------------------>
            <!------------------------------------------ Campo ------------------------------------------>
            <!-- <div>
              <label class="ta-l col-form-label col-form-label-sm" for="estatus"
                >Estatus:</label
              ><select
                id="estatus"
                multiple
                type="estatus"
                v-model="currentUsuario.estatus"
                class="form-select"
              >
                <option selected>Activo</option>
                <option>Inactivo</option>
              </select>
            </div> -->
            <!------------------------------------------ ***** ------------------------------------------>
          </div>
        </div>
        <button
          class="btn btn-primary"
          @click.prevent="handleUpdate()"
          :disabled="
            !currentUsuario.email ||
              !currentUsuario.password ||
              !currentUsuario.role ||
              !currentUsuario.nombre ||
              !currentUsuario.estatus
          "
        >
          Actualizar
        </button>
        <button class="btn btn-danger" @click.prevent="handleDelete()">
          Eliminar
        </button>
        <!-- <button class="btn btn-danger my-4" @click.prevent="deleteAllUsuarios()">Eliminar Todo</button>-->
      </fieldset>
    </form>
  </div>
  <!-- <button
        class="btn btn-secondary my-4"
        @click.prevent="saveUsuarioa()"
      >
        Cargar
      </button>    -->
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Usuario } from "@/interfaces/Usuario";
import { getUsuarios } from "@/services/cuetasporcobrarcj/UsuarioService";
import {
  deleteUsuario,
  getUsuario,
  updateUsuario,
} from "@/services/cuetasporcobrarcj/UsuarioService";
import numeral from "numeral";

export default defineComponent({
  name: "usuario-list",
  components: {
    Navbar,
  },
  data() {
    return {
      usuarios: [] as Usuario[],
      currentUsuario: {} as Usuario,
      estado: {} as object,
      cargando: false,
    };
  },
  methods: {
    toggleLoading() {
      this.cargando = !this.cargando;
    },

    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    async loadUsuario(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getUsuario(id);
        this.currentUsuario = data;
        this.estado = this.currentUsuario.estado;
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },
    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          await updateUsuario(this.$route.params.id, this.currentUsuario);
          this.$router.push("/usuarios");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },
    async handleDelete() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          await deleteUsuario(this.$route.params.id);
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      this.$router.push("/usuarios");
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
    if (typeof this.$route.params.id === "string") {
      this.loadUsuario(this.$route.params.id);
    }
    this.loadUsuarios();
  },
});
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
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}

h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
}

form {
  /* text-align:center;   */
  background-color: white;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 4px;
  padding: 2%;
}

legend {
  color: rgb(5, 24, 250);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
}

legend {
  margin: 0;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  color: black;
  border-radius: 7px;
}

.ta-l {
  text-align: left;
}

label {
  text-align: center;
}

.col-form-label {
  font-weight: bold;
  line-height: 0;
}

button {
  background-color: rgb(51, 163, 67);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
}
</style>
