<template>
  <main>
    <!-- {{this.$store.state.isPrefact}} <br/>
    {{this.$store.state.ids}} -->

    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "App",
  components: {
  },
});
</script>
