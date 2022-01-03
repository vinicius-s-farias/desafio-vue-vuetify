<template>
  <div class="Projects">
    <v-card>
      <v-tabs color="#64FFDA">
        <v-row justify="space-around">
          <v-col cols="6" md="4">
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn outline block color="primary" v-bind="attrs" v-on="on">Houses</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Who Your 's House</v-toolbar>
                  <v-card-text >
                    <v-form class="px-3"
                     >
                      <v-text-field
                        label="House"
                        prepend-icon=""
                      >
                      </v-text-field>
                      <v-text-field v-for="(casa, i) in casas"
                        :key="i" :value="casa.region"
                        label=""
                        v-model="nameH"
                        prepend-icon=""
                      >{{casa.region}}</v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-space-between">
                    <v-btn  flat class="sucsses mx-0 mt-3" justify="left"
                    @click="getHouse">Chose</v-btn>
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
          <v-col cols="6" md="4">
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn outline block color="primary" v-bind="attrs" v-on="on">Characters</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Who Your 's Characters</v-toolbar>
                  <v-card-text>
                    <v-form class="px-3">
                      <v-text-field
                        label="Personagem"
                        prepend-icon=""
                      ></v-text-field>
                      <v-text-field
                        label="Title"
                        v-model="title"
                        prepend-icon=""
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-space-between">
                    <v-btn flat class="sucsses mx-0 mt-3" justify="left" @click="getPerson" >Chose</v-btn>
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
          <v-col cols="6" md="4">
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn  outline block color="primary" v-bind="attrs" v-on="on">Book</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Who Your 's Book</v-toolbar>
                  <v-card-text>
                    <v-form class="px-3">
                      <v-text-field
                        label="title"
                      
                        prepend-icon=""
                      ></v-text-field>
                      <v-text-field
                        label="information"
                        v-model="content"
                        prepend-icon=""
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-space-between">
                    <v-btn flat class="sucsses mx-0 mt-3" justify="left">Chose</v-btn>
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-tabs>
    </v-card>
   
    <v-app id="inspire">
      <v-container class="#CFD8DC">
        <v-spacer></v-spacer>
        <v-layout row align="center" justify="center">
          
        </v-layout>
        <v-row align="center" justify="center">
          <!-- <v-col cols="6">
            <v-card
              flat
              class="pa-2"
              outlined
              tile
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
          </v-col> -->

          <!-- <v-col cols="6">
            <v-card
              flat
              class="pa-2"
              outlined
              tile
              color="#B0BEC5"
            >
              <v-layout :class="pa-3 ">
                <v-flex xs6 md6>
                  <div dark class="caption black--text">Characters</div>
                  <div>{{ personagem.name }}</div>
                </v-flex>
                <v-flex xs6 md6>
                  <div class="caption black--text">Title</div>
                  <div>{{ personagem.titles }}</div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card> -->
          <!-- </v-col> -->
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    title: this.title = this.title = [this.personagens.name],
    casas: [],
    personagens: [],
    books: [],
    region: "",
    nameH :"",
    nameC:""
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async getHouse() {
      const i = Math.floor(Math.random() * 378);
      const data = await fetch(`https://anapioficeandfire.com/api/houses/${i}`);
      this.casas.push(await data.json());
      this.nameH = this.casas.name;
      this.region = this.casas.region;
    },

    async getPerson() {
      const i = Math.floor(Math.random() * 583);
      const D = await fetch(
        `https://anapioficeandfire.com/api/characters/${i}`
      );
      this.personagens.push(await D.json());
    },
    async getBook() {
      const i = Math.floor(Math.random() * 12);
      const D = await fetch(`https://anapioficeandfire.com/api/books/${i}`);
      this.books.push(await D.json());
    },  

    
    
  },
};
</script>

<style>
</style>

class="grey lighten-2 fill-height d-flex flex-column justify-center align-center

<v-flex >
            <v-btn class="p -1" outline block @click="getHouse" dark>Houses</v-btn>
            <!-- <v-btn </v-btn
            > -->
            
          </v-flex>
          
           <!-- <v-card>
      <v-tabs color="#64FFDA">
         <v-row>        
      <v-col
       cols="6"
        md="4"
      ><v-flex >
            <v-btn outline block @click="getHouse" dark>Houses</v-btn>
          </v-flex></v-col>
       <v-col
        cols="6"
        md="4"
      ><v-flex >
            <v-btn outline block @click="getPerson" color="grey">Characters</v-btn>
        </v-flex>
            </v-col>     
       <v-col
        cols="6"
        md="4"
      ><v-flex >
            <v-btn outline block @click="getBook" dark>Books</v-btn>
          </v-flex>
      </v-col>
    </v-row>
      </v-tabs>
    </v-card> -->

    <!-- <v-flex >
            <v-btn outline block @click="getHouse" dark>Houses</v-btn>
          </v-flex>
          
          <v-flex >
            <v-btn outline block @click="getPerson" color="grey"
              >Characters</v-btn
            >
          </v-flex> -->