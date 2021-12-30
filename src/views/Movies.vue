<template>
<div class="about">
  <v-card>
    <v-tabs
      color="deep-purple accent-4"
      right
      v-model="activetab"
    >
      <v-tab         
        v-for="(genre, i) in genres"
        :key="i"
        value="genre.name"
        @click="teste">
        {{genre.name}}
      </v-tab>
    </v-tabs>
  </v-card>
  <v-sheet
    class="mx-auto"
    elevation="8"
    >
    <v-slide-group
      v-model="model"
      class="pb-2"
      mandatory
      show-arrows
    >
    
      <v-slide-item
        v-for="({
            overview,
            poster_path,
            release_date,
            title,
            vote_average,
            vote_count
          }, i) in titles[activetab].titles"
        :key="i"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-2 overflow-hidden"
          height="700"
          width="370"
          @click="toggle"
        >
            <v-img
            height="500"
            :src="image_url + poster_path"
            >
            </v-img>
            <v-card-title>{{title}}</v-card-title>


            <v-card-text  >
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="vote_average"
                    length="10"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                        ({{vote_count}})
                    </div>
                </v-row>
                <v-row class="mx-2">
                    <div class="my-4 text-subtitle-1">
                        {{release_date}}
                    </div>
                </v-row>
                <v-row class="mx-2">
                    <div>{{overview}}</div>
                </v-row>
            </v-card-text>

            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
                <v-scale-transition>
                <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                ></v-icon>
                </v-scale-transition>
            </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>


  <!-- <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card> -->

</div>



</template>

<script>

export default {
  name: 'Movies',
  data: () => ({
    api_key: "95c87027a6f3b35fd5da614eae4f7151",
    base_url: "https://api.themoviedb.org/3/",
    image_url: "https://image.tmdb.org/t/p/original",
    genres: [],
    titles: {},
    activetab: "0",
    model:"",
    active: true,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
  }),
  methods: {
    async getGenres(){
      const url_genres = `${this.base_url}genre/movie/list?api_key=${this.api_key}`;
      const res = await fetch(url_genres);
      const genres = await res.json();
      
      return genres.genres;
    },
    teste(){
        this.active = !this.active;
        console.log("clicouuu ");

    }
  },
  mounted() {
    this.getGenres().then(v => this.genres = v);
    this.getGenres()
      .then(v => Promise.all( v.map((async ({id, name}) => 
      {
        const url_titles = `${this.base_url}discover/movie?api_key=${this.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`;
        let res = await fetch(url_titles);
        let titles = await res.json();
        return {
          name: name,
          titles: titles.results,
          id: id
          }        
      })))
      .then(v => this.titles = {...v}));
    
  },
}
</script>

