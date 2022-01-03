<template>
  <div>
    <!-- lembre daqui -->
    <v-card>
      <v-tabs color="deep-purple accent-4" right v-model="activetab">
        <v-tab v-for="(genre, i) in genres" :key="i" value="genre.name">
          {{ genre.name }}
        </v-tab>
      </v-tabs>
    </v-card>
    <!-- lembre daqui -->
    <v-sheet class="mx-auto" elevation="8">
      <v-slide-group v-model="active_card" class="pb-2" mandatory show-arrows>
        <v-slide-item
          v-for="(
            {
              poster_path,
              title,
              vote_average,
              vote_count,
            },
            i
          ) in titles[activetab].titles"
          :key="i"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-2 overflow-hidden"
            height="700"
            width="500"
            :img="image_url + poster_path"
            @click="toggle"
            @click.stop="teste"
          >
            <v-dialog v-model="dialog" scrollable fullscreen hide-overlay>

              <v-card height="500" :img="image_url + movie.backdrop_path">
                <v-btn icon dark @click="closedialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title color="black">{{
                  movie.original_title
                }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text color="black">{{ movie.overview }}</v-card-text>
              </v-card>
            </v-dialog>

            <!-- <v-img height="500" :src="image_url + poster_path"> </v-img> -->
            <v-card-title>{{ title }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
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
                <v-spacer></v-spacer>
                <div class="grey--text ms-4">({{ vote_count }})</div>
              </v-row>
              <v-row>
                <v-divider></v-divider>
              </v-row>

              <!-- <v-row class="mx-2">
                <div>{{ overview }}</div>
              </v-row> -->
            </v-card-text>

            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon v-if="active" color="white" size="48"></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data: () => ({
    api_key: "95c87027a6f3b35fd5da614eae4f7151",
    base_url: "https://api.themoviedb.org/3/",
    image_url: "https://image.tmdb.org/t/p/original",
    genres: [],
    titles: {},
    movie: {},
    activetab: "0",
    active_card: "",
    active: true,
    dialog: false,
  }),
  methods: {
    async getGenres() {
      const url_genres = `${this.base_url}genre/movie/list?api_key=${this.api_key}`;
      const res = await fetch(url_genres);
      const genres = await res.json();

      return genres.genres;
    },
    async teste() {
      
      const { id } = this.titles[this.activetab].titles[this.active_card];

      const url_movie = `${this.base_url}movie/${id}?api_key=${this.api_key}&language=en-US`;

      const res = await fetch(url_movie);
      const movie = await res.json();
      this.movie = movie;
      this.dialog = true
      console.log("abriu")
    },
    closedialog(){
      this.dialog = false;
    }
  },
  mounted() {
    this.getGenres().then((v) => (this.genres = v));
    this.getGenres().then((v) =>
      Promise.all(
        v.map(async ({ id, name }) => {
          const url_titles = `${this.base_url}discover/movie?api_key=${this.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`;
          let res = await fetch(url_titles);
          let titles = await res.json();
          return {
            name: name,
            titles: titles.results,
            id: id,
          };
        })
      ).then((v) => (this.titles = { ...v }))
    );
  },
};
</script>

