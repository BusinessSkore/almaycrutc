<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <Transition>
    <div>
      <Navbar />

      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>

      <div v-show="!cargando" class="general">
        <h6 :class="isError(error)">{{ error }}</h6>
        <form>
          <fieldset>
            <h6>{{ encabezado }}</h6>
            <label class="form-label"><b>Datos de la Liga</b></label>
            <div class="form-group">
              <div class="grid">
                <!-- Start Fields -->
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="descripcion"
                    >Descripción:</label
                  ><input
                    id="descripcion"
                    type="descripcion"
                    v-model="liga.descripcion"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-success"
              @click.prevent="saveLiga()"
              :disabled="!liga.descripcion"
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="!liga.descripcion"
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="showDelete"
              class="btn btn-danger"
              @click.prevent="handleDelete()"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Liga } from "@/interfaces/Liga";
import { Funcion } from "@/interfaces/Funcion";
import {
  createLiga,
  eliminateLigas,
  createLigaa,
  getOneLiga,
  deleteLiga,
  getLiga,
  updateLiga,
} from "@/services/almaycru/Liga";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "ligas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      mensageError: "Ya Existe un Liga Registrada con esta Descripción",
      mensageExito: "Liga Registrada Exitosamente",
      encabezado: "",
      modoForm: "",
      funciones: [] as Funcion[],
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "Ronnald",
        message: "Hola",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      liga: {} as Liga,
      oneLiga: {} as Liga,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showDelete: false,
      currentActivity: "",
      estado: {} as object,
    };
  },

  async mounted() {
    if (this.$route.fullPath == "/ligas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Liga";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Liga";
    }

    if (this.modoForm == "add") {
      this.liga.no = 1;
      this.fillFields();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadLiga(this.$route.params.id);
      }
    }

    // this.pusherSubscribe();

    this.focus();
    this.loadFunciones();
  },

  methods: {
    arreglar() {
      this.liga.descripcion = this.liga.descripcion.trim();
    },
    async loadFunciones() {
      this.toggleLoading();
      try {
        const res = await getFuncions();
        this.funciones = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadLiga(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getLiga(id);
        this.liga = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async handleUpdate() {
      // this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.liga.userMod = this.$store.state.user.usuario;
          await updateLiga(this.$route.params.id, this.liga);
          this.addMessage();
          this.$router.push("/ligas");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm("Está Seguro que desea Eliminar Este Liga?")) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteLiga(this.$route.params.id);
            this.addMessage();
            this.$router.push("/ligas");
          }
        } catch (error) {
          //console.error(error);
        }
      }
    },

    // pusherSubscribe() {
    //   // Start pusher subscribe
    //   var pusher = new Pusher("d7b50b87118775ed0b11", {
    //     cluster: "us2",
    //   });

    //   var channel = pusher.subscribe("my-channel");
    //   channel.bind("my-event", (data: any) => {
    //     if (typeof this.$route.params.id === "string") {
    //       this.loadLiga2(this.$route.params.id);
    //     }
    //     // this.player.src = this.song.src;
    //     // this.player.play();
    //   });
    //   // End pusher subscribe
    // },

    showDeleteMethod() {
      if (this.$store.state.user.type == "Power User") {
        this.showDelete = true;
      }
    },

    toggleShowDatosPadre() {
      this.showDatosPadre = !this.showDatosPadre;
    },
    toggleShowDatosMadre() {
      this.showDatosMadre = !this.showDatosMadre;
    },
    toggleShowDatosTutor() {
      this.showDatosTutor = !this.showDatosTutor;
    },

    calcularEdad(date: any) {
      let years = 0;
      let edad = Math.floor(
        moment(new Date()).diff(moment(date, "YYYY-MM-DD"), "years", true)
      );
      if (edad > 120 || edad < 0) {
        years = 0;
      } else {
        years = edad;
      }
      this.liga.edaddelliga = years;
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-D");
      }
    },

    fixTime() {
      this.liga.fecha_ingreso = this.formatDateToFix(
        this.liga.fecha_ingreso,
        true
      );
    },

    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    isError(message: string) {
      if (message == this.mensageExito) {
        return "success";
      } else {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcLiga() {
      (this.liga.retension = this.liga.bruto * 0.1),
        (this.liga.neto = this.liga.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.liga.modalidad = "Jornalero";
      this.liga.metodoPago = "Efectivo";
    },

    async loadOneLiga() {
      try {
        const res = await getOneLiga();
        this.oneLiga = res.data;
        this.one = this.oneLiga[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.liga.no = this.nextNo;
        this.liga.principal = this.nextNo;
        this.liga.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveLigaa() {
      await this.loadOneLiga();
      try {
        const res = await createLigaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveLiga() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneLiga();
          this.oneLiga = res.data;
          this.one = this.oneLiga[0];
          this.nextNo = this.one.no + 1;
          this.liga.no = this.nextNo;
          this.liga.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.liga.userReg = this.$store.state.user.usuario;
        this.arreglar();
        const res = await createLiga(this.liga).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
          }
        );
        // this.$router.push("/ligas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      document.getElementById("cedula").focus();
      this.toggleAlert();
    },

    async deleteAllLigas() {
      try {
        const res = await eliminateLigas(this.liga);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.liga.descripcion = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("cedula").focus();
    },
  },
});
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

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

/* <!----------------------------------------------------------------------------------------------------------> */

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
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

h6 {
  color: white;
  /* font-weight: bold; */
  text-align: center;
  background-color: rgb(147, 147, 147);
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(0, 0, 0);
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

/* button {
  background-color: rgb(147, 147, 147);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
} */

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

.input-r {
  text-align: right;
}

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

.success {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 255, 0);
}
</style>
