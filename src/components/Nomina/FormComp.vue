<template v-show="!cargando">
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{this.modoForm}} -->
  <!-- {{ this.empleados }} -->
  <!-- {{ this.nomina }} -->
  <!-- {{ this.documento }}<br /> -->
  <!-- {{ this.documento2 }} -->
  <!-- {{ this.prepagos }} -->
  <!-- {{ this.pagos }} -->
  <!-- {{ this.nextNo }} -->
  <!-- {{ this.incentivos2 }}<br /><br /> -->
  <!-- {{ this.cxp }} -->
  <!-- {{ this.$store.state.user.pagosID }} -->
  <!-- {{ this.$store.state.user.nomina }} -->

  <div>
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
        <h6 class="ta-c">{{ this.estadoLoading }}</h6>
      </div>
    </Transition>

    <div v-show="!cargando" class="general">
      <h6 :class="isError(error)">{{ error }}</h6>
      <form>
        <fieldset>
          <h6>{{ encabezado }}</h6>
          <label class="form-label"><b>Datos de la Nómina</b></label>
          <div class="form-group">
            <div class="grid">
              <!-- Start Fields -->
              <!-- {{ this.nomina.fecha }} -->
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="fecha"
                  >Fecha:</label
                ><input
                  id="fecha"
                  type="date"
                  v-model="nomina.fecha"
                  class="form-control"
                />
              </div>
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="pagoNo"
                  >Pago:</label
                ><input
                  id="pagoNo"
                  type="number"
                  v-model="nomina.pagoNo"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="empleado"
                  >Empleado:</label
                ><select
                  id="empleado"
                  v-model="nomina.empleado"
                  class="form-select"
                >
                  <option
                    v-for="(empleado, index) in empleados"
                    :key="index"
                    :value="empleado.nombre"
                    >{{ empleado.nombre }}</option
                  >
                </select>
              </div> -->
              <div v-if="this.modoForm == 'show'">
                <label class="ta-l col-form-label col-form-label-sm" for="cant"
                  >Pagos:</label
                ><input
                  disabled
                  id="cant"
                  type="number"
                  v-model="nomina.cant"
                  class="form-control"
                />
              </div>
              <div v-if="this.modoForm == 'show'">
                <label class="ta-l col-form-label col-form-label-sm" for="valor"
                  >Valor:</label
                ><input
                  disabled
                  id="valor"
                  type="number"
                  v-model="nomina.valor"
                  class="form-control"
                />
              </div>
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="origen"
                  >Orígen:</label
                ><select
                  id="origen"
                  v-model="nomina.origen"
                  class="form-select"
                >
                  <option>Producción</option>
                  <option>Recapada</option>
                  <option>Incentivo</option>
                  <option>Salario</option>
                  <option>Jornada</option>
                </select>
              </div> -->
            </div>
            <label v-if="this.modoForm == 'show'" class="form-label"
              ><b>Pagos</b></label
            >
            <div v-if="this.modoForm == 'show'" class="grid">
              <table id="customers">
                <!-- Head -->
                <tr>
                  <th>No.</th>
                  <th>Empleado</th>
                  <th>Cant.</th>
                  <th>Valor</th>
                </tr>
                <!-- Body -->
                <tr
                  style="cursor : pointer"
                  v-for="(item, index) in pagos"
                  :key="index"
                  @click="this.$router.push(`/pagos/${item._id}`)"
                >
                  <td class="ta-r">
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ item.empleado }}
                  </td>
                  <td class="ta-r">
                    {{ formatNumber2(item.cant) }}
                  </td>
                  <td class="ta-r">
                    {{ formatNumber(item.valor) }}
                  </td>
                </tr>
                <!-- End -->
                <!-- <tr style="font-weight: bold">
                  <td>Total: {{ this.totales.cantPagos }}</td>
                  <td></td>
                  <td class="ta-r">
                    {{ formatNumber(this.totales.pagos) }}
                  </td>
                </tr> -->
              </table>
            </div>
          </div>
          <!-- {{ this.asalariados }}<br /> -->
          <!-- {{ this.cxp }} -->

          <!-- <button
            v-if="this.modoForm == 'add'"
            class="btn btn-info"
            @click.prevent="generarIncentivos()"
          >
            <i class="fas fa-cog"></i> Generar Incentivos
          </button> -->

          <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="generarNomina()"
            :disabled="!nomina.fecha"
          >
            <i class="fas fa-cog"></i> Generar Nómina
          </button>

          <!-- <button
            v-if="this.modoForm == 'add'"
            class="btn btn-success"
            @click.prevent="saveNomina()"
            :disabled="!nomina.fecha || !nomina.cant || !nomina.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button> -->

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-success"
            @click.prevent="handleUpdate()"
            :disabled="!nomina.fecha || !nomina.cant || !nomina.valor"
          >
            <i class="fas fa-save"></i> Guardar
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-warning"
            @click="this.$router.push(`/nominas2/${nomina._id}`)"
          >
            <i class="fas fa-print"></i> Imprimir
          </button>

          <button
            v-if="this.modoForm == 'show'"
            class="btn btn-info"
            @click.prevent="imprimirPagos()"
          >
            <i class="fas fa-print"></i> Imprimir Pagos
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
import { Nomina } from "@/interfaces/Nomina";
import { Funcion } from "@/interfaces/Funcion";
import { Cxp } from "@/interfaces/Cxp";
import { Pago } from "@/interfaces/Pago";
import {
  getPagByNom,
  getPagosNom,
  servAsigPago,
} from "@/services/almaycru/Pago";
import { GetAsalar } from "@/services/almaycru/Empleado";
import { GetPrepagos } from "@/services/almaycru/Cxp";
import { servParaPago, servEnPago } from "@/services/almaycru/Cxp";
import {
  createNomina,
  eliminateNominas,
  createNominaa,
  getOneNomina,
  deleteNomina,
  getNomina,
  updateNomina,
} from "@/services/almaycru/Nomina";
import { createPago, getOnePago } from "@/services/almaycru/Pago";
import { createCxp, getOneCxp } from "@/services/almaycru/Cxp";
import { getInc1, getInc2, getInc3, getInc4 } from "@/services/almaycru/Rueda";
import { getFuncions } from "@/services/almaycru/Funcion";
import { createMensaje } from "@/services/almaycru/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "nominas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      pagosID: [],
      incentivos: [],
      incentivos2: [],
      estadoLoading: "Cargando...",

      pago: {} as Pago,
      onePago: {} as Pago,
      one1: {},
      nextNo1: Number,

      cxp: {} as Cxp,
      oneCxp: {} as Cxp,
      one0: {},
      nextNo0: Number,

      asalariados: [],
      prepagos: [],
      // empleados: [] as Empleado[],
      campoFocus: "fecha",
      mensageError: "Error",
      mensageExito: "Nómina Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Nómina?",
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
      documento2: { nomina: 0 } as any,

      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      nomina: {} as Nomina,
      oneNomina: {} as Nomina,
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
      pagos: [],
      totales: {} as any,
    };
  },

  async mounted() {
    if (this.$store.state.user.isPrinting == true) {
      // alert("isPrinting = true");
      this.$router.push(
        `/pagosSeries/${
          this.$store.state.user.pagosID[this.$store.state.user.currentPago]
        }`
      );
    }
    if (this.$route.fullPath == "/nominas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Nómina";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Nómina";
    }

    if (this.modoForm == "add") {
      this.nomina.no = 1;
      // this.fillFields();
      // this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadNomina(this.$route.params.id);
        this.documento.nomina = this.nomina.no;
        this.loadNomina2();
      }
      this.fixTime();
    }

    this.focus();
  },

  // updated() {
  //   this.valorTotal();
  // },

  methods: {
    imprimirPagos() {
      this.$store.state.user.nomina = this.nomina._id;
      this.$store.state.user.isPrinting = true;
      this.$store.state.user.pagosID = [];
      let i: number;
      for (i = 0; i <= this.pagos.length - 1; i++) {
        // alert(this.pagos[i]._id);
        this.$store.state.user.pagosID.push(this.pagos[i]._id);
        // this.$router.push(`/pagosSeries/${this.pagos[i]._id}`);
      }
      this.$store.state.user.currentPago = 0;
      this.$router.push(
        `/pagosSeries/${
          this.$store.state.user.pagosID[this.$store.state.user.currentPago]
        }`
      );

      // let pagoID: string;
      // pagoID = "62f64afa0f33da854731150e";
      // this.$router.push(`/pagos2/${pagoID}`);

      // pagoID = "62f64b160f33da854731156a";
      // this.$router.push(`/pagos2/${pagoID}`);
    },
    getDivisor(vitola: string) {
      if (vitola == "GRAN TORO 70X7") {
        return 5;
      } else {
        return 6;
      }
    },

    getDivisor2(vitola: string) {
      if (vitola == "GRAN TORO 70X7") {
        return 6;
      } else {
        return 7;
      }
    },

    async asigNom() {
      this.estadoLoading = "Cargando Pagos a Nómina...";
      // this.toggleLoading();
      try {
        const res = await servAsigPago(this.documento2);
        // this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async enPago() {
      // this.estadoLoading = "Seleccionando Cuentas por Pagar para Pago...";
      // this.toggleLoading();
      try {
        const res = await servEnPago(this.documento);
        // this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
      // this.estadoLoading = "Cargando...";
    },

    async paraPago() {
      this.estadoLoading = "Seleccionando Cuentas por Pagar para Pago...";
      this.toggleLoading();
      try {
        const res = await servParaPago(this.documento);
        this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async savePago() {
      // this.estadoLoading = "Generando Pagos...";
      // this.toggleLoading();
      try {
        try {
          const res = await getOnePago();
          this.pago.no = 1;
          this.onePago = res.data;
          this.one1 = this.onePago[0];
          this.nextNo1 = this.one1.no + 1;
          this.pago.no = this.nextNo1;
        } catch (error) {
          // // console.error(error);
        }
        this.pago.userReg = this.$store.state.user.usuario;
        this.pago.nomina = 0;
        this.pago.fecha = this.nomina.fecha;
        const res = await createPago(this.pago);
      } catch (error) {
        // // console.error(error);
      }
      // await this.toggleLoading();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
      // this.estadoLoading = "Generando Pagos...";
    },

    async saveCxp() {
      // this.estadoLoading = "Generando Cuenta por Pagar Asalariados...";
      // this.toggleLoading();
      try {
        try {
          const res = await getOneCxp();
          this.oneCxp = res.data;
          this.one0 = this.oneCxp[0];
          this.nextNo0 = this.one0.no + 1;
          this.cxp.no = this.nextNo0;
        } catch (error) {
          // // console.error(error);
        }
        // this.cxp.userReg = this.$store.state.user.usuario;
        // this.cxp.pagar = false;
        // this.cxp.pago = 0;
        // this.cxp.origen = "Salario";
        // this.cxp.desc = "Fijo Semanal";
        // this.cxp.fecha = this.nomina.fecha;
        const res = await createCxp(this.cxp);
      } catch (error) {
        // // console.error(error);
      }
      // await this.toggleLoading();
      // if (this.error !== this.mensageError) {
      //   await this.cleanFields();
      // }
      // await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
      // this.estadoLoading = "Cargando...";
    },

    async loadAsalariados() {
      this.toggleLoading();
      try {
        const res = await GetAsalar();
        this.asalariados = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadPagos() {
      this.estadoLoading = "Cargando Pagos...";
      this.toggleLoading();
      try {
        const res = await getPagosNom();
        this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async loadPrepagos() {
      this.estadoLoading = "Cargando Prepagos...";
      this.toggleLoading();
      try {
        const res = await GetPrepagos();
        this.prepagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async generarIncentivos() {
      this.estadoLoading =
        "Obteniendo Producción de LINGA MOST WANTED de los Empuñeros...";
      this.toggleLoading();
      // Obtener Primera Consulta
      try {
        const res = await getInc1();
        this.incentivos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // Extraer Registros que aplican para Insentivo
      let i: number;
      for (i = 0; i <= this.incentivos.length - 1; i++) {
        if (
          this.incentivos[i].count /
            this.getDivisor(this.incentivos[i]._id.vitola) >=
          1
        ) {
          // Definiendo Variables
          let a: string;
          let b: string;
          let c: string;
          let d: number;
          let e: number;
          let f: number;
          let g: number;
          let h: number;
          // Asignando Valor a Variables
          a = this.incentivos[i]._id.vitola;
          b = this.incentivos[i]._id.day;
          c = this.incentivos[i]._id.empleadoEmpunero;
          d = this.incentivos[i].count;
          e = this.getDivisor(this.incentivos[i]._id.vitola);
          f =
            this.incentivos[i].count /
            this.getDivisor(this.incentivos[i]._id.vitola);
          g = Math.trunc(
            this.incentivos[i].count /
              this.getDivisor(this.incentivos[i]._id.vitola)
          );

          h =
            Math.trunc(
              this.incentivos[i].count /
                this.getDivisor(this.incentivos[i]._id.vitola)
            ) * 200;

          // Creando Objeto
          this.incentivos2.push({
            vitola: a,
            day: b,
            empleado: c,
            count: d,
            divisor: e,
            countDivisor: f,
            truncado: g,
            pago: h,
          });
        }
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";

      // Limpiando Incentivos
      this.incentivos = [];

      this.estadoLoading =
        "Obteniendo Producción de LINGA MOST WANTED de los Pegadores...";
      this.toggleLoading();
      // Obtener Primera Consulta
      try {
        const res = await getInc2();
        this.incentivos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // Extraer Registros que aplican para Insentivo
      // let i: number;
      for (i = 0; i <= this.incentivos.length - 1; i++) {
        if (
          this.incentivos[i].count /
            this.getDivisor(this.incentivos[i]._id.vitola) >=
          1
        ) {
          // Definiendo Variables
          let a: string;
          let b: string;
          let c: string;
          let d: number;
          let e: number;
          let g: number;
          let h: number;
          // Asignando Valor a Variables
          a = this.incentivos[i]._id.vitola;
          b = this.incentivos[i]._id.day;
          c = this.incentivos[i]._id.empleadoPegador;
          d = this.incentivos[i].count;
          e = this.getDivisor(this.incentivos[i]._id.vitola);
          g = Math.trunc(
            this.incentivos[i].count /
              this.getDivisor(this.incentivos[i]._id.vitola)
          );

          h =
            Math.trunc(
              this.incentivos[i].count /
                this.getDivisor(this.incentivos[i]._id.vitola)
            ) * 200;

          // Creando Objeto
          this.incentivos2.push({
            vitola: a,
            day: b,
            empleado: c,
            count: d,
            divisor: e,
            truncado: g,
            pago: h,
          });
        }
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";

      // Limpiando Incentivos
      this.incentivos = [];

      this.estadoLoading =
        "Obteniendo Producción de Todas las Vitolas de los Empuñeros...";
      this.toggleLoading();
      // Obtener Primera Consulta
      try {
        const res = await getInc3();
        this.incentivos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // Extraer Registros que aplican para Insentivo
      // let i: number;
      for (i = 0; i <= this.incentivos.length - 1; i++) {
        if (
          this.incentivos[i].count /
            this.getDivisor2(this.incentivos[i]._id.vitola) >=
          1
        ) {
          // Definiendo Variables
          let a: string;
          let b: string;
          let c: string;
          let d: number;
          let e: number;
          let g: number;
          let h: number;
          // Asignando Valor a Variables
          a = this.incentivos[i]._id.vitola;
          b = this.incentivos[i]._id.day;
          c = this.incentivos[i]._id.empleadoEmpunero;
          d = this.incentivos[i].count;
          e = this.getDivisor2(this.incentivos[i]._id.vitola);
          g = Math.trunc(
            this.incentivos[i].count /
              this.getDivisor2(this.incentivos[i]._id.vitola)
          );

          h =
            Math.trunc(
              this.incentivos[i].count /
                this.getDivisor2(this.incentivos[i]._id.vitola)
            ) * 200;

          // Creando Objeto
          this.incentivos2.push({
            vitola: a,
            day: b,
            empleado: c,
            count: d,
            divisor: e,
            truncado: g,
            pago: h,
          });
        }
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";

      // Limpiando Incentivos
      this.incentivos = [];

      this.estadoLoading =
        "Obteniendo Producción de Todas las Vitolas de los Pegadores...";
      this.toggleLoading();
      // Obtener Primera Consulta
      try {
        const res = await getInc4();
        this.incentivos = res.data;
      } catch (error) {
        // console.error(error);
      }
      // Extraer Registros que aplican para Insentivo
      // let i: number;
      for (i = 0; i <= this.incentivos.length - 1; i++) {
        if (
          this.incentivos[i].count /
            this.getDivisor2(this.incentivos[i]._id.vitola) >=
          1
        ) {
          // Definiendo Variables
          let a: string;
          let b: string;
          let c: string;
          let d: number;
          let e: number;
          let g: number;
          let h: number;
          // Asignando Valor a Variables
          a = this.incentivos[i]._id.vitola;
          b = this.incentivos[i]._id.day;
          c = this.incentivos[i]._id.empleadoPegador;
          d = this.incentivos[i].count;
          e = this.getDivisor2(this.incentivos[i]._id.vitola);
          g = Math.trunc(
            this.incentivos[i].count /
              this.getDivisor2(this.incentivos[i]._id.vitola)
          );

          h =
            Math.trunc(
              this.incentivos[i].count /
                this.getDivisor2(this.incentivos[i]._id.vitola)
            ) * 200;

          // Creando Objeto
          this.incentivos2.push({
            vitola: a,
            day: b,
            empleado: c,
            count: d,
            divisor: e,
            truncado: g,
            pago: h,
          });
        }
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";

      // Generar CxPs por Cada Incentivo
      // let i: number;
      this.estadoLoading = "Generando Cuenta por Pagar Incentivos...";
      this.toggleLoading();
      for (i = 0; i <= this.incentivos2.length - 1; i++) {
        this.cxp.empleado = this.incentivos2[i].empleado;
        this.cxp.valor = this.incentivos2[i].pago;
        this.cxp.userReg = this.$store.state.user.usuario;
        this.cxp.pagar = false;
        this.cxp.pago = 0;
        this.cxp.origen = "Incentivo";
        this.cxp.desc =
          "ALCANCE DE META (" +
          this.incentivos2[i].vitola +
          " PRODUCCION DE " +
          this.incentivos2[i].count +
          " )";
        this.cxp.fecha = this.incentivos2[i].day;

        await this.saveCxp();
      }
      this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async generarNomina() {
      if (
        confirm(
          "¿Está Seguro que desea Generar Esta Nómina?: " +
            this.formatDateAsk(this.nomina.fecha)
        )
      ) {
        //Generar Incentivos
        await this.generarIncentivos();

        // Cargar Asalariados
        await this.loadAsalariados();

        // Generar CxPs por Cada Asalariado
        let i: number;
        this.estadoLoading = "Generando Cuenta por Pagar Asalariados...";
        this.toggleLoading();
        for (i = 0; i <= this.asalariados.length - 1; i++) {
          this.cxp.empleado = this.asalariados[i].nombre;
          this.cxp.valor = this.asalariados[i].sueldo;

          this.cxp.userReg = this.$store.state.user.usuario;
          this.cxp.pagar = false;
          this.cxp.pago = 0;
          this.cxp.origen = "Salario";
          this.cxp.desc = "Fijo Semanal";
          this.cxp.fecha = this.nomina.fecha;

          await this.saveCxp();
        }
        this.toggleLoading();
        this.estadoLoading = "Cargando...";

        // Marcar Cxps para Pagar
        this.documento.fechaCorte = this.nomina.fecha;
        await this.paraPago();

        //Cargar Pre-Pagos
        await this.loadPrepagos();

        // Generar Pago por Cada Pre-Pago
        this.estadoLoading = "Generando Pagos...";
        this.toggleLoading();
        let j: number;
        for (j = 0; j <= this.prepagos.length - 1; j++) {
          this.pago.empleado = this.prepagos[j]._id.empleado;
          this.pago.cant = this.prepagos[j].count;
          this.pago.valor = this.prepagos[j].total;
          await this.savePago();
          // Marcar Cuentas en Pago
          this.documento.fechaCorte = this.nomina.fecha;
          this.documento.pago = 1;
          this.documento.pago = this.nextNo1;
          this.documento.empleado = this.pago.empleado = this.prepagos[
            j
          ]._id.empleado;
          await this.enPago();
          // alert(j + " de " + this.prepagos.length);
        }
        this.toggleLoading();
        this.estadoLoading = "Cargando...";

        //Cargar Pagos
        await this.loadPagos();

        //Generar Registro de Nómina
        await this.saveNomina();

        //Asignar Número de Nómina a Pagos
        await this.saveNomina2();
        this.documento2.nomina = this.one.no;
        this.asigNom();
      }
    },

    valorTotal() {
      if (this.showDelete) {
        this.totales.pagos = this.pagos.reduce(
          (accum: any, item: any) => accum + item.valor,
          0
        );

        this.totales.cantPagos = this.pagos.length;
      }
    },

    fixTime() {
      this.nomina.fecha = this.formatDateToFix(this.nomina.fecha, false);
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

    async loadNomina(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getNomina(id);
        this.nomina = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async loadNomina2() {
      this.toggleLoading();
      try {
        const res = await getPagByNom(this.documento);
        this.pagos = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    // async loadPagosByNom() {
    //   alert("Loading Pagos");
    //   this.toggleLoading();
    //   try {
    //     const res = await getPagByNom();
    //     this.pagos = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    async handleUpdate() {
      alert("No es Posible Modificar la Nómina");
      // this.toggleLoading();
      // try {
      //   if (typeof this.$route.params.id === "string") {
      //     this.nomina.userMod = this.$store.state.user.usuario;
      //     await updateNomina(this.$route.params.id, this.nomina);
      //     // this.addMessage();
      //     this.$router.push("/nominas");
      //   }
      // } catch (error) {
      //console.error(error);
      // }
      // this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteNomina(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/nominas");
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
    calcNomina() {
      (this.nomina.retension = this.nomina.bruto * 0.1),
        (this.nomina.neto = this.nomina.bruto * 0.9);
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

    formatDateAsk(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      moment.locale("es");
      return moment(out).format("DD MMMM yyyy");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    // fillFields() {
    //   this.nomina.fecha = this.formatDate(new Date());
    // },

    async loadOneNomina() {
      try {
        const res = await getOneNomina();
        this.oneNomina = res.data;
        this.one = this.oneNomina[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.nomina.no = this.nextNo;
        this.nomina.principal = this.nextNo;
        this.nomina.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveNominaa() {
      await this.loadOneNomina();
      try {
        const res = await createNominaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveNomina2() {
      this.estadoLoading = "Verificando Registro de Nómina...";
      this.toggleLoading();
      try {
        try {
          const res = await getOneNomina();
          this.oneNomina = res.data;
          this.one = this.oneNomina[0];
          this.nextNo = this.one.no + 1;
          this.nomina.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    async saveNomina() {
      this.estadoLoading = "Creando Registro de Nómina...";
      this.toggleLoading();
      try {
        try {
          const res = await getOneNomina();
          this.oneNomina = res.data;
          this.one = this.oneNomina[0];
          this.nextNo = this.one.no + 1;
          this.nomina.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.nomina.userReg = this.$store.state.user.usuario;
        this.nomina.cant = this.pagos[0].count;
        this.nomina.valor = this.pagos[0].valor;

        const res = await createNomina(this.nomina).then(
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
        // this.$router.push("/nominas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      this.estadoLoading = "Cargando...";
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      // await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllNominas() {
      try {
        const res = await eliminateNominas(this.nomina);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.nomina.fecha = "";
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

.ta-c {
  text-align: center;
}
</style>
