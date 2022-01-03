<template>
<v-img
      background-size:
      cover
      src="https://agrinovusindiana.com/wp-content/uploads/2021/03/Solinftec-Hiring.png"
    >
  <div class="team">
    <v-container>
      <h1 class="subheading grey--text">Equipe</h1>
      <v-spacer></v-spacer>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in newTeam" :key="person.name">
          <v-card text class="text-xs-center ma-3" max-height="300">
            <v-responsive class="pt-4">
              <v-row justify="space-around">
                <v-avatar size="100" class="grey lighten-2 pa-2 ma-4">
                  <img :src="person.link" />
                </v-avatar>
              </v-row>
            </v-responsive>
            <v-card-text >
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         
         rounded
          block
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Envie uma mensagem
        </v-btn>
      </template>
      <v-card >
        <v-textarea label="Envie uma mensagem aos nossos desenvolvedores!">
        </v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</v-img>
</template>


<script>
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
      dialog: false,
      avatarLink: "",
      newTeam: [],
      success: true,
      message: ''
    };
  },
  mounted() {
    this.loadAvatar();
    this.thankAlert();
  },
  methods: {
    loadAvatar() {
      const team = [
        { name: "Guilherme Carlos", role: "Dev", link: "https://avatars.githubusercontent.com/u/91094202?v=4" },
        { name: "Juliana Souza", role: "Dev", link: "https://avatars.githubusercontent.com/u/64979669?v=4 " },
        { name: "Leo Santana", role: "Dev", link: "https://avatars.githubusercontent.com/u/17907755?v=4" },
        { name: "Paulo Fernandes", role: "Dev", link: "https://avatars.githubusercontent.com/u/36416509?v=4" },
        { name: "Vinicius Farias", role: "Dev", link: "https://avatars.githubusercontent.com/u/71359046?v=4" },
      ];
      /*for (let i = 0; i < this.userNames.length; i++) {
        axios
          .get(`https://api.github.com/users/${this.userNames[i]}`)
          .then((response) => {
            avatarLink = response.data.avatar_url;
            team[i].link = avatarLink;
            console.log(team[i].link);
          })
          .catch((e) => {
            console.log(e, "erro"); 
          });
      }*/
      this.newTeam = team;
    },

    thankAlert() {
      this.success = !this.success;
    },
  },
};
</script>
