<template>
  <div class="gridlistausuarios">
    <div
      style="cursor: pointer"
      v-for="(usuario, index) in usuarios"
      :key="index"
      @click="this.$router.push(`/usuarios/${usuario._id}`)"
      class="card mb-3"
    >
      <div class="card-header ta-c">
        <h5 class="bold">{{ usuario.nombre }}</h5>
      </div>
      <div class="card-body">
        <p><span class="bold">Email: </span>{{ usuario.email }}</p>
        <p><span class="bold">Rol: </span>{{ usuario.role }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["usuarios"],
  methods: {},
};
</script>

<style lang="css" scoped>
.bold {
  font-weight: bold;
}

.gridlistausuarios {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-c {
  text-align: center;
}

p {
  margin: 0px;
}

.red {
  color: red;
}
</style>
