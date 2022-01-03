<template>
  <div id="inspire">
    <v-img
      background-size:
      cover
      src="https://s1.1zoom.me/big3/533/Game_of_Thrones_8_Sitting_Three_3_562310_3840x2160.jpg"
    >
      <v-container>
        <v-card justify="center" align="center" class="back-card">
          <h1 class="mx-auto mt-7" justify="center">Who you are in G.O.T ??</h1>
          <v-row justify="space-around">
            <v-col cols="6" md="4">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outline
                    block
                    dark
                    color="#424242"
                    v-bind="attrs"
                    v-on="on"
                    >Choose your House</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="#757575" dark>
                      <v-toolbar-title dark align="center">What Your 's House</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form class="px-3">
                        <v-text-field
                         prepend-icon="mdi-castle"
                          dakr
                          label="House"
                          v-model="nameH"
                        >
                        </v-text-field>
                        <v-text-field
                         prepend-icon="mdi-map-search"
                          label="Region"
                          v-model="region"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn
                        flat
                        class="sucsses mx-0 mt-3"
                        justify="left"
                        @click="getHouse"
                        >Chose</v-btn
                      >
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
            <v-col cols="6" md="4">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outline
                    block
                    dark
                    color="#424242"
                    v-bind="attrs"
                    v-on="on"
                    >Choose your Characters</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="#757575">
                      <v-toolbar-title dark
                        >Who your's Characters</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-card-text>
                      <v-form class="px-3">
                        <v-text-field
                          label="Personagem"
                          v-model="nameC"
                          prepend-icon="mdi-human-greeting"
                        ></v-text-field>
                        <v-text-field
                          label="Title"
                          v-model="title"
                          prepend-icon="mdi-medal"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn
                        flat
                        class="sucsses mx-0 mt-3"
                        justify="left"
                        @click="getPerson"
                        >Chose</v-btn
                      >
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
            <v-col cols="6" md="4">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    ooutline
                    block
                    dark
                    color="#424242"
                    v-bind="attrs"
                    v-on="on"
                    >Choose your Book</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="#757575">
                      <v-toolbar-title dark
                       prepend-icon="mdi-book-open-variant"
                      >What Your 's Book !!</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form class="px-3">
                        <v-text-field
                         prepend-icon="mdi-book-open-variant"
                          label="Book Name"
                          v-model="book"
                          
                        ></v-text-field>
                        <v-text-field
                         prepend-icon="mdi-book-open-variant"
                          label="Author"
                          v-model="author"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn
                        flat
                        class="sucsses mx-0 mt-3"
                        justify="left"
                        @click="getBook"
                        >Chose</v-btn
                      >
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-img>
  </div>
</template>

<script>
export default {
  data: () => ({
    region: "",
    nameH: "",
    nameC: "",
    title: "",
    author: "",
    book: "",
  }),
  methods: {
    async getHouse() {
      let info;
      const i = Math.floor(Math.random() * 378);
      const data = await fetch(`https://anapioficeandfire.com/api/houses/${i}`);
      info = await data.json();
      this.nameH = info.name;
      this.region = info.region;
    },

    async getPerson() {
      let info;
      const i = Math.floor(Math.random() * 583);
      const D = await fetch(
        `https://anapioficeandfire.com/api/characters/${i}`
      );
      info = await D.json();
      this.nameC = info.name;
      this.title = info.titles;
    },
    async getBook() {
      let info;
      const i = Math.floor(Math.random() * 12);
      const D = await fetch(`https://anapioficeandfire.com/api/books/${i}`);
      info = await D.json();
      this.author = info.authors;
      this.book = info.name
    },
  },
};
</script>

<style>
.back {
  background-image: url("https://s1.1zoom.me/big3/533/Game_of_Thrones_8_Sitting_Three_3_562310_3840x2160.jpg");
  background-size: cover;
}

.back-card {
  background-image: url("https://s1.1zoom.me/big3/533/Game_of_Thrones_8_Sitting_Three_3_562310_3840x2160.jpg");
  background-size: cover;
}
h1 {
  color: white;
  font-family: Comic Sans MS, Comic Sans, cursive;
  font-size: 60px;
  font-weight: 600;
  margin-top: 1px;
  margin-bottom: 1px;
  text-align: center;
}

</style>

