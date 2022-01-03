<template>
  <div>
    <v-card class="pa-2">
      <v-row>
        <v-col cols="10">
          <v-tabs color="deep-purple accent-4" right v-model="activetab">
            <v-tab v-for="(genre, i) in genres" :key="i" value="genre.name">
              {{ genre.name }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col>
          <v-text-field
            hide-details
            append-icon="mdi-magnify"
            single-line
            outlined
            rounded
            v-model="search"
            placeholder="Buscar um filme"
            @click:append="teste"
            @keydown.enter="teste"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-sheet class="mx-auto" elevation="8">
      <v-slide-group v-model="active_card" class="pb-2" mandatory show-arrows>
        <v-slide-item
          v-for="(
            { poster_path, title, vote_average, vote_count }, i
          ) in titles[activetab].titles"
          :key="i"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-2 overflow-hidden"
            height="700"
            width="500"
            @click="toggle"
            @click.stop="opendialog"
          >
            <v-img
              :src="image_url + poster_path"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="700px"
            >
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
              </v-card-text>
            </v-img>
            <v-dialog v-model="dialog" scrollable hide-overlay >
              <v-card>
                <v-row>
                  <v-col cols="12">
                    <v-card >
                      <v-img
                        :src="image_url + movie.backdrop_path"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
                        height="500"
                      >
                        <v-card-title color="black">
                          {{ movie.original_title }}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text color="black">
                          {{ movie.overview }}
                        </v-card-text>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                  
                    <v-sheet class="mx-auto" elevation="8">
                    
                      <v-slide-group class="pb-2" mandatory show-arrows>
                        
                        <v-slide-item
                          v-for="(
                            { poster_path, original_title }, i
                          ) in similar"
                          :key="i"
                        >
                          <v-card
                            class="ma-2 overflow-hidden"
                            height="400"
                            width="250"
                          >
                            <v-img
                              :src="image_url + poster_path"
                              class="white--text align-end"
                              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                              height="400px"
                            >
                              <v-card-title>{{ original_title }}</v-card-title>
                            </v-img>
                          </v-card>
                        </v-slide-item>
                      </v-slide-group>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
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
    similar: [],
    activetab: "0",
    active_card: "",
    active: true,
    dialog: false,
    search: "",
  }),
  methods: {
    async getGenres() {
      const url_genres = `${this.base_url}genre/movie/list?api_key=${this.api_key}`;
      const res = await fetch(url_genres);
      const genres = await res.json();

      return genres.genres;
    },
    async opendialog() {
      const { id} = this.titles[this.activetab].titles[this.active_card];

      const url_movie = `${this.base_url}movie/${id}?api_key=${this.api_key}&language=en-US`;
      const url_similar = `${this.base_url}/movie/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`;
      
      let res = await fetch(url_similar);
      const similar = await res.json();

      res = await fetch(url_movie);
      const movie = await res.json();

      console.log(similar)

      this.similar = similar.results;
      this.movie = movie;
      this.dialog = true;
    },
    async teste() {
      const url_search = `${this.base_url}search/movie?api_key=${this.api_key}&language=en-US&query=${this.search}&page=1&include_adult=false`;
      const res = await fetch(url_search);
      const search = await res.json();

      if (search.results.length > 0) {
        this.movie = search.results[0];
        this.similar = search.results;
        this.dialog = true;
      } else {
        console.log("sem resultados");
      }
    },
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

