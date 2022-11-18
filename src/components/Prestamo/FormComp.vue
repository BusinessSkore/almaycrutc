<template v-show="!cargando">
  <!-- {{ this.prestamo }} -->
  <div>
    <Navbar />
    <!-- {{ this.prestamo.empleados }} -->
    <div v-if="showModal7" class="modal7">
      <div class="contenedor7">
        <header>Empleados</header>
        <div class="contenido7">
          <label @click="this.showModalMethod7()" for="btn-modal">X</label>
          <div class="contenido7">
            <div>
              <input
                id="search"
                type="search"
                v-model="search"
                class="form-control"
                @keypress="buscar()"
              />
            </div>
            <div>
              <p
                style="cursor: pointer"
                v-for="(seguro, index) in seguros2"
                :key="index"
                @click="setSeguro(seguro, index)"
              >
                {{ seguro.nombre }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <label class="form-label"><b>Datos del Préstamo</b></label>
          <div class="form-group">
            <div class="grid">
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha:</label
                ><input
                  :disabled="this.modoForm == 'show'"
                  id="fecha"
                  type="datetime-local"
                  v-model="prestamo.fecha"
                  class="form-control"
                  @change="fechaCxp(prestamo.fecha)"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><input
                  id="empleado"
                  type="empleado"
                  v-model="prestamo.empleado"
                  class="form-control"
                  @focus="showModalMethod7()"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="monto"
                  >Monto:</label
                ><input
                  id="monto"
                  type="number"
                  v-model="prestamo.monto"
                  @change="clacPrestamo()"
                  step="500"
                  min="500"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="cuotas"
                  >Cuotas:</label
                ><input
                  id="cuotas"
                  type="number"
                  step="1"
                  min="1"
                  @change="clacPrestamo()"
                  v-model="prestamo.cuotas"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="montoCuotas"
                  >Monto de Cuotas:</label
                ><input
                  id="montoCuotas"
                  type="number"
                  step="100"
                  min="100"
                  @change="clacPrestamo()"
                  v-model="prestamo.montoCuotas"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <!-- <div>
            <h4>
              Empleados
              <i
                @click="this.showModalMethod7()"
                style="cursor:pointer"
                class="fas fa-plus"
                _mstvisible="2"
              ></i>
            </h4>
          </div> -->
          <div>
            <table v-if="this.prestamo.empleados" id="customers">
              <tr>
                <th>No.</th>
                <th>Acumulado</th>
                <th v-if="this.modoForm == 'show'">Cobrado</th>
              </tr>
              <tr v-for="(empleado, index) in prestamo.empleados" :key="index">
                <td>{{ formatNumber2(index + 1) }}</td>
                <td class="der">{{ formatNumber(empleado.nombre) }}</td>
                <td v-if="this.modoForm == 'show'">
                  <div class="form-check form-switch">
                    <input
                      disabled
                      style="cursor: pointer"
                      class="form-check-input"
                      type="checkbox"
                      v-model="empleado.cobrado"
                      id="cobrado"
                    />
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="savePrestamo()"
            :disabled="
              !prestamo.fecha ||
                !prestamo.empleados ||
                !prestamo.empleado ||
                !prestamo.monto ||
                !prestamo.cuotas ||
                !prestamo.montoCuotas
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
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Prestamo } from "@/interfaces/Prestamo";
import { Funcion } from "@/interfaces/Funcion";
import { Vitola } from "@/interfaces/Vitola";
import { Empleado } from "@/interfaces/Empleado";
import { getPeg, getMez, getEmp } from "@/services/almaycru/Empleado";
import { getLigas } from "@/services/almaycru/Liga";
import { getEmpleados } from "@/services/almaycru/Empleado";
import {
  createPrestamo,
  eliminatePrestamos,
  createPrestamoa,
  getOnePrestamo,
  deletePrestamo,
  getPrestamo,
  updatePrestamo,
} from "@/services/almaycru/Prestamo";
import { createCxp, getOneCxp } from "@/services/almaycru/Cxp";
import { getVitolas } from "@/services/almaycru/Vitola";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import { Cxp } from "@/interfaces/Cxp";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "prestamos-form",
  components: {
    Navbar,
  },
  data() {
    return {
      currentEmpleado: { nombre: "", horas: 8 },
      seguros2: [],
      seguros: [
        "NINGUNO",
        "ARS CMD",
        "MAPFRE SALUD ARS, S.A.",
        "FUTURO",
        "META SALUD",
        "YUNEN",
        "RESERVAS",
        "MONUMENTAL",
        "ASEMAP",
        "ARS APS S A",
        "SIMAG",
        "RENACER",
        "GRUPO MEDICO ASOCIADO",
        "PRIMERA ARS DE HUMANO",
        "UNIVERSAL",
        "HUMANO SEGUROS",
        "SENASA CONTRIBUTIVO",
        "SENASA SUBSIDIADO",
        "SEMMA",
        "IDOPPRIL",
        "ARS UASD",
        "OTRA",
      ],
      search: "",
      showModal7: false,
      oneCxp: {} as Cxp,
      cxp: {} as Cxp,
      vitolaSelected: [],
      vitolas: [] as Vitola[],
      empleados: [] as Empleado[],
      empleadosEmp: [] as Empleado[],
      empleadosPeg: [] as Empleado[],
      empleadosMez: [] as Empleado[],
      campoFocus: "empleados",
      mensageError: "Error",
      mensageExito: "Prestamo Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Prestamo?",
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
      prestamo: {} as Prestamo,
      onePrestamo: {} as Prestamo,
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
    this.prestamo.empleados = [];
    this.loadEmpleados();
    // this.fillEmpleados();
    if (this.$route.fullPath == "/prestamos/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Prestamo";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Prestamo";
    }

    if (this.modoForm == "add") {
      this.prestamo.no = 1;
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadPrestamo(this.$route.params.id);
      }
      this.fixTime();
    }

    // this.focus();
    // this.loadEmpleados();
    this.loadLigas();
    this.loadVitolas();
    this.filterEmpleados();
  },

  methods: {
    calcCuotas() {
      this.prestamo.empleados = [];
      let i = 0;
      let acum = 0;
      for (i = 0; i <= this.prestamo.cuotas - 1; i++) {
        let no = i + 1;
        acum = this.prestamo.montoCuotas * no;
        this.prestamo.empleados.push({
          no: no,
          nombre: acum,
          cobrado: false,
        });
      }
    },
    clacPrestamo() {
      if (this.prestamo.monto && this.prestamo.cuotas) {
        this.prestamo.montoCuotas = this.prestamo.monto / this.prestamo.cuotas;
        this.calcCuotas();
      }
    },
    fechaCxp(fech: Date) {
      this.cxp.fecha = fech;
      this.fixTime();
    },

    deleteService(it: any) {
      if (confirm("Está Seguro que desea Eliminar Este Empleado?")) {
        this.prestamo.empleados.splice(it, 1);
      }
    },

    setSeguro(seguro: any) {
      this.prestamo.empleado = seguro.nombre;
      this.search = "";
      this.showModalMethod7();
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: Empleado) => {
          return seguro.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0].nombre + "?")) {
          this.setSeguro(this.seguros2[0]);
          this.search = "";
        }
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
    },

    valorTotal() {
      this.totales.empleados = this.empleados.length;
      // this.totales.reclamacion = this.reclams.reduce(
      //   (accum: any, item: any) => accum + item.reclamacion,
      //   0
      // );

      // this.totales.documentos3 = this.reclams2.length;
      // this.totales.reclamacion3 = this.reclams2.reduce(
      //   (accum: any, item: any) => accum + item.reclamacion,
      //   0
      // );
    },

    async loadEmpleados() {
      this.toggleLoading();
      try {
        const res = await getEmpleados();
        this.seguros = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    // fillEmpleados() {
    //   this.prestamo.empleados = [];
    //   this.prestamo.empleados.push("Ronnald");
    //   this.prestamo.empleados.push("Anabel");
    // },

    calcValor() {
      this.cxp.valor =
        (this.vitolaSelected[0].pago / 50) * this.prestamo.cantidad;
    },

    async saveCxp() {
      // this.toggleLoading();
      try {
        try {
          const res = await getOneCxp();
          this.oneCxp = res.data;
          this.one = this.oneCxp[0];
          this.nextNo = this.one.no + 1;
          this.cxp.no = this.nextNo;
          // this.cxp.principal = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.cxp.userReg = this.$store.state.user.usuario;
        this.cxp.pagar = false;
        const res = await createCxp(this.cxp);
        // this.$router.push("/cxps/");
      } catch (error) {
        // // console.error(error);
      }
      // await this.toggleLoading();
      // if (this.error !== this.mensageError) {
      //   await this.cleanFields();
      // }
      // await this.fillFields();
      // document.getElementById(this.campoFocus).focus();
      // this.toggleAlert();
    },

    selectVitola(term: string) {
      this.vitolaSelected = this.vitolas.filter((vitola: Vitola) => {
        return vitola.descripcion.toLowerCase().includes(term.toLowerCase());
      });
      this.cxp.valor =
        (this.vitolaSelected[0].pago / 50) * this.prestamo.cantidad;
    },

    async filterEmpleados() {
      this.toggleLoading();
      try {
        const res = await getPeg();
        this.empleadosPeg = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getEmp();
        this.empleadosEmp = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getMez();
        this.empleadosMez = res.data;
      } catch (error) {
        // console.error(error);
      }

      this.toggleLoading();
    },

    async loadLigas() {
      // this.toggleLoading();
      try {
        const res = await getLigas();
        this.empleadoss = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadVitolas() {
      // this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    // async loadEmpleados() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getEmpleados();
    //     this.empleados = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    fixTime() {
      this.prestamo.fecha = this.formatDateToFix(this.prestamo.fecha, true);
      this.cxp.fecha = this.formatDateToFix(this.cxp.fecha, true);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "hours");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "hours");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadPrestamo(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getPrestamo(id);
        this.prestamo = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.prestamo.userMod = this.$store.state.user.usuario;
          await updatePrestamo(this.$route.params.id, this.prestamo);
          // this.addMessage();
          this.$router.push("/prestamos");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deletePrestamo(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/prestamos");
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
    calcPrestamo() {
      (this.prestamo.retension = this.prestamo.bruto * 0.1),
        (this.prestamo.neto = this.prestamo.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },
    formatNumber2(value: number) {
      return numeral(value).format("0,0");
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
      this.prestamo.fecha = new Date();
      // this.prestamo.cantidad = 0;
      // this.prestamo.monos = 0;
      // this.prestamo.empleadoMezclador = "ROBERTO EPIFANIO CABRERA SANTOS";
      this.cxp.fecha = new Date();
    },

    async loadOnePrestamo() {
      try {
        const res = await getOnePrestamo();
        this.onePrestamo = res.data;
        this.one = this.onePrestamo[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.prestamo.no = this.nextNo;
        this.prestamo.principal = this.nextNo;
        this.prestamo.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async savePrestamoa() {
      await this.loadOnePrestamo();
      try {
        const res = await createPrestamoa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async savePrestamo() {
      if (this.prestamo.empleados.length == 0) {
        alert("Asegúrece de Agregar Cuotas al Préstamo");
      } else {
        this.toggleLoading();
        try {
          try {
            const res = await getOnePrestamo();
            this.onePrestamo = res.data;
            this.one = this.onePrestamo[0];
            this.nextNo = this.one.no + 1;
            this.prestamo.no = this.nextNo;
          } catch (error) {
            // // console.error(error);
          }
          this.prestamo.userReg = this.$store.state.user.usuario;
          // this.cxp.pago = 0;

          // let i: number;
          // for (i = 0; i <= this.prestamo.empleados.length - 1; i++) {
          //   this.cxp.empleado = this.prestamo.empleados[i].nombre;
          //   this.cxp.origen = "Prestamo";

          //   if (this.prestamo.empleados[i].horas == 8) {
          //     this.cxp.valor = 600;
          //     this.cxp.desc =
          //       this.prestamo.empleados[i].horas +
          //       " HORAS (Prestamo Normal Completa)";
          //   } else if (this.prestamo.empleados[i].horas > 8) {
          //     this.cxp.valor =
          //       600 + (this.prestamo.empleados[i].horas - 8) * 100;
          //     this.cxp.desc =
          //       this.prestamo.empleados[i].horas +
          //       " HORAS ( " +
          //       (this.prestamo.empleados[i].horas - 8) +
          //       " HORAS EXTRAS X RD$ 100.00)";
          //   } else {
          //     this.cxp.valor = (600 / 8) * this.prestamo.empleados[i].horas;
          //     this.cxp.desc =
          //       this.prestamo.empleados[i].horas +
          //       " HORAS ( - " +
          //       (8 - this.prestamo.empleados[i].horas) +
          //       " HORAS NO LABORADAS X RD$ 75.00)";
          //   }
          //   await this.saveCxp();
          // }

          const res = await createPrestamo(this.prestamo).then(
            (res: { data: { title: any } }) => {
              this.error = this.respuesta = res.data.title;
              // this.$router.push("/");
              this.res = res;
              this.respuesta = res.data;
              // this.addMessage();
            },
            (err: { response: { data: { error: any } } }) => {
              // console.log(err.response);
              this.error = err.response.data.error;
            }
          );
          // this.$router.push("/prestamos/");
        } catch (error) {
          // // console.error(error);
        }
        await this.toggleLoading();
        if (this.error !== this.mensageError) {
          await this.cleanFields();
        }
        await this.fillFields();
        // document.getElementById(this.campoFocus).focus();
        this.toggleAlert();
      }
    },

    async deleteAllPrestamos() {
      try {
        const res = await eliminatePrestamos(this.prestamo);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.prestamo.fecha = "";
      this.prestamo.empleados = [];
      this.prestamo.empleado = "";
      this.prestamo.monto = 0;
      this.prestamo.cuotas = 0;
      this.prestamo.montoCuotas = 0;
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    // focus() {
    //   document.getElementById(this.campoFocus).focus();
    // },
  },
});
</script>

<style lang="css" scoped>
.der {
  text-align: right;
}
/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td {
  border: 1px solid #ddd;
  padding: 3px;
  cursor: pointer;
}

#customers th {
  border: 1px solid #ddd;
  padding: 3px;
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
/* End Tabla */
ul {
  list-style: none;
}
.redOption {
  color: red;
}

/* Modal 7 */
.modal7 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
  overflow-y: scroll;
}

.contenedor7 {
  width: 350px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: black;
  color: #fff;
}

.contenedor7 label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido7 {
  padding: 7px;
}

/* End Modal */

h4 {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  font-size: 75%;
  text-align: center;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

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
