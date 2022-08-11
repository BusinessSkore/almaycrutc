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
            <label class="form-label"><b>Datos del Empleado</b></label>
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
                <!-- <div>
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
                </div> -->
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="funcion"
                    >Función:</label
                  ><select
                    id="funcion"
                    v-model="empleado.funcion"
                    class="form-select"
                  >
                    <option
                      v-for="(funcion, index) in funciones"
                      :key="index"
                      :value="funcion.descripcion"
                      >{{ funcion.descripcion }}</option
                    >
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="codigoPonchador"
                    >Código Ponchador:</label
                  ><input
                    id="codigoPonchador"
                    type="codigoPonchador"
                    v-model="empleado.codigoPonchador"
                    class="form-control"
                  />
                </div>
              </div>
              <label class="form-label"><b>Datos Financieros</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="modalidad"
                    >Modalidad:</label
                  ><select
                    id="modalidad"
                    v-model="empleado.modalidad"
                    class="form-select"
                  >
                    <option selected>Jornalero</option>
                    <option>Asalariado</option>
                  </select>
                </div>

                <div v-if="empleado.modalidad == 'Asalariado'">
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

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="metodoPago"
                    >Método de Pago:</label
                  ><select
                    id="metodoPago"
                    v-model="empleado.metodoPago"
                    class="form-select"
                  >
                    <option selected>Efectivo</option>
                    <option>Transferencia</option>
                  </select>
                </div>

                <div v-if="empleado.metodoPago == 'Transferencia'">
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cuenta"
                    >Cuenta:</label
                  ><input
                    id="cuenta"
                    type="number"
                    v-model="empleado.cuenta"
                    class="form-control"
                  />
                </div>
              </div>
              <label class="form-label"><b>Datos Personales</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="primerNombre"
                    >Primer Nombre:</label
                  ><input
                    id="primerNombre"
                    type="String"
                    v-model="empleado.primerNombre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="segundoNombre"
                    >Segundo Nombre:</label
                  ><input
                    id="segundoNombre"
                    type="String"
                    v-model="empleado.segundoNombre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="primerApellido"
                    >Primer Apellido:</label
                  ><input
                    id="primerApellido"
                    type="String"
                    v-model="empleado.primerApellido"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="segundoApellido"
                    >Segundo Apellido:</label
                  ><input
                    id="segundoApellido"
                    type="String"
                    v-model="empleado.segundoApellido"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="sexo"
                    >Sexo:</label
                  ><select
                    id="sexo"
                    type="String"
                    v-model="empleado.sexo"
                    class="form-select"
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fechaNacimiento"
                    >Fecha de Nacimiento:</label
                  ><input
                    id="fechaNacimiento"
                    @change="calcularEdad(empleado.fechaNacimiento)"
                    type="Date"
                    v-model="empleado.fechaNacimiento"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="edad"
                    >Edad:</label
                  ><input
                    disabled
                    id="edad"
                    type="Number"
                    v-model="empleado.edad"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="direccion"
                    >Dirección:</label
                  ><input
                    id="direccion"
                    type="String"
                    v-model="empleado.direccion"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="telResidencial"
                    >Teléfono Residencial:</label
                  ><input
                    id="telResidencial"
                    type="String"
                    v-model="empleado.telResidencial"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="telCelular"
                    >Teléfono Celular:</label
                  ><input
                    id="telCelular"
                    type="String"
                    v-model="empleado.telCelular"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="estudiosRealizados"
                    >Estudios Realizados:</label
                  ><input
                    id="estudiosRealizados"
                    type="String"
                    v-model="empleado.estudiosRealizados"
                    class="form-control"
                  />
                </div>

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="seguroSocial"
                    >Seguro Social:</label
                  ><input
                    id="seguroSocial"
                    type="String"
                    v-model="empleado.seguroSocial"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="estadoCivil"
                    >Estado Civil:</label
                  ><select
                    id="estadoCivil"
                    type="String"
                    v-model="empleado.estadoCivil"
                    class="form-select"
                  >
                    <option>Unido</option>
                    <option>Soltero</option>
                    <option>Casado</option>
                  </select>
                </div>
              </div>
              <label class="form-label"><b>Datos Laborales</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="noColaborador"
                    >Colaborador No.: :</label
                  ><input
                    id="noColaborador"
                    type="String"
                    v-model="empleado.noColaborador"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="departamento"
                    >Departamento:</label
                  ><input
                    id="departamento"
                    type="String"
                    v-model="empleado.departamento"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fechaContratacion"
                    >Fecha de Contratación:</label
                  ><input
                    id="fechaContratacion"
                    type="Date"
                    v-model="empleado.fechaContratacion"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cargo"
                    >Cargo:</label
                  ><input
                    id="cargo"
                    type="String"
                    v-model="empleado.cargo"
                    class="form-control"
                  />
                </div>
              </div>
              <label class="form-label"><b>Datos Médicos</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="tipoSangre"
                    >Tipo de Sangre:</label
                  ><select
                    id="tipoSangre"
                    type="String"
                    v-model="empleado.tipoSangre"
                    class="form-select"
                  >
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                    <option>O+</option>
                    <option>A-</option>
                    <option>B-</option>
                    <option>AB-</option>
                    <option></option>

                    O-
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="alergias"
                    >Alergias:</label
                  ><input
                    id="alergias"
                    type="String"
                    v-model="empleado.alergias"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="enEmergenciasLlamar"
                    >En Caso de Emergencias Llamar A:</label
                  ><input
                    id="enEmergenciasLlamar"
                    type="String"
                    v-model="empleado.enEmergenciasLlamar"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="parentezcoLlamar"
                    >Parentezco:</label
                  ><input
                    id="parentezcoLlamar"
                    type="String"
                    v-model="empleado.parentezcoLlamar"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="telefonoLlamar"
                    >Teléfono:</label
                  ><input
                    id="telefonoLlamar"
                    type="String"
                    v-model="empleado.telefonoLlamar"
                    class="form-control"
                  />
                </div>
              </div>
              <label class="form-label"><b>Otros Datos</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombreConyuge"
                    >Nombre del Cónyuge:</label
                  ><input
                    id="nombreConyuge"
                    type="String"
                    v-model="empleado.nombreConyuge"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cedulaConyuge"
                    >Cédula del Cónyuge:</label
                  ><input
                    id="cedulaConyuge"
                    type="String"
                    v-model="empleado.cedulaConyuge"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="hijos"
                    >Hijos:</label
                  ><textarea
                    id="hijos"
                    type="Object"
                    v-model="empleado.hijos"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="recursosHumanos"
                    >Recursos Humanos:</label
                  ><textarea
                    id="recursosHumanos"
                    type="Object"
                    v-model="empleado.recursosHumanos"
                    class="form-control"
                  />
                </div>

                <!-- End Fields -->
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-success"
              @click.prevent="saveEmpleado()"
              :disabled="
                !empleado.primerNombre ||
                  !empleado.primerApellido ||
                  !empleado.segundoApellido ||
                  !empleado.sexo ||
                  !empleado.fechaNacimiento ||
                  !empleado.edad ||
                  !empleado.direccion ||
                  !empleado.telResidencial ||
                  !empleado.telCelular ||
                  !empleado.noColaborador ||
                  !empleado.departamento ||
                  !empleado.fechaContratacion ||
                  !empleado.cargo ||
                  !empleado.estudiosRealizados ||
                  !empleado.nombreConyuge ||
                  !empleado.cedulaConyuge ||
                  !empleado.seguroSocial ||
                  !empleado.estadoCivil ||
                  !empleado.tipoSangre ||
                  !empleado.alergias ||
                  !empleado.enEmergenciasLlamar ||
                  !empleado.parentezcoLlamar ||
                  !empleado.telefonoLlamar ||
                  !empleado.hijos ||
                  !empleado.recursosHumanos
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !empleado.primerNombre ||
                  !empleado.primerApellido ||
                  !empleado.segundoApellido ||
                  !empleado.sexo ||
                  !empleado.fechaNacimiento ||
                  !empleado.edad ||
                  !empleado.direccion ||
                  !empleado.telResidencial ||
                  !empleado.telCelular ||
                  !empleado.noColaborador ||
                  !empleado.departamento ||
                  !empleado.fechaContratacion ||
                  !empleado.cargo ||
                  !empleado.estudiosRealizados ||
                  !empleado.nombreConyuge ||
                  !empleado.cedulaConyuge ||
                  !empleado.seguroSocial ||
                  !empleado.estadoCivil ||
                  !empleado.tipoSangre ||
                  !empleado.alergias ||
                  !empleado.enEmergenciasLlamar ||
                  !empleado.parentezcoLlamar ||
                  !empleado.telefonoLlamar ||
                  !empleado.hijos ||
                  !empleado.recursosHumanos
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
    </div>
  </Transition>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Empleado } from "@/interfaces/Empleado";
