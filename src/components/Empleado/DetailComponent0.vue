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
            <h6>Nuevo Empleado</h6>
            <label class="form-label"><b>Datos de la Empleado</b></label>
            <div class="form-group">
              <div class="grid">
                <!-- Start Fields -->
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cedula"
                    >Cédula:</label
                  ><input
                    id="cedula"
                    type="cedula"
                    v-model="empleado.cedula"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombre"
                    >Nombre:</label
                  ><input
                    id="nombre"
                    type="nombre"
                    v-model="empleado.nombre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="funcion"
                    >Función:</label
                  ><input
                    id="funcion"
                    type="funcion"
                    v-model="empleado.funcion"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="modalidad"
                    >Modalidad:</label
                  ><input
                    id="modalidad"
                    type="modalidad"
                    v-model="empleado.modalidad"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="sueldo"
                    >Sueldo:</label
                  ><input
                    id="sueldo"
                    type="number"
                    v-model="empleado.sueldo"
                    class="form-control"
                  />
                </div>

                <!-- End Fields -->
              </div>
            </div>

            <!-- <button
              class="btn btn-success"
              @click.prevent="saveEmpleado()"
              :disabled="!empleado.descripcion"
            >
              <i class="fas fa-save"></i> Guardar
            </button> -->

            <button
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !empleado.cedula ||
                  !empleado.nombre ||
                  !empleado.funcion ||
                  !empleado.modalidad
              "
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
    </Transition>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Empleado } from "@/interfaces/Empleado";
import {
  createEmpleado,
  eliminateEmpleados,
  createEmpleadoa,
  getOneEmpleado,
  deleteEmpleado,
  getEmpleado,
  updateEmpleado,
} from "@/services/almaycru/Empleado";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
import Pusher from "pusher-js";

export default defineComponent({
  name: "empleados-form",
  components: {
    Navbar,
  },
  data() {
    return {
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "R",
        message: "H",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      empleado: {} as Empleado,
      oneEmpleado: {} as Empleado,
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
    // this.empleado.no = 1;
    // this.defFields();

    this.showDeleteMethod();

    if (typeof this.$route.params.id === "string") {
      this.loadEmpleado(this.$route.params.id);
    }

    // // this.pusherSubscribe();

    this.focus();
  },

  methods: {
    async loadEmpleado(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getEmpleado(id);
        this.empleado = data;
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
          this.empleado.userMod = this.$store.state.user.usuario;
          await updateEmpleado(this.$route.params.id, this.empleado);
          // this.addMessage();
          this.$router.push("/empleados");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm("¿Está Seguro que desea Eliminar Este Empleado?")) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteEmpleado(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/empleados");
          }
        } catch (error) {
          //console.error(error);
        }
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
          this.loadEmpleado2(this.$route.params.id);
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
      this.empleado.edaddelempleado = years;
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
      this.empleado.fecha_ingreso = this.formatDateToFix(
        this.empleado.fecha_ingreso,
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

    // async getEmpleado() {
    //   this.toggleLoading();
    //   this.documento.idfact = this.empleado.idfact;
    //   if (this.documento) {
    //     try {
    //       const res = await getEmpleado(this.documento);
    //       // const res = await getEmpleados();
    //       // this.empleado = res.data;
    //       // Asignar Campos Seleccionandolos
    //       this.empleado.idfact = res.data.idfact;
    //       this.empleado.id_ars = res.data.id_ars;
    //       this.empleado.nom = res.data.nom;
    //       this.empleado.nro_autorizacion_salida =
    //         res.data.nro_autorizacion_salida;
    //       this.empleado.fecha_ingreso = res.data.fecha_ingreso;
    //       this.empleado.numero_afiliado = res.data.numero_afiliado;
    //       this.empleado.rnc = res.data.rnc;
    //       this.empleado.tipo_empleado = res.data.tipo_empleado;
    //       this.empleado.cobertura = res.data.cobertura;
    //       this.empleado.total_servicio = res.data.total_servicio;

    //       this.empleado.status = this.$store.state.user.defaultStatus;
    //       this.empleado.actividad = [];
    //       this.empleado.actividad.push({
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
    //   if (this.empleado.cobertura == 0) {
    //     // this.saveEmpleado();
    //     // alert("Empleado Encontrada");
    //     alert("Empleado no Encontrada");
    //     this.focus();
    //   }
    // },

    isError(message: string) {
      if (message == "Empleado Registrado Exitosamente") {
        return "success";
      } else {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcEmpleado() {
      (this.empleado.retension = this.empleado.bruto * 0.1),
        (this.empleado.neto = this.empleado.bruto * 0.9);
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
    // this.empleado.status = this.$store.state.user.defaultStatus;
    // this.actividad = "4 - Recibido por Reclamaciones Médicas";
    // this.empleado.actividad.push(this.actividad);
    // },

    async loadOneEmpleado() {
      try {
        const res = await getOneEmpleado();
        this.oneEmpleado = res.data;
        this.one = this.oneEmpleado[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.empleado.no = this.nextNo;
        this.empleado.principal = this.nextNo;
        this.empleado.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveEmpleadoa() {
      await this.loadOneEmpleado();
      try {
        const res = await createEmpleadoa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveEmpleado() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneEmpleado();
          this.oneEmpleado = res.data;
          this.one = this.oneEmpleado[0];
          this.nextNo = this.one.no + 1;
          this.empleado.no = this.nextNo;
          this.empleado.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.empleado.status = this.$store.state.user.defaultStatus;
        this.empleado.userReg = this.$store.state.user.usuario;
        const res = await createEmpleado(this.empleado).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            // this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
          }
        );
        // this.$router.push("/empleados/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      await this.definingFields();
      // await this.defFields();
      document.getElementById("cedula").focus();
      this.toggleAlert();
    },

    async deleteAllEmpleados() {
      try {
        const res = await eliminateEmpleados(this.empleado);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    definingFields() {
      this.empleado.descripcion = "";
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
