<template>
  <div class="gridEncontrar">
    <button
      @click="this.$router.push(`/mejoras/new`)"
      type="button"
      class="btn btn-outline-success"
    >
      <i class="fas fa-plus" _mstvisible="2"></i> Agregar Mejora
    </button>
    <div>
      <div class="form-floating mb-3">
        <input
          id="search"
          type="buscar"
          placeholder="Buscar"
          class="form-control"
          autofocus
          v-model="term"
          @keypress.enter="search(term)"
        /><label for="buscar">Buscar por Nombre:</label>
      </div>
    </div>
    <div>
      <b><p>Filtrar por Tipo</p></b>
      <div class="gridposts">
        <p
          class="post"
          style="cursor: pointer"
          v-for="filter in filters"
          :key="filter"
          @click="() => filterMejoras(filter)"
        >
          {{ filter }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const filters = ["Todos", "Error", "Mejora", "Función"];

export default {
  props: ["filterMejoras", "search", "filteredMejoras"],

  data() {
    return {
      filters,
      term: "",
      filters2: [] as [],
    };
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0px;
}
.gridposts {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}

.gridposts > p {
  text-align: center;
  background-color: grey;
  margin: 1px;
  color: white;
}

.gridposts > p:hover {
  text-align: center;
  background-color: rgb(147, 147, 147);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  margin: 1px;
  color: white;
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
