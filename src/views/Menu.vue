<template>
  <Layout>
    <v-layout row wrap pt-5>
      <v-flex xs12 text-xs-center>
        <h1 class="display-2 font-weight-thin">Conoce nuestro Menú</h1>
      </v-flex>
      <v-flex xs12 md5 lg6 mb-5 my-1>
        <v-expansion-panel popout class="pa-5">
          <v-expansion-panel-content class="expansion" v-for="(item,i) in menuOne" :key="i">
            <template v-slot:header>
              <div class="headline font-weight-thin">{{item.name}}</div>
            </template>
            <v-card>
              <v-card-text v-for="(label,i) in item.labels" :key="i">{{i+1 + ".- " + label.name}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 md5 lg6 mb-5 my-1>
        <v-expansion-panel popout class="pa-5">
          <v-expansion-panel-content class="expansion" v-for="(item,i) in menuTwo" :key="i">
            <template v-slot:header>
              <div class="headline font-weight-thin">{{item.name}}</div>
            </template>
            <v-card>
              <v-card-text v-for="(label,i) in item.labels" :key="i">{{i+1 + ".- " + label.name}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </Layout>
</template>

<script>
import Layout from "../components/Layout";
import DB from "../db/index.js";

export default {
  data() {
    return {
      dialog: false,
      menuOne: [
        {
          name: "Desayunos",
          labels: [
            {
              name: "Molletes con pico de Gallo"
            },
            {
              name: "Molletes especiales"
            },
            {
              name: "Huevos Revueltos"
            },
            {
              name: "Huevos Divorciados"
            },
            {
              name: "Omelette de Champiñones"
            },
            {
              name: "Omelette a la Mexicana"
            },
            {
              name: "Omelette Español"
            },
            {
              name: "Omelette California"
            },
            {
              name: "Huavo Azteca"
            },
            {
              name: "Norteño Machaca"
            },
            {
              name: "Sandwich Especial"
            },
            {
              name: "Chilaquiles con pollo"
            },
            {
              name: "Avena o Cereal con platano"
            },
            {
              name: "Plato de frutas de temporada"
            },
            {
              name: "Yogurth con Frutas"
            },
            {
              name: "Hotcakes"
            },
            {
              name: "Tostadas de Pollo o Deshebrada"
            },
            {
              name: "Tacos Dorados"
            }
          ]
        },
        {
          name: "Especiales",
          labels: [
            {
              name: "Burrito Estilo Gaby"
            },
            {
              name: "Enchiladas Suizas"
            },
            {
              name: "Puntas de filete a la Mexicana"
            },
            {
              name: "Papa asada estilo de los Regios"
            },
            {
              name: "Tampiqueña"
            },
            {
              name: "Chuleta de puerco Adobada"
            },
            {
              name: "Plato Mexicano Mixto"
            }
          ]
        },
        {
          name: "Variedades",
          labels: [
            {
              name: "Burrito de pollo"
            },
            {
              name: "Pechuga en chile chipotle"
            },
            {
              name: "Pechuga Adobada"
            },
            {
              name: "Pechuga Rellena"
            },
            {
              name: "Ensalada con pollo empanizado"
            },
            {
              name: "Tiras de pollo y salsa de queso"
            },
            {
              name: "Alitas de Pollo Adobadas"
            },
            {
              name: "Fajitas de Pollo"
            }
          ]
        },
        {
          name: "Combinaciones",
          labels: [
            {
              name: "Manzana de Arroz"
            },
            {
              name: "Milanesa de pollo"
            },
            {
              name: "Tacos de filete de pescado"
            },
            {
              name: "Pescado Empanizado"
            },
            {
              name: "Camarones Empanizados"
            },
            {
              name: "Camarones al Chipotle"
            },
            {
              name: "Filete de pescado empanizado"
            },
          ]
        },
        {
          name: "Tradicionales",
          labels: [
            {
              name: "Caldillo Durangueño"
            },
            {
              name: "Enchiladas rojas"
            },
            {
              name: "Tacos abiertos de carne"
            },
            {
              name: "Caldo Tlalpeño"
            },
            {
              name: "Chile Relleno"
            },
            {
              name: "Torta Ahogada"
            },
            {
              name: "Enfrijoladas de Pollo"
            },
            {
              name: "Torta de pierna"
            },
          ]
        }
      ],
      menuTwo: [
        {
          name: "Antojitos",
          labels: [
            {
              name: "Burrito de Deshebrada"
            },
            {
              name: "Burrido de chile relleno"
            },
            {
              name: "Torta de Huevo a la mexicana"
            },
            {
              name: "Torta de Jamón"
            },
            {
              name: "Tacos de Carne Asada"
            },
            {
              name: "Tacos de Alambre"
            },
            {
              name: "Tacos de Adobada"
            },
            {
              name: "Hotdog"
            },
            {
              name: "MEGA Hotdog"
            },
            {
              name: "Banderilla"
            },
            {
              name: "Hamburguesa Sencilla"
            },
            {
              name: "Hamburguesa Especial"
            },
          ]
        },
        {
          name: "Menú Infantil",
          labels: [
            {
              name: "Gusanito de papa y jamon"
            },
            {
              name: "Nuggets de Pollo"
            },
            {
              name: "Dedos de queso"
            },
            {
              name: "Barquito de papa"
            },
            {
              name: "Salchipulpos"
            },
          ]
        },
        {
          name: "Cafetería",
          labels: [
            {
              name: "Café"
            },
            {
              name: "Capuchino"
            },
            {
              name: "Capuchino con Sabor"
            },
            {
              name: "Té"
            },
            {
              name: "Té Chai"
            },
          ]
        },
        {
          name: "Bebidas",
          labels: [
            {
              name: "Limonada o Naranjada en vaso"
            },
            {
              name: "Limonada o Naranjada en vaso Mineral"
            },
            {
              name: "Limonada o Naranjada en copa"
            },
            {
              name: "Limonada o Naranjada en copa Mineral"
            },
            {
              name: "Jugo de Naranja"
            },
            {
              name: "Jugo Saludable"
            },
            {
              name: "Licuado de fruta en vaso"
            },
            {
              name: "Licuado de fruta en copa"
            },
            {
              name: "Chocolate caliente"
            },
            {
              name: "Refresco"
            },
            {
              name: "Té Helado"
            },
            {
              name: "Malteada en vaso"
            },
            {
              name: "Malteada en Copa"
            },
          ]
        },
        {
          name: "Postres",
          labels: [
            {
              name: "Helado Sencillo"
            },
            {
              name: "Halado Doble"
            },
            {
              name: "Banana Split"
            },
            {
              name: "Flan"
            },
            {
              name: "Pay de queso"
            },
            {
              name: "Pastel"
            },
            {
              name: "Pastel de Cajeta"
            },
          ]
        }
      ],
      rating: 4,
      images: [
        {
          name: "Ernesto Valenzuela",
          description: "Muy deliciosa la comida 100% recomendada."
        },
        {
          name: "Ernesto Valenzuela",
          description:
            "Muy deliciosa la comida 100% recomendada. Muy deliciosa la comida 100% recomendada."
        }
      ],
      DB: null
    };
  },
  components: {
    Layout
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  },
  mounted: function() {
    this.gallery.push(
      {
        src: require("../assets/g1.jpg")
      },
      {
        src: require("../assets/g2.jpg")
      },
      {
        src: require("../assets/g3.jpg")
      },
      {
        src: require("../assets/g4.jpg")
      }
    );
    console.log("DB", DB);
  }
};
</script>

<style>
.expansion {
  background: white !important;
  margin: 10px !important;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>