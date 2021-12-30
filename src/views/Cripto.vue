<template>
  <div>
    <v-row>
      <v-col cols="1">
        <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/09/Cryptocurrency-Bitcoin-PNG-1024x350.png" alt="" width="300">
      </v-col>
      <h1 class="mx-auto mt-9">
        DIGITE ABAIXO A SIGLA DA MOEDA DESEJADA, COMPARE E CONFIRA SUAS
        ALTERAÇÕES
      </h1>
      <v-col cols="6" class="">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-text-field
              v-model="sigla"
              :rules="nameRules"
              label="Sigla da moeda"
              required
              prepend-icon="mdi-bitcoin"
            ></v-text-field>

            <v-text-field
              v-model.lazy="higher"
              label="Maior Preço nas ultimas 24hrs"
              v-money="money"
              v-if="mostrar"
            ></v-text-field>

            <v-text-field
              v-model.lazy="lower"
              label="Menor Preço nas últimas 24hrs"
              v-money="money"
              v-if="mostrar"
            ></v-text-field>

            <v-text-field
              v-model.lazy="qtde"
              label="Quantidade negociada nas últimas 24hrs"
              v-money="money"
              v-if="mostrar"
            >
            </v-text-field>

            <v-text-field
              v-model="price"
              label="Preço unitário da ultima negociação"
              v-money="money"
              v-if="mostrar"
            ></v-text-field>

            <v-text-field
              v-model="maiorOferta"
              label="Maior preço de oferta nas últimas 24hrs"
              v-money="money"
              v-if="mostrar"
            ></v-text-field>

            <v-text-field
              v-model="menorOferta"
              label="Menor preço de oferta nas últimas 24hrs"
              v-money="money"
              v-if="mostrar"
            ></v-text-field>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-text-field
              v-model="sigla2"
              :rules="nameRules"
              label="Sigla da moeda"
              required
              prepend-icon="mdi-bitcoin"
            ></v-text-field>

            <v-text-field
              v-model.lazy="higher2"
              label="Maior Preço nas ultimas 24hrs"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>

            <v-text-field
              v-model="lower2"
              label="Menor Preço nas últimas 24hrs"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>

            <v-text-field
              v-model="qtde2"
              label="Quantidade negociada nas últimas 24hrs"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>

            <v-text-field
              v-model="price2"
              label="Preço unitário da ultima negociação"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>

            <v-text-field
              v-model="maiorOferta2"
              label="Maior preço de oferta nas últimas 24hrs"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>

            <v-text-field
              v-model="menorOferta2"
              label="Menor preço de oferta nas últimas 24hrs"
              v-money="money"
              v-if="mostrar2"
            ></v-text-field>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        color="primary"
        elevation="2"
        outlined
        plain
        raised
        class="ml-12"
        @click="getMoeda"
      >
        Compare
      </v-btn>
      <v-btn
        color="red"
        elevation="2"
        outlined
        plain
        raised
        class="ml-12"
        @click="recarregar"
      >
        RESET
      </v-btn>
    </v-row>
  </div>
</template>
<script>
import { VMoney } from "v-money";
export default {
  data: () => ({
    mostrar: false,
    mostrar2: false,
    valid: true,
    sigla: "",
    higher: "",
    lower: "",
    qtde: "",
    price: "",
    maiorOferta: "",
    menorOferta: "",
    sigla2: "",
    higher2: "",
    lower2: "",
    qtde2: "",
    price2: "",
    maiorOferta2: "",
    menorOferta2: "",
    nameRules: [(v) => !!v || "Sigla obrigatória"],

    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 8,
      masked: true /* doesn't work with directive */,
    },
  }),

  methods: {
    async getMoeda() {
      if (this.sigla != "" && this.sigla2 != "") {
        try {
          const response = await fetch(
            `https://www.mercadobitcoin.net/api/${this.sigla}/ticker/`
          );
          if (!response.ok) throw new Error("Erro na requisição");
          const json = await response.json();
          this.higher = parseFloat(json.ticker.high.replace(".", ""));
          this.lower = parseFloat(json.ticker.low.replace(".", ""));
          this.qtde = parseFloat(json.ticker.vol.replace(".", ""));
          this.price = parseFloat(json.ticker.last.replace(".", ""));
          this.maiorOferta = parseFloat(json.ticker.buy.replace(".", ""));
          this.menorOferta = parseFloat(json.ticker.sell.replace(".", ""));
          this.mostrar = true;
          console.log(this.higher);
        } catch (error) {
          window.alert("Sigla invalida");
        }
        this.getMoeda2();
      } else {
        window.alert("Sigla invalida");
      }
    },

    async getMoeda2() {
      console.log("cheguei");
      try {
        const response = await fetch(
          `https://www.mercadobitcoin.net/api/${this.sigla2}/ticker/`
        );
        if (!response.ok) throw new Error("Erro na requisição");
        const json = await response.json();
        console.log(json);
        this.higher2 = parseFloat(json.ticker.high.replace(".", ""));
        this.lower2 = parseFloat(json.ticker.low.replace(".", ""));
        this.qtde2 = parseFloat(json.ticker.vol.replace(".", ""));
        this.price2 = parseFloat(json.ticker.last.replace(".", ""));
        this.maiorOferta2 = parseFloat(json.ticker.buy.replace(".", ""));
        this.menorOferta2 = parseFloat(json.ticker.sell.replace(".", ""));
        this.mostrar2 = true;
      } catch (error) {
        window.alert("Sigla invalida");
      }
    },

    recarregar(){
      window.location.reload()
    }
  },
  directives: { money: VMoney },
};
</script>

<style scoped>
h1 {
  font: bold;
  text-align: center;
}
template{
  background-color: green;
}
</style>
