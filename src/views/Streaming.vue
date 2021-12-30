<template>
  <v-container>
    <v-card class="pa-md-16 mx-lg-auto">
      <v-card-title>
        Descubra onde assistir seu filme ou série favoritos
      </v-card-title>
      <v-form>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Título"
              v-model="title"
              required
              @blur="checkForm"
            >
              >
            </v-text-field>
            <v-alert
              v-if="erro != ''"
              :type="alertType"
              color="red lighten-2"
            >
            Título não encontrado, tente novamente
            </v-alert>
            <v-btn label="Pesquisar" @click="getId"> Pesquisar </v-btn>
          </v-col>
          <v-card-text> Onde assistir: </v-card-text>
          <v-col cols="6">
            <v-text-field prepend-icon="mdi-laptop" label="Web" v-model="webUrl"></v-text-field>
            <v-btn v-if="exibirWeb" v-bind:href="webUrl"> Acessar </v-btn>
            <v-spacer></v-spacer>
            <v-text-field prepend-icon="mdi-apple" label="iOS" v-model="iosUrl"></v-text-field>
            <v-btn v-if="exibirIos" v-bind:href="iosUrl"> Acessar </v-btn>
            <v-spacer></v-spacer>
            <v-text-field prepend-icon="mdi-android" label="Android" v-model="androidUrl"></v-text-field>
            <v-btn v-if="exibirAndroid" v-bind:href="androidUrl">
              Acessar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      title: "",
      API_KEY: "j6jiHjylx8oFwsqwo0OglkaaFekIzE7ZT4R0ZjIl",
      id: "",
      webUrl: "",
      iosUrl: "",
      androidUrl: "",
      exibirWeb: false,
      exibirIos: false,
      exibirAndroid: false,
      erro: "",
      alertType: "",
    };
  },
  methods: {
    getTitle(id) {
      this.erro = ''
      console.log(id);
        axios
          .get(
            `https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${this.API_KEY}`
          )
          .then((response) => {
            this.androidUrl = response.data[10].android_url;
            if (!this.androidUrl) {
              this.androidUrl = "Indisponível";
            } else {
              this.exibirAndroid = true;
            }
            this.webUrl = response.data[10].web_url;
            if (!this.webUrl) {
              this.webUrl = "Indisponível";
            } else {
              this.exibirWeb = true;
            }
            this.iosUrl = response.data[10].ios_url;
            if (!this.iosUrl) {
              this.iosUrl = "Indisponível";
            } else {
              this.exibirIos = true;
            }
          }).catch((e) => {
            this.erro = e;
            this.alertInput()
          })
      },

    getId() {
      this.erro = ''
      const titleFormat = this.title.replaceAll(" ", "%20");
        axios
          .get(
            `https://api.watchmode.com/v1/search/?apiKey=${this.API_KEY}&search_field=name&search_value=${titleFormat}`
          )
          .then((response) => {
            this.id = response.data.title_results[0].id;
            this.getTitle(this.id);
            console.log(response.data);
          }).catch((e) => {
            this.erro = e;
            this.alertInput()
          })
    },

    checkForm() {
      if (this.title === "") {
        this.webUrl = "";
        this.exibirWeb = false;
        this.iosUrl = "";
        this.exibirIos = false;
        this.androidUrl = "";
        this.exibirAndroid = false;
      }
    },

    alertInput() {
      if (this.erro != ''){
        this.alertType = 'error'
      }
    }
}
}

</script>
