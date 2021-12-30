<template>
  <div class="Projects">
    <v-app id="inspire">
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

      <v-countainer class="my-5">
        <v-layout row class="mb-6">
            <v-btn
              small
              flat
              color="white"
              @click="sortBy('title')"
              slot="activator"
            >
              <v-icon left small>mdi-folder</v-icon>
            </v-btn>
            <v-btn
              small
              flat
              color="grey"
              @click="sortBy('person')"
              slot="activator"
            >
              <v-icon left small>mdi-comment-account</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
        </v-layout>

        <v-card
          flat
          class="pa-3"
          v-for="(casa, i) in casas"
          :key="i"
          color="#90A4AE"
        >
        <v-spacer></v-spacer>
          <v-layout :class="`pa-3 casa ${casa.name}`">
            <v-flex xs6 md6>
              <div class="caption black--text">HOUSE</div>
              <div>{{ casa.name }}</div>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <div class="caption black--text">Region</div>
              <div>{{ casa.region }}</div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
        <v-card
          flat
          class="pa-3"
          v-for="(personagem, i) in personagens"
          :key="i"
          color="#B0BEC5"
        >
          <v-layout row wrap :class="`pa-3 personagem ${personagem.name}`">
            <v-flex xs6 sm6 md6>
              <div dark class="caption black--text">Characters</div>
              <div>{{ personagem.name }}</div>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <div class="caption black--text">Title</div>
              <div>{{ personagem.titles }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-countainer>
      <v-layout row align="center" justify="space-around">
        <v-flex xs5 md3>
          <v-btn @click="getHouse" dark>Houses</v-btn>
        </v-flex>
        <v-flex xs12 md3>
          <v-btn @click="getPerson" color="grey">Characters</v-btn>
        </v-flex>
      </v-layout>

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
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    casas: [],
    personagens: [],

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
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async getHouse() {
      const i = Math.floor(Math.random() * 378);
      const data = await fetch(`https://anapioficeandfire.com/api/houses/${i}`);
      this.casas.push(await data.json());
    },

    async getPerson() {
      const i = Math.floor(Math.random() * 583);
      const D = await fetch(
        `https://anapioficeandfire.com/api/characters/${i}`
      );
      this.personagens.push(await D.json());
    },
  },
};
</script>

<style>

</style>