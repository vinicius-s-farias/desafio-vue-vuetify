<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-bind="team" v-for="person in newTeam" :key="person.name">
        <v-card text class="text-xs-center ma-3">
          <v-responsive class="pt-4">
              <v-avatar size="100">
                  <img :src="person.link">
              </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ person.name }}</div>
            <div class="grey--text">{{ person.name }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="grey">
              <v-icon small left> message</v-icon>
              <span> Message </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      userNames: [
        "guuicarl",
        "julianasm",
        "banzak1",
        "pauleramdf",
        "vinicius-s-farias",
      ],
      avatarLink: "",
      newTeam: [],
    };
  },
  mounted() {
    this.loadAvatar();
  },
  methods: {
    loadAvatar() {
      let avatarLink;
      const team = [
        { name: "Guilherme Carlos", role: "Dev", link: ''},
        { name: "Juliana Souza", role: "Dev", link: ''},
        { name: "Leo Santana", role: "Dev", link: ''},
        { name: "Paulo Fernandes", role: "Dev", link: ''},
        { name: "Vinicius Farias", role: "Dev", link: ''},
      ];
      for (let i = 0; i < this.userNames.length; i++) {
        axios
          .get(`https://api.github.com/users/${this.userNames[i]}`)
          .then((response) => {
            avatarLink = response.data.avatar_url;
            team[i].link = avatarLink
            console.log(team[i].link)
          }).catch((e) => {
            console.log(e, 'erro')
          });
      }
      this.newTeam = team;
    },
  },
};
</script>
