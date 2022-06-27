<template v-show="!cargando">
  <div v-if="cargando" class="spin">
    <img class="img" src="@/assets/images/logo.png" />
  </div>
  <Navbar />
  <!------------------------------------------------ General ------------------------------------------------->
  <div v-show="!cargando" class="general">
    <div class="grid">
      <div class="reportes">
        <h4><i class="fas fa-list" _mstvisible="2"></i> Chat</h4>
        <form @submit.prevent="submit">
          <div>
            <label class="ta-l col-form-label col-form-label-sm" for="username"
              >Usuario:</label
            ><input
              v-model="this.message.username"
              id="username"
              type="username"
              class="form-control"
            />
          </div>
          <div>
            <label class="ta-l col-form-label col-form-label-sm" for="message"
              >Mensaje:</label
            ><input
              v-model="this.message.message"
              id="message"
              type="message"
              class="form-control"
            />
          </div>
        </form>

        <button
          @click="addMessage()"
          class="btn btn-success btn-sm"
          type="button"
        >
          <i class="fas fa-plus" _mstvisible="2"></i> Agregar Mensaje
        </button>
      </div>
    </div>
    <h1>Mensajes</h1>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        {{ message }}
      </li>
    </ul>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { createMensaje } from "@/services/almaycru/ChatService";
import Pusher from "pusher-js";

export default {
  name: "App",

  components: {
    // Filters,
    Navbar,
  },

  data() {
    return {
      messages: [] as any,
      message: {},
    };
  },

  methods: {
    async addMessage() {
      try {
        const res = await createMensaje(this.message);
        // this.messages.push("Cómo Estás?");
      } catch (error) {
        // console.error(error);
      }
    },
  },

  mounted() {
    // Start pusher subscribe
    var pusher = new Pusher("d7b50b87118775ed0b11", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data: any) => {
      this.messages.push(JSON.stringify(data));
    });
    // End pusher subscribe
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
}
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
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

/* .grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto auto;
  gap: 1em;
  grid-template-areas:
    "filters filters filters filters filters filters filters"
    "reportes reportes reportes reportes reportes reportes reportes";
} */

/* .grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
  border-radius: 7px;
} */

.grid .reportes {
  grid-area: reportes;
  background-color: rgb(255, 255, 255);
  border-radius: 7px;
  padding-top: 20px;
}
</style>
