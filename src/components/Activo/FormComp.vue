<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <!-- {{ this.empleados }} -->
  <!-- {{ this.activo }} -->

  <div>
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>

    <div v-show="!cargando" class="general">
      <h6 :class="isError(error)">{{ error }}</h6>
      <form>
        <fieldset>
          <h6>{{ encabezado }}</h6>
          <label class="form-label"><b>Datos del Activo</b></label>
          <div class="form-group">
            <div class="grid">
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="ubicacion,"
                  >Ubicación:</label
                ><input
                  id="ubicacion"
                  type="ubicacion"
                  v-model="activo.ubicacion"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="departamentoArea,"
                  >Departamento / Área:</label
                ><input
                  id="departamentoArea"
                  type="departamentoArea"
                  v-model="activo.departamentoArea"
                  class="form-control"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="tipo,"
                  >Tipo:</label
                ><input
                  id="tipo"
                  type="tipo"
                  v-model="activo.tipo"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="descripcion,"
                  >Descripción:</label
                ><input
                  id="descripcion"
                  type="descripcion"
                  v-model="activo.descripcion"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="marca,"
                  >Marca:</label
                ><input
                  id="marca"
                  type="marca"
                  v-model="activo.marca"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="modelo,"
                  >Modelo:</label
                ><input
                  id="modelo"
                  type="modelo"
                  v-model="activo.modelo"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="serie,"
                  >Serie:</label
                ><input
                  id="serie"
                  type="serie"
                  v-model="activo.serie"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="color,"
                  >Color:</label
                ><input
                  id="color"
                  type="test"
                  v-model="activo.color"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="asignadoA,"
                  >Asignado A:</label
                ><input
                  id="asignadoA"
                  type="asignadoA"
                  v-model="activo.asignadoA"
                  class="form-control"
                />
              </div>

              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="costo,"
                  >Costo:</label
                ><input
                  id="costo"
                  type="Number"
                  v-model="activo.costo"
                  class="form-control"
                />
              </div>
            </div>
            <div>
              <label
                class="ta-l col-form-label col-form-label-sm"
                for="suplidores,"
                >Suplidor:</label
              ><input
                id="suplidores"
                type="suplidores"
                v-model="activo.suplidores"
                class="form-control"
              />
            </div>
            <div>
              <label class="ta-l col-form-label col-form-label-sm" for="notas,"
                >Notas:</label
              ><textarea
                rows="5"
                id="notas"
                type="notas"
                v-model="activo.notas"
                class="form-control"
              />
            </div>
          </div>

          <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="saveActivo()"
            :disabled="
              !activo.ubicacion ||
                !activo.departamentoArea ||
                !activo.tipo ||
                !activo.descripcion ||
                !activo.marca ||
                !activo.modelo ||
                !activo.serie ||
                !activo.color ||
                !activo.asignadoA ||
                !activo.suplidores ||
                !activo.costo
            "
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="
              !activo.ubicacion ||
                !activo.departamentoArea ||
                !activo.tipo ||
                !activo.descripcion ||
                !activo.marca ||
                !activo.modelo ||
                !activo.serie ||
                !activo.color ||
                !activo.asignadoA ||
                !activo.suplidores ||
                !activo.costo
            "
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <!-- <button
            v-if="this.modoForm == 'show'"
            class="btn btn-warning"
            @click="this.$router.push(`/activos2/${activo._id}`)"
          >
            <i class="fas fa-print"></i> Imprimir
          </button> -->

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
</template>

<script lang="ts">
// Components
import Navbar from "@/components/Navbar.vue";

// Vue
import { defineComponent } from "vue";

// Interfaces
import { Activo } from "@/interfaces/Activo";
import { Funcion } from "@/interfaces/Funcion";
import { Empleado } from "@/interfaces/Empleado";

//Services
import { createMensaje } from "@/services/almaycru/ChatService";
import { getEmpleados } from "@/services/almaycru/Empleado";
import {
  createActivo,
  eliminateActivos,
  createActivoa,
  getOneActivo,
  deleteActivo,
  getActivo,
  updateActivo,
} from "@/services/almaycru/Activo";
import { getFuncions } from "@/services/almaycru/Funcion";
import { getCxpByPag } from "@/services/almaycru/Cxp";

// Modules
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "activos-form",
  components: {
    Navbar,
  },
  data() {
    return {
      currentSuplidor: "",
      empleados: [] as Empleado[],
      campoFocus: "ubicacion",
      mensageError: "Error",
      mensageExito: "Activo Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Activo?",
      encabezado: "",
      modoForm: "",
      funciones: [] as Funcion[],
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
      activo: {} as Activo,
      oneActivo: {} as Activo,
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
    if (this.$route.fullPath == "/activos/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Activo";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Activo";
    }

    if (this.modoForm == "add") {
      this.activo.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadActivo(this.$route.params.id);
        this.documento.activo = this.activo.no;
        this.loadNomina2();
      }
      this.fixTime();
    }

    this.focus();
    this.loadEmpleados();
  },

  methods: {
    async loadNomina2() {
      this.toggleLoading();
      try {
        const res = await getCxpByPag(this.documento);
        this.activos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

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

    fixTime() {
      this.activo.fecha = this.formatDateToFix(this.activo.fecha, false);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-D");
      }
    },

    async loadActivo(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getActivo(id);
        this.activo = data;
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
          this.activo.userMod = this.$store.state.user.usuario;
          await updateActivo(this.$route.params.id, this.activo);
          // this.addMessage();
          this.$router.push("/activos");
        }
      } catch (error) {
        //console.error(error);
      }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteActivo(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/activos");
          }
        } catch (error) {
          //console.error(error);
        }
      }
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
    calcActivo() {
      (this.activo.retension = this.activo.bruto * 0.1),
        (this.activo.neto = this.activo.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },
    formatNumber2(value: number) {
      return numeral(value).format("0,0");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DD");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/yyyy");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      // this.activo.fecha = this.formatDate(new Date());
      // this.activo.nomina = 0;
    },

    async loadOneActivo() {
      try {
        const res = await getOneActivo();
        this.oneActivo = res.data;
        this.one = this.oneActivo[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.activo.no = this.nextNo;
        this.activo.principal = this.nextNo;
        this.activo.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveActivoa() {
      await this.loadOneActivo();
      try {
        const res = await createActivoa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveActivo() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneActivo();
          this.oneActivo = res.data;
          this.one = this.oneActivo[0];
          this.nextNo = this.one.no + 1;
          this.activo.no = this.nextNo;
          this.activo.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.activo.userReg = this.$store.state.user.usuario;
        const res = await createActivo(this.activo).then(
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
        // this.$router.push("/activos/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllActivos() {
      try {
        const res = await eliminateActivos(this.activo);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.activo.ubicacion = "";
      this.activo.departamentoArea = "";
      this.activo.tipo = "";
      this.activo.descripcion = "";
      this.activo.marca = "";
      this.activo.modelo = "";
      this.activo.serie = "";
      this.activo.color = "";
      this.activo.asignadoA = "";
      this.activo.suplidores = "";
      this.activo.notas = "";
      this.activo.costo = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById(this.campoFocus).focus();
    },
  },
});
</script>

<style lang="css" scoped>
/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 3px;
  /* cursor: pointer; */
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(147, 147, 147);
  color: white;
}

td,
th {
  font-size: 75%;
}

.ta-r {
  text-align: right;
}

/* End Table */

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
