<template>
  <div class="Projects">
    <v-app id="inspire">
      <v-container class="#CFD8DC">
        <v-spacer></v-spacer>
        <v-layout row align="center" justify="center">
          <v-flex xs5 md6>
            <v-btn outline block @click="getHouse" dark>Houses</v-btn>
          </v-flex>
          
          <v-flex xs6 md6>
            <v-btn outline block @click="getPerson" color="grey"
              >Characters</v-btn
            >
          </v-flex>
        </v-layout>
        <v-row align="center" justify="center">
          <v-col  cols="6" >
            <v-card
              flat
              class="pa-2"
              outlined tile
              v-for="(casa, i) in casas"
              :key="i"
              color="#90A4AE"
            >
              <v-spacer></v-spacer>
              <v-layout :class="`pa-3 casa ${casa.name}`">
                <v-flex xs6 md6>
                  <div class="caption black--text">House Name</div>
                  <div>{{ casa.name }}</div>
                </v-flex>
                <v-flex xs6 md6>
                  <div class="caption black--text">Region Name</div>
                  <div>{{ casa.region }}</div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card>
          </v-col>

          <v-col  cols="6">
            <v-card
              flat
              class="pa-2"
              outlined tile
              v-for="(personagem, i) in personagens"
              :key="i"
              color="#B0BEC5"
            >
              <v-layout :class="`pa-3 personagem ${personagem.name}`">
                <v-flex xs6 md6>
                  <div dark class="caption black--text">Characters</div>
                  <div>{{ personagem.name }}</div>
                </v-flex>
                <v-flex xs6  md6>
                  <div class="caption black--text">Title</div>
                  <div>{{ personagem.titles }}</div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    casas: [],
    personagens: [],
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

class="grey lighten-2 fill-height d-flex flex-column justify-center align-center