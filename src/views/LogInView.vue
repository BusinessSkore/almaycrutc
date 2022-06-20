<template>
  <!-- <button @click="arreglar()">Arreglar</button> -->
  <!-- {{ this.usuario.email }} -->
  <Transition>
    <div v-if="cargando" class="spin">
      <img class="img" src="@/assets/images/logo.png" />
    </div>
  </Transition>
  <Transition>
  <div v-show="!cargando" class="general">
    <form>
      <fieldset>
        <img class="localIMG" src="@/assets/images/logo.png" />
        <h5>
          <!-- <div v-if="cargando" class="spin">Iniciando Sesión, Por Favor Espere...</div> -->
        </h5>
        <div>
          <legend><b>Iniciar Sesión</b></legend>
          <h6>Por favor, ingrese sus credenciales.</h6>
          <h6 class="error">{{ error }}</h6>
          <div class="form-group">
            <div class="grid">
              <div>
                <label class="col-form-label col-form-label-sm mt-4" for="email"
                  >Email</label
                ><input
                  class="form-control"
                  type="text"
                  id="email"
                  v-model="usuario.email"
                />
              </div>
              <div>
                <label
                  class="col-form-label col-form-label-sm mt-4"
                  for="password"
                  >Contraseña</label
                ><input
                  class="form-control"
                  type="password"
                  id="password"
                  v-model="usuario.password"
                />
              </div>
            </div>
          </div>

          <button
            class="btn btn-primary"
            @click.prevent="login()"
            :disabled="!usuario.email || !usuario.password"
          >
            Iniciar Sesión
          </button>
          <h6>¿No tienes cuenta?</h6>
          <h6>
            <router-link class="nav-link" to="/signup">Regístrate</router-link>
          </h6>
        </div>
      </fieldset>
    </form>
  </div>
  </Transition>
</template>

<script lang="ts">
import { loginUsuario } from "@/services/cuetasporcobrarcj/UsuarioService";
import { Usuario } from "@/interfaces/Usuario";
export default {
  name: "LoginView",
  components: {},

  data() {
    return {
      cargando: false,
      error: "",
      usuario: {} as Usuario,
    };
  },

  methods: {
    arreglar() {
      this.usuario.email = this.usuario.email.toLowerCase().trim();
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    // login() {
    //   this.$store.dispatch("loginAction");
    //   this.$store.state.user.type = this.role;
    //   this.$store.state.user.usuario = this.usuario;
    //   this.$router.push("/dashboard");
    // },

    async login() {
      this.toggleLoading();
      // let user = {
      //   email: this.email,
      //   password: this.password,
      // };
      this.arreglar();
      await loginUsuario(this.usuario).then(
        // axios.post("http://localhost:5000/login", user).then(
        (res) => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            //Authenticated True
            this.$store.dispatch("loginAction");
            this.$store.state.user.type = res.data.usuario.role;
            // alert(res.data.usuario.role)
            this.$store.state.user.usuario = res.data.usuario.nombre;
            this.$store.state.user.defaultStatus =
              res.data.usuario.defaultStatus;
            this.$router.push("/dashboard");
          }
        },
        (err) => {
          // console.log(err.response);
          this.error = err.response.data.error;
        }
      );
      this.toggleLoading();
    },
  },
};
</script>

<style lang="css" scoped>
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

* {
  margin: 0;
}

.general {
  width: 100%;
  max-width: 25rem;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}

form {
  background-color: white;
  border-radius: 4px;
  padding: 10%;
}

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

legend,
.nav-link {
  color: rgb(5, 24, 250);
  text-align: center;
  line-height: 1;
  margin: 0;
}

input,
select,
textarea {
  border-radius: 4px;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  color: black;
  border-radius: 7px;
}

.texto_responsive:before {
  content: attr(data-desktoptext);
}

@media (max-width: 900px) {
  .texto_responsive:before {
    content: attr(data-tablettext);
  }
}

@media (max-width: 400px) {
  .texto_responsive:before {
    content: attr(data-phonetext);
  }
}

h2 {
  color: white;
  font-weight: bold;
  text-align: center;
}

h6 {
  color: rgb(70, 70, 70);
  font-weight: bold;
  text-align: center;
}

button {
  background-color: rgb(51, 163, 67);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
}

label {
  font-weight: bold;
  line-height: 0;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-r {
  text-align: right;
}

.img {
  pointer-events: none;
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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

h5 {
  color: rgb(51, 163, 67);
  font-weight: bold;
  text-align: center;
}
</style>
