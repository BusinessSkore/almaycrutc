<template v-show="!cargando">
  <!-- {{ this.vitola.actividad }} -->
  <!-- {{ this.respuesta }} -->
  <!-- {{this.documento}} -->
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
          <h6>Detalle de Vitola</h6>
          <label class="form-label"><b>Datos de la Vitola</b></label>
          <div class="form-group">
            <!-- <label class="form-label"><b>Datos Generales</b></label> -->
            <!-- Start Fields -->
            <div class="grid">
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="nombredelvitola"
                  >Nombre:</label
                ><input
                  id="nombredelvitola"
                  type="nombredelvitola"
                  v-model="vitola.nombredelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="apellidodelvitola"
                  >Apellido:</label
                ><input
                  id="apellidodelvitola"
                  type="apellidodelvitola"
                  v-model="vitola.apellidodelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="rnedelvitola"
                  >RNE:</label
                ><input
                  id="rnedelvitola"
                  type="rnedelvitola"
                  v-model="vitola.rnedelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="sexodelvitola"
                  >Sexo:</label
                ><select
                  id="sexodelvitola"
                  type="sexodelvitola"
                  v-model="vitola.sexodelvitola"
                  class="form-select"
                >
                  <option selected>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="fechadenacimientodelvitola"
                  >Fecha de Nacimiento:</label
                ><input
                  id="fechadenacimientodelvitola"
                  type="date"
                  v-model="vitola.fechadenacimientodelvitola"
                  class="form-control"
                  @change="
                    calcularEdad(vitola.fechadenacimientodelvitola)
                  "
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="edaddelvitola"
                  >Edad:</label
                ><input
                  disabled
                  id="edaddelvitola"
                  type="number"
                  v-model="vitola.edaddelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="nacionalidaddelvitola"
                  >Nacionalidad:</label
                ><input
                  id="nacionalidaddelvitola"
                  type="nacionalidaddelvitola"
                  v-model="vitola.nacionalidaddelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="enfermedadoalergiasdelvitola"
                  >Enfermedad o Alergias:</label
                ><input
                  id="enfermedadoalergiasdelvitola"
                  type="enfermedadoalergiasdelvitola"
                  v-model="vitola.enfermedadoalergiasdelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="tiposanguineodelvitola"
                  >Tipo Sanguíneo:</label
                ><input
                  id="tiposanguineodelvitola"
                  type="tiposanguineodelvitola"
                  v-model="vitola.tiposanguineodelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="medicamentodelvitola"
                  >Medicamento:</label
                ><input
                  id="medicamentodelvitola"
                  type="medicamentodelvitola"
                  v-model="vitola.medicamentodelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="conquienvivedelvitola"
                  >Con Quien Vive:</label
                ><input
                  id="conquienvivedelvitola"
                  type="conquienvivedelvitola"
                  v-model="vitola.conquienvivedelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="direcciondelvitola"
                  >Dirección:</label
                ><input
                  id="direcciondelvitola"
                  type="direcciondelvitola"
                  v-model="vitola.direcciondelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="sectordelvitola"
                  >Sector:</label
                ><input
                  id="sectordelvitola"
                  type="sectordelvitola"
                  v-model="vitola.sectordelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="ceduladelvitola"
                  >Cédula:</label
                ><input
                  id="ceduladelvitola"
                  type="ceduladelvitola"
                  v-model="vitola.ceduladelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="telefonodelvitola"
                  >Teléfono:</label
                ><input
                  id="telefonodelvitola"
                  type="telefonodelvitola"
                  v-model="vitola.telefonodelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="celulardelvitola"
                  >Celular:</label
                ><input
                  id="celulardelvitola"
                  type="celulardelvitola"
                  v-model="vitola.celulardelvitola"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="centrodeprocedencia"
                  >Centro de Procedencia:</label
                ><input
                  id="centrodeprocedencia"
                  type="centrodeprocedencia"
                  v-model="vitola.centrodeprocedencia"
                  class="form-control"
                />
              </div>
            </div>
            <label
              style="cursor:pointer"
              @click="toggleShowDatosPadre()"
              class="form-label"
              ><b
                >Datos del Padre
                <Transition>
                  <i v-if="showDatosPadre" class="fas fa-angle-up"></i>
                </Transition>
                <Transition>
                  <i v-if="!showDatosPadre" class="fas fa-angle-down"></i>
                </Transition>
              </b>
            </label>
            <Transition>
              <div v-if="showDatosPadre" class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombredelpadre"
                    >Nombre:</label
                  ><input
                    id="nombredelpadre"
                    type="nombredelpadre"
                    v-model="vitola.nombredelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="apellidodelpadre"
                    >Apellido:</label
                  ><input
                    id="apellidodelpadre"
                    type="apellidodelpadre"
                    v-model="vitola.apellidodelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="ceduladelpadre"
                    >Cédula:</label
                  ><input
                    id="ceduladelpadre"
                    type="ceduladelpadre"
                    v-model="vitola.ceduladelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="casadelpadre"
                    >Casa:</label
                  ><input
                    id="casadelpadre"
                    type="casadelpadre"
                    v-model="vitola.casadelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="celulardelpadre"
                    >Celular:</label
                  ><input
                    id="celulardelpadre"
                    type="celulardelpadre"
                    v-model="vitola.celulardelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="trabajodelpadre"
                    >Trabajo:</label
                  ><input
                    id="trabajodelpadre"
                    type="trabajodelpadre"
                    v-model="vitola.trabajodelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="extensiondelpadre"
                    >Extensión:</label
                  ><input
                    id="extensiondelpadre"
                    type="extensiondelpadre"
                    v-model="vitola.extensiondelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="niveleducalcanzadodelpadre"
                    >Nivel Educ. Alcanzado:</label
                  ><input
                    id="niveleducalcanzadodelpadre"
                    type="niveleducalcanzadodelpadre"
                    v-model="vitola.niveleducalcanzadodelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="lugardetrabajodelpadre"
                    >Luhar de Trabajo:</label
                  ><input
                    id="lugardetrabajodelpadre"
                    type="lugardetrabajodelpadre"
                    v-model="vitola.lugardetrabajodelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="profesiondelpadre"
                    >Profesión:</label
                  ><input
                    id="profesiondelpadre"
                    type="profesiondelpadre"
                    v-model="vitola.profesiondelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="emaildelpadre"
                    >E-Mail:</label
                  ><input
                    id="emaildelpadre"
                    type="emaildelpadre"
                    v-model="vitola.emaildelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nacionalidaddelpadre"
                    >Nacionalidad:</label
                  ><input
                    id="nacionalidaddelpadre"
                    type="nacionalidaddelpadre"
                    v-model="vitola.nacionalidaddelpadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="estadocivildelpadre"
                    >Estado Civil:</label
                  ><input
                    id="estadocivildelpadre"
                    type="estadocivildelpadre"
                    v-model="vitola.estadocivildelpadre"
                    class="form-control"
                  />
                </div>
              </div>
            </Transition>
            <label
              style="cursor:pointer"
              @click="toggleShowDatosMadre()"
              class="form-label"
              ><b
                >Datos de la Madre
                <Transition>
                  <i v-if="showDatosMadre" class="fas fa-angle-up"></i>
                </Transition>
                <Transition>
                  <i v-if="!showDatosMadre" class="fas fa-angle-down"></i>
                </Transition> </b
            ></label>
            <Transition>
              <div v-if="showDatosMadre" class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombredelamadre"
                    >Nombre:</label
                  ><input
                    id="nombredelamadre"
                    type="nombredelamadre"
                    v-model="vitola.nombredelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="apellidodelamadre"
                    >Apellido:</label
                  ><input
                    id="apellidodelamadre"
                    type="apellidodelamadre"
                    v-model="vitola.apellidodelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="ceduladelamadre"
                    >Cédula:</label
                  ><input
                    id="ceduladelamadre"
                    type="ceduladelamadre"
                    v-model="vitola.ceduladelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="casadelamadre"
                    >Casa:</label
                  ><input
                    id="casadelamadre"
                    type="casadelamadre"
                    v-model="vitola.casadelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="celulardelamadre"
                    >Celular:</label
                  ><input
                    id="celulardelamadre"
                    type="celulardelamadre"
                    v-model="vitola.celulardelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="trabajodelamadre"
                    >Trabajo:</label
                  ><input
                    id="trabajodelamadre"
                    type="trabajodelamadre"
                    v-model="vitola.trabajodelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="extensiondelamadre"
                    >Extensión:</label
                  ><input
                    id="extensiondelamadre"
                    type="extensiondelamadre"
                    v-model="vitola.extensiondelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="niveleducalcanzadodelamadre"
                    >Nivel Educ. Alcanzado:</label
                  ><input
                    id="niveleducalcanzadodelamadre"
                    type="niveleducalcanzadodelamadre"
                    v-model="vitola.niveleducalcanzadodelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="lugardetrabajodelamadre"
                    >Lugar de Trabajo:</label
                  ><input
                    id="lugardetrabajodelamadre"
                    type="lugardetrabajodelamadre"
                    v-model="vitola.lugardetrabajodelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="profesiondelamadre"
                    >Profesión:</label
                  ><input
                    id="profesiondelamadre"
                    type="profesiondelamadre"
                    v-model="vitola.profesiondelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="emaildelamadre"
                    >E-Mail:</label
                  ><input
                    id="emaildelamadre"
                    type="emaildelamadre"
                    v-model="vitola.emaildelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nacionalidaddelamadre"
                    >Nacionalidad:</label
                  ><input
                    id="nacionalidaddelamadre"
                    type="nacionalidaddelamadre"
                    v-model="vitola.nacionalidaddelamadre"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="estadocivildelamadre"
                    >Estado Civil:</label
                  ><input
                    id="estadocivildelamadre"
                    type="estadocivildelamadre"
                    v-model="vitola.estadocivildelamadre"
                    class="form-control"
                  />
                </div>
              </div>
            </Transition>
            <label
              style="cursor:pointer"
              @click="toggleShowDatosTutor()"
              class="form-label"
              ><b
                >Datos del Tutor
                <Transition>
                  <i v-if="showDatosTutor" class="fas fa-angle-up"></i>
                </Transition>
                <Transition>
                  <i v-if="!showDatosTutor" class="fas fa-angle-down"></i>
                </Transition> </b
            ></label>
            <Transition>
              <div v-if="showDatosTutor" class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombredeltutor"
                    >Nombre:</label
                  ><input
                    id="nombredeltutor"
                    type="nombredeltutor"
                    v-model="vitola.nombredeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="apellidodeltutor"
                    >Apellido:</label
                  ><input
                    id="apellidodeltutor"
                    type="apellidodeltutor"
                    v-model="vitola.apellidodeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="ceduladeltutor"
                    >Cédula:</label
                  ><input
                    id="ceduladeltutor"
                    type="ceduladeltutor"
                    v-model="vitola.ceduladeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="casadeltutor"
                    >Casa:</label
                  ><input
                    id="casadeltutor"
                    type="casadeltutor"
                    v-model="vitola.casadeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="celulardeltutor"
                    >Celular:</label
                  ><input
                    id="celulardeltutor"
                    type="celulardeltutor"
                    v-model="vitola.celulardeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="trabajodeltutor"
                    >Trabajo:</label
                  ><input
                    id="trabajodeltutor"
                    type="trabajodeltutor"
                    v-model="vitola.trabajodeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="extensiondeltutor"
                    >Extensión:</label
                  ><input
                    id="extensiondeltutor"
                    type="extensiondeltutor"
                    v-model="vitola.extensiondeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="direcciondeltutor"
                    >Dirección:</label
                  ><input
                    id="direcciondeltutor"
                    type="direcciondeltutor"
                    v-model="vitola.direcciondeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="sectordeltutor"
                    >Sector:</label
                  ><input
                    id="sectordeltutor"
                    type="sectordeltutor"
                    v-model="vitola.sectordeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="parentescodeltutor"
                    >Parentezco:</label
                  ><input
                    id="parentescodeltutor"
                    type="parentescodeltutor"
                    v-model="vitola.parentescodeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="niveleducalcanzadodeltutor"
                    >Nivel Educ. Alcanzado:</label
                  ><input
                    id="niveleducalcanzadodeltutor"
                    type="niveleducalcanzadodeltutor"
                    v-model="vitola.niveleducalcanzadodeltutor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="emaildeltutor"
                    >E-Mail:</label
                  ><input
                    id="emaildeltutor"
                    type="emaildeltutor"
                    v-model="vitola.emaildeltutor"
                    class="form-control"
                  />
                </div>
              </div>
            </Transition>
            <!-- End Fields -->
          </div>
          <button
            class="btn btn-primary"
            @click.prevent="handleUpdate()"
            :disabled="
              !vitola.nombredelvitola ||
                !vitola.apellidodelvitola ||
                !vitola.rnedelvitola ||
                !vitola.sexodelvitola ||
                !vitola.fechadenacimientodelvitola ||
                !vitola.edaddelvitola ||
                !vitola.nacionalidaddelvitola ||
                !vitola.enfermedadoalergiasdelvitola ||
                !vitola.tiposanguineodelvitola ||
                !vitola.medicamentodelvitola ||
                !vitola.conquienvivedelvitola ||
                !vitola.direcciondelvitola ||
                !vitola.sectordelvitola ||
                !vitola.ceduladelvitola ||
                !vitola.telefonodelvitola ||
                !vitola.celulardelvitola ||
                !vitola.centrodeprocedencia
            "
          >
            Guardar
          </button>
          <!-- <button class="btn btn-success" @click.prevent="handleUpdate()">
            <i class="fas fa-edit"></i> Actualizar
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
  </Transition>
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

    // Start Metodo
    this.showDeleteMethod();
    if (typeof this.$route.params.id === "string") {
      this.loadVitola(this.$route.params.id);
    }
    this.pusherSubscribe();
    // End Metodo

    this.focus();
  },

  methods: {
    async loadVitola(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getVitola(id);
        this.vitola = data;
        this.estado = this.vitola.estado;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      this.fixTime();
    },

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
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-D");
      }
    },

    fixTime() {
      this.vitola.fechadenacimientodelvitola = this.formatDateToFix(
        this.vitola.fechadenacimientodelvitola,
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
      } else if (message == "Ya Existe una Vitola Registrada con este Id") {
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
      document.getElementById("nombredelvitola").focus();
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
      this.vitola.nombredelvitola = "";
      this.vitola.apellidodelvitola = "";
      this.vitola.rnedelvitola = "";
      this.vitola.sexodelvitola = "";
      this.vitola.fechadenacimientodelvitola = "";
      this.vitola.edaddelvitola = "";
      this.vitola.nacionalidaddelvitola = "";
      this.vitola.enfermedadoalergiasdelvitola = "";
      this.vitola.tiposanguineodelvitola = "";
      this.vitola.medicamentodelvitola = "";
      this.vitola.conquienvivedelvitola = "";
      this.vitola.direcciondelvitola = "";
      this.vitola.sectordelvitola = "";
      this.vitola.ceduladelvitola = "";
      this.vitola.telefonodelvitola = "";
      this.vitola.celulardelvitola = "";
      this.vitola.centrodeprocedencia = "";
      this.vitola.nombredelpadre = "";
      this.vitola.apellidodelpadre = "";
      this.vitola.ceduladelpadre = "";
      this.vitola.casadelpadre = "";
      this.vitola.celulardelpadre = "";
      this.vitola.trabajodelpadre = "";
      this.vitola.extensiondelpadre = "";
      this.vitola.niveleducalcanzadodelpadre = "";
      this.vitola.lugardetrabajodelpadre = "";
      this.vitola.profesiondelpadre = "";
      this.vitola.emaildelpadre = "";
      this.vitola.nacionalidaddelpadre = "";
      this.vitola.estadocivildelpadre = "";
      this.vitola.nombredelamadre = "";
      this.vitola.apellidodelamadre = "";
      this.vitola.ceduladelamadre = "";
      this.vitola.casadelamadre = "";
      this.vitola.celulardelamadre = "";
      this.vitola.trabajodelamadre = "";
      this.vitola.extensiondelamadre = "";
      this.vitola.niveleducalcanzadodelamadre = "";
      this.vitola.lugardetrabajodelamadre = "";
      this.vitola.profesiondelamadre = "";
      this.vitola.emaildelamadre = "";
      this.vitola.nacionalidaddelamadre = "";
      this.vitola.estadocivildelamadre = "";
      this.vitola.nombredeltutor = "";
      this.vitola.apellidodeltutor = "";
      this.vitola.ceduladeltutor = "";
      this.vitola.casadeltutor = "";
      this.vitola.celulardeltutor = "";
      this.vitola.trabajodeltutor = "";
      this.vitola.extensiondeltutor = "";
      this.vitola.direcciondeltutor = "";
      this.vitola.sectordeltutor = "";
      this.vitola.parentescodeltutor = "";
      this.vitola.niveleducalcanzadodeltutor = "";
      this.vitola.emaildeltutor = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById("nombredelvitola").focus();
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
