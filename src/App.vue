<template>
  <v-app>
      <v-app-bar app dark>
         <router-link class="home--link" to="/">
        <v-toolbar-title>
          Desafio Vue + Vuetify</v-toolbar-title
        >
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.path"
        >
          {{ link.label }}
        </v-btn>
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
  data: function() {
    return {
    items: [
      { title: "Cripto", icon: "mdi-view-dashboard" },
      { title: "Team", icon: "mdi-account-box" },
      { title: "Projects", icon: "mdi-gavel" },
    ],
    links: [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Cripto",
        path: "/cripto",
      },
      {
        label: "Streaming",
        path: "/streaming",
      },
      {
        label: "Pokedex",
        path: "/pokedex"
      },
      {
        label: "Movies",
        path: "/movies"
      },
      {
        label: "Got",
        path: "/got"
      }
    ],
    }
  }
};
</script>

<style scoped>
  .home--link {
    text-decoration: none;
    color: white;
}

</style>