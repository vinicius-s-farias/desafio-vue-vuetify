<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="primary" dark>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2"></div>
        </template>
    </v-navigation-drawer>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="subheading green--text"
          >Projects</v-toolbar-title
        >
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
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Team", icon: "mdi-account-box" },
      { title: "Projects", icon: "mdi-gavel" },
    ],
    links: [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Projects",
        path: "/Projects",
      },
      {
        label: "Dashboard",
        path: "/Dashboard",
      },
    ],
    }
  }
};
</script>