import { Funcion } from "@/interfaces/Funcion";
import {
  createEmpleado,
  eliminateEmpleados,
  createEmpleadoa,
  getOneEmpleado,
  deleteEmpleado,
  getEmpleado,
  updateEmpleado,
} from "@/services/almaycru/Empleado";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "empleados-form",
  components: {
    Navbar,
  },
  data() {
    return {
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

  async mounted() {
    if (this.$route.fullPath == "/empleados/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Empleado";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Empleado";
    }

    if (this.modoForm == "add") {
      this.empleado.no = 1;
      this.fillFields();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadEmpleado(this.$route.params.id);
      }
    }

    // // this.pusherSubscribe();

    this.focus();
    this.loadFunciones();
  },

  methods: {
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

    async loadEmpleado(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getEmpleado(id);
        this.empleado = data;
        this.fixTime();
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
          this.empleado.nombre =
            this.empleado.primerNombre +
            " " +
            this.empleado.segundoNombre +
            " " +
            this.empleado.primerApellido +
            " " +
            this.empleado.segundoApellido;
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

    // pusherSubscribe() {
    //   // Start pusher subscribe
    //   var pusher = new Pusher("d7b50b87118775ed0b11", {
    //     cluster: "us2",
    //   });

    //   var channel = pusher.subscribe("my-channel");
    //   channel.bind("my-event", (data: any) => {
    //     if (typeof this.$route.params.id === "string") {
    //       this.loadEmpleado2(this.$route.params.id);
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
      this.empleado.edad = years;
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
      this.empleado.fechaNacimiento = this.formatDateToFix(
        this.empleado.fechaNacimiento,
        false
      );
      this.empleado.fechaContratacion = this.formatDateToFix(
        this.empleado.fechaContratacion,
        false
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

    fillFields() {
      this.empleado.modalidad = "Jornalero";
      this.empleado.metodoPago = "Efectivo";
    },

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
        this.empleado.nombre =
          this.empleado.primerNombre +
          " " +
          this.empleado.segundoNombre +
          " " +
          this.empleado.primerApellido +
          " " +
          this.empleado.segundoApellido;
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
      if (
        this.error !==
        "Ya Existe un Empleado Registrado con esta Cédula o con Este Número de Ponchador"
      ) {
        await this.cleanFields();
      }
      await this.fillFields();
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

    cleanFields() {
      this.empleado.cedula = "";
      this.empleado.nombre = "";
      this.empleado.funcion = "";
      this.empleado.modalidad = "";
      this.empleado.sueldo = "";
      this.empleado.metodoPago = "";
      this.empleado.cuenta = "";
      this.empleado.codigoPonchador = "";
      this.empleado.primerNombre = "";
      this.empleado.segundoNombre = "";
      this.empleado.primerApellido = "";
      this.empleado.segundoApellido = "";
      this.empleado.sexo = "";
      this.empleado.fechaNacimiento = "";
      this.empleado.edad = "";
      this.empleado.direccion = "";
      this.empleado.telResidencial = "";
      this.empleado.telCelular = "";
      this.empleado.noColaborador = "";
      this.empleado.departamento = "";
      this.empleado.fechaContratacion = "";
      this.empleado.cargo = "";
      this.empleado.estudiosRealizados = "";
      this.empleado.nombreConyuge = "";
      this.empleado.cedulaConyuge = "";
      this.empleado.seguroSocial = "";
      this.empleado.estadoCivil = "";
      this.empleado.tipoSangre = "";
      this.empleado.alergias = "";
      this.empleado.enEmergenciasLlamar = "";
      this.empleado.parentezcoLlamar = "";
      this.empleado.telefonoLlamar = "";
      this.empleado.hijos = "";
      this.empleado.recursosHumanos = "";
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
