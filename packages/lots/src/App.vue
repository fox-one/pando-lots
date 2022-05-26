<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class App extends Vue {}
export default App;
</script>
