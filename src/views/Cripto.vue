<template>
  <div>
    <v-img
    background-size:
    cover
    src="https://img.freepik.com/vetores-gratis/fundo-rosa-claro-com-formas-abstratas-dinamicas_1393-230.jpg?size=626&ext=jpg"
    >
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
              :label= titulos[i]
              v-for="(valor, i) in valores"
              :key="i"
              v-money="money"
              v-model="valores[i]"
            ></v-text-field>

            <v-text-field
              label="Quantidade negociada nas últimas 24 horas."
              v-model="qtde"
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
              v-for="(valor, i) in valores2"
              :key="i"
              v-money="money"
              v-model="valores2[i]"
            ></v-text-field>
             <v-text-field
              :label= titulos[i]
              v-for="(valor, i) in valores3"
              :key="i"
              v-money="money"
              v-model="valores3[i]"
            ></v-text-field>

            <v-text-field
              label="Quantidade negociada nas últimas 24 horas."
              v-model="qtde2"
              v-if="mostrar2"
            >

            </v-text-field>

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
    </v-img>
  </div>
</template>
<script>
import { VMoney } from "v-money";
export default {
  data: () => ({
    valid: true,
    sigla: "",
    valores:{},
    titulos:{0: "Maior preço nas últimas 24hrs",
            1: "Menor preço nas últimas 24 hrs",
            2: "Preço unitário na última negociação",
            3: "Maior preço de oferta nas últimas 24hrs",
            4: "Menor preço de oferta nas últimas 24hrs" 
            },
    sigla2: "",
    valores2:{},
    valores3:{},
    qtde:"",
    qtde2:"",
    mostrar: false,
    mostrar2: false,
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
          this.valores[0] = parseFloat(json.ticker.high.replace(".", ""));
          this.valores[1] = parseFloat(json.ticker.low.replace(".", ""));
          this.valores[2] = parseFloat(json.ticker.last.replace(".", ""));
          this.valores[3] = parseFloat(json.ticker.buy.replace(".", ""));
          this.valores[4] = parseFloat(json.ticker.sell.replace(".", ""));
          this.qtde = json.ticker.vol;
          this.mostrar  = true;
        } catch (error) {
          window.alert("Sigla invalida");
        }
        this.getMoeda2();
      } else {
        window.alert("Sigla invalida");
      }
    },

    async getMoeda2() {
      try {
        const response = await fetch(
          `https://www.mercadobitcoin.net/api/${this.sigla2}/ticker/`
        );
        if (!response.ok) throw new Error("Erro na requisição");
        const json = await response.json();
        this.valores3[0] = parseFloat(json.ticker.high.replace(".", ""));
        this.valores3[1] = parseFloat(json.ticker.low.replace(".", ""));
        this.valores3[2] = parseFloat(json.ticker.last.replace(".", ""));
        this.valores3[3] = parseFloat(json.ticker.buy.replace(".", ""));
        this.valores3[4] = parseFloat(json.ticker.sell.replace(".", ""));
        this.qtde2 = json.ticker.vol;
        this.valores2 = true;
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
</style>
