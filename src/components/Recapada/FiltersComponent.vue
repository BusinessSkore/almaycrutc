<template>
  <!-- {{ this.filters }} -->
  <div class="gridEncontrar">
    <!-- Boton Agregar -->
    <!-- <button
      @click="this.$router.push(`/recapadas/new`)"
      type="button"
      class="btn btn-outline-success"
    >
      <i class="fas fa-plus" _mstvisible="2"></i> Agregar Recapada
    </button> -->
    <!-- Campo de Búsqueda -->
    <!-- <div>
      <div class="form-floating mb-3">
        <input
          id="search"
          type="buscar"
          placeholder="Buscar"
          class="form-control"
          autofocus
          v-model="term"
          @keypress.enter="search(term)"
        /><label for="buscar">Buscar por ID:</label>
      </div>
    </div> -->
  </div>
  <div>
    <h6>Filtrar por Estatus</h6>
    <div class="gridposts">
      <p
        :class="toColor(filter)"
        class="post"
        style="cursor: pointer"
        v-for="filter in filters"
        :key="filter"
        @click="() => filterRecapadas(filter)"
      >
        {{ filter }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
const filters = [
  "Todos",
  "1 - Recibido por Auditoría Interna",
  "2 - Verificado por Auditoría Interna",
  "3 - Verificado por Auditoría Externa",
  "4 - Recibido por Reclamaciones Médicas",
  "5 - Verificado por Reclamaciones Médicas",
  "6 - Cargado a Lote",
  "7 - Enviado a la Aseguradora",
];

export default {
  props: ["filterRecapadas", "search", "filteredRecapadas"],

  data() {
    return {
      filters,
      term: "",
      filters2: [] as [],
    };
  },

  methods: {
    toColor(type: string) {
      if (type == "1 - Recibido por Auditoría Interna") {
        return "valor1";
      } else if (type == "2 - Verificado por Auditoría Interna") {
        return "valor2";
      } else if (type == "3 - Verificado por Auditoría Externa") {
        return "valor3";
      } else if (type == "4 - Recibido por Reclamaciones Médicas") {
        return "valor4";
      } else if (type == "5 - Verificado por Reclamaciones Médicas") {
        return "valor5";
      } else if (type == "6 - Cargado a Lote") {
        return "valor6";
      } else if (type == "7 - Enviado a la Aseguradora") {
        return "valor7";
      } else if (type == "Todos") {
        return "Todos";
      }
    },
  },
};
</script>

<style lang="css" scoped>
h6 {
  text-align: center;
  margin-bottom: 8px;
}
* {
  margin: 0px;
}
.gridposts {
  display: grid;
  gap: 6px;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}

.gridposts > p {
  text-align: center;
  margin: 1px;
  color: white;
  font-size: 70%;
  padding: 5px;
}

/* Esquema de Colores Claros */

.recapadado {
  text-align: center;
  background-color: rgb(248, 105, 107);
  margin: 1px;
  color: white;
}

.RecibidoporAuditoría {
  text-align: center;
  background-color: rgb(250, 148, 115);
  margin: 1px;
  color: white;
}

.VerificadoporAuditoríaInterna {
  text-align: center;
  background-color: rgb(252, 191, 123);
  margin: 1px;
  color: white;
}

.VerificadoporAuditoríaExterna {
  text-align: center;
  background-color: rgb(255, 235, 132);
  margin: 1px;
  color: white;
}

.VerificadoporReclamacionesMédicas {
  text-align: center;
  background-color: rgb(204, 221, 130);
  margin: 1px;
  color: white;
}

.CargadoaLote {
  text-align: center;
  background-color: rgb(152, 206, 127);
  margin: 1px;
  color: white;
}

.EnviadoalaAseguradora {
  text-align: center;
  background-color: rgb(99, 190, 123);
  margin: 1px;
  color: white;
}

/* Esquema de Colores Profundos */

.Todos {
  text-align: center;
  background-color: grey;
  margin: 1px;
  color: white;
}

.valor1 {
  text-align: center;
  background-color: rgb(255, 0, 0);
  margin: 1px;
  color: white;
}

.valor2 {
  text-align: center;
  background-color: rgb(255, 64, 0);
  margin: 1px;
  color: white;
}

.valor3 {
  text-align: center;
  background-color: rgb(255, 128, 0);
  margin: 1px;
  color: white;
}

.valor4 {
  text-align: center;
  background-color: rgb(255, 192, 0);
  margin: 1px;
  color: white;
}

.valor5 {
  text-align: center;
  background-color: rgb(171, 187, 26);
  margin: 1px;
  color: white;
}

.valor6 {
  text-align: center;
  background-color: rgb(86, 182, 53);
  margin: 1px;
  color: white;
}

.valor7 {
  text-align: center;
  background-color: rgb(0, 176, 80);
  margin: 1px;
  color: white;
}

.gridposts > p:hover {
  /* text-align: center; */
  /* background-color: rgb(147, 147, 147); */
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  margin: 1px;
  /* color: white; */
}

.gridEncontrar {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
}

.gridEncontrar > div {
  text-align: center;
  margin: 7px;
  margin-bottom: 0px;
}

p {
  margin: 0%;
  border-radius: 7px;
}

a {
  text-decoration: none;
}

input {
  border-radius: 7px;
  margin-top: 0px;
}
</style>
