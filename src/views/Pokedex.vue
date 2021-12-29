<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">Pokedex</div>
        <v-list-item-title class="text-h5 mb-1"
          >Nome: {{ pokeName }}</v-list-item-title
        >
        <v-list-item-subtitle>Tipo 1: {{ poketype1 }}</v-list-item-subtitle>
        <v-list-item-subtitle>Tipo 2: {{ poketype2 }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"
        ><img :src="sprite" alt="Pokemon"
      /></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-text-field
        label="Digite o nome do Pokemon"
        @blur="getPoke"
        v-model="pokeSearch"
      >
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    pokeName: "",
    pokeSearch: "",
    poketype1: "",
    poketype2: "",
    sprite: "",
  }),

  methods: {
    async getPoke() {
      const pokeSearch = this.pokeSearch.toLowerCase();

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
        );

        const json = await response.json();
        console.log(json);

        this.pokeName = json.name;

        this.poketype1 = json.types[0].type.name;
        console.log(json.id);
        this.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json.id}.png`;
      } catch (error) {
        this.sprite =
          "https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg";
        this.pokeName = "Pokemon não encontrado!";
        console.log("Erro na requisição");
      }
    },
  },
};
</script>