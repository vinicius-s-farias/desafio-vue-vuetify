<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Desafio Vue + Vuetify</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="primary lighten-1" padless>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {

  },
}
</script>
