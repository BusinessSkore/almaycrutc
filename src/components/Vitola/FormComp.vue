<template v-show="!cargando">
  <div>
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>
    <Transition>
      <div v-show="!cargando" class="general">
        <h6 :class="isError(error)">{{ error }}</h6>
        <form>
          <fieldset>
            <h6>Nueva Vitola</h6>
            <label class="form-label"><b>Datos de la Vitola</b></label>
            <div class="form-group">
              <!-- <label class="form-label"><b>Datos Generales</b></label> -->
              <!-- Start Fields -->
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="tamano"
                    >Tamaño:</label
                  ><input
                    id="tamano"
                    type="tamano"
                    v-model="vitola.tamano"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="tipo"
                    >Tipo:</label
                  ><input
                    id="tipo"
                    type="tipo"
                    v-model="vitola.tipo"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="pago"
                    >Pago:</label
                  ><input
                    id="pago"
                    type="number"
                    v-model="vitola.pago"
                    class="form-control"
                  />
                </div>
                <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="descripcion"
                  >Descripción:</label
                ><input
                  id="descripcion"
                  type="descripcion"
                  v-model="vitola.descripcion"
                  class="form-control"
                />
              </div> -->
              </div>
              <!-- End Fields -->
            </div>
            <button
              class="btn btn-success"
              @click.prevent="saveVitola()"
              :disabled="!vitola.tamano || !vitola.tipo || !vitola.pago"
            >
              <i class="fas fa-save"></i> Guardar
            </button>
            <!-- <button class="btn btn-success" @click.prevent="handleUpdate()">
            <i class="fas fa-edit"></i> Actualizar
          </button> -->

            <!-- <button
            v-if="showDelete"
            class="btn btn-danger"
            @click.prevent="handleDelete()"
          >
            <i class="fas fa-trash-alt"></i> Eliminar
          </button> -->
          </fieldset>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Vitola } from "@/interfaces/Vitola";
import {
  createVitola,
  eliminateVitolas,
  createVitolaa,
  getOneVitola,
  deleteVitola,
  getVitola,
  updateVitola,
} from "@/services/almaycru/Vitola";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
import Pusher from "pusher-js";

export default defineComponent({
  name: "vitolas-form",
  components: {
    Navbar,
  },
  data() {
    return {
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
      vitola: {} as Vitola,
      oneVitola: {} as Vitola,
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

  mounted() {
    this.vitola.no = 1;
    // this.defFields();

    this.showDeleteMethod();
    if (typeof this.$route.params.id === "string") {
      this.loadVitola(this.$route.params.id);
    }
    this.pusherSubscribe();

    this.focus();
  },

  methods: {
    async handleUpdate() {
      // this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.vitola.userMod = this.$store.state.user.usuario;
          await updateVitola(this.$route.params.id, this.vitola);
          this.addMessage();
          this.$router.push("/vitolas");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          await deleteVitola(this.$route.params.id);
          this.addMessage();
          this.$router.push("/vitolas");
        }
      } catch (error) {
        //console.error(error);
      }
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        if (typeof this.$route.params.id === "string") {
          this.loadVitola2(this.$route.params.id);
        }
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

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
      this.vitola.edaddelvitola = years;
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
      this.vitola.fecha_ingreso = this.formatDateToFix(
        this.vitola.fecha_ingreso,
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

    // async getVitola() {
    //   this.toggleLoading();
    //   this.documento.idfact = this.vitola.idfact;
    //   if (this.documento) {
    //     try {
    //       const res = await getVitola(this.documento);
    //       // const res = await getVitolas();
    //       // this.vitola = res.data;
    //       // Asignar Campos Seleccionandolos
    //       this.vitola.idfact = res.data.idfact;
    //       this.vitola.id_ars = res.data.id_ars;
    //       this.vitola.nom = res.data.nom;
    //       this.vitola.nro_autorizacion_salida =
    //         res.data.nro_autorizacion_salida;
    //       this.vitola.fecha_ingreso = res.data.fecha_ingreso;
    //       this.vitola.numero_afiliado = res.data.numero_afiliado;
    //       this.vitola.rnc = res.data.rnc;
    //       this.vitola.tipo_vitola = res.data.tipo_vitola;
    //       this.vitola.cobertura = res.data.cobertura;
    //       this.vitola.total_servicio = res.data.total_servicio;

    //       this.vitola.status = this.$store.state.user.defaultStatus;
    //       this.vitola.actividad = [];
    //       this.vitola.actividad.push({
    //         description: this.$store.state.user.defaultStatus,
    //         date: new Date(),
    //         user: this.$store.state.user.usuario,
    //         detalles: "",
    //       });
    //       this.fixTime();
    //     } catch (error) {
    //       // console.error(error);
    //     }
    //   }
    //   await this.toggleLoading();
    //   if (this.vitola.cobertura == 0) {
    //     // this.saveVitola();
    //     // alert("Vitola Encontrada");
    //     alert("Vitola no Encontrada");
    //     this.focus();
    //   }
    // },

    isError(message: string) {
      if (message == "Vitola Registrada Exitosamente") {
        return "success";
      } else if (message == "Ya Existe una Vitola Registrada con esta Descripción") {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcVitola() {
      (this.vitola.retension = this.vitola.bruto * 0.1),
        (this.vitola.neto = this.vitola.bruto * 0.9);
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

    // defFields() {
    // this.vitola.status = this.$store.state.user.defaultStatus;
    // this.actividad = "4 - Recibido por Reclamaciones Médicas";
    // this.vitola.actividad.push(this.actividad);
    // },

    async loadOneVitola() {
      try {
        const res = await getOneVitola();
        this.oneVitola = res.data;
        this.one = this.oneVitola[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.vitola.no = this.nextNo;
        this.vitola.principal = this.nextNo;
        this.vitola.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveVitolaa() {
      await this.loadOneVitola();
      try {
        const res = await createVitolaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveVitola() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneVitola();
          this.oneVitola = res.data;
          this.one = this.oneVitola[0];
          this.nextNo = this.one.no + 1;
          this.vitola.no = this.nextNo;
          this.vitola.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.vitola.status = this.$store.state.user.defaultStatus;
        this.vitola.userReg = this.$store.state.user.usuario;
        this.vitola.descripcion = this.vitola.tipo + " " + this.vitola.tamano;
        const res = await createVitola(this.vitola).then(
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
        // this.$router.push("/vitolas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      await this.definingFields();
      // await this.defFields();
      document.getElementById("tamano").focus();
      this.toggleAlert();
    },

    async deleteAllVitolas() {
      try {
        const res = await eliminateVitolas(this.vitola);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      this.vitola.tamano = "";
      this.vitola.tipo = "";
      this.vitola.pago = "";
      this.vitola.descripcion = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("tamano").focus();
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
