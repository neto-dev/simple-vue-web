<template>
  <Layout>
    <v-layout class="background-img" align-center="" pa-1>
      <v-flex xs12 md9 lg5 xl5>
        <h1 class="color-white display-1 pa-3">¿Que se te antoja? nuestras tradicionales “Tortas Ahogadas” el famoso “Caldillo Durangueño” o nuestro exquisito “Plato Mexicano“</h1>
        <h1 class="color-white title-hide pa-3">¿Que se te antoja? nuestras tradicionales “Tortas Ahogadas”</h1>
      </v-flex>
    </v-layout>
    <article class="text-xs-center my-4 py-5">
      <h1 class="display-2">Los recomendados</h1>
      <v-layout mt-3 row wrap justify-center="">
        <v-flex ma-3 xl3 lg3 md3 sm12 xs12 ma-1 text-xs-center>
          <figure>
            <img src="../assets/r1.jpg" alt="">
          </figure>
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et ea vero libero soluta, laudantium nostrum quisquam impedit ad aliquid molestiae eaque illo expedita deleniti, suscipit voluptatibus corrupti ab ipsum?</p> -->
        </v-flex>
        <v-flex ma-3 xl3 lg3 md3 sm12 xs12 ma-1 text-xs-center>
          <figure>
            <img src="../assets/r2.jpg" alt="">
          </figure>
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et ea vero libero soluta, laudantium nostrum quisquam impedit ad aliquid molestiae eaque illo expedita deleniti, suscipit voluptatibus corrupti ab ipsum?</p> -->
        </v-flex>
        <v-flex ma-3 xl3 lg3 md3 sm12 xs12 ma-1 text-xs-center>
          <figure>
            <img src="../assets/r3.jpg" alt="">
          </figure>
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et ea vero libero soluta, laudantium nostrum quisquam impedit ad aliquid molestiae eaque illo expedita deleniti, suscipit voluptatibus corrupti ab ipsum?</p> -->
        </v-flex>
      </v-layout>
    </article>
  </Layout>
</template>

<script>
import Layout from "../components/Layout";

export default {
  data() {
    return {};
  },
  components: {
    Layout
  }
};
</script>

<style>
.background-img {
  height: 500px;
  background: url('~@/assets/header-bg.jpg') no-repeat center center ;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.title-hide{
  display: none;
}

.color-white{
  color: white;
}

@media only screen and (max-width: 700px) {
  .display-1 {
    display: none;
  }
  .title-hide{
    display: block;
    font-size: 33px;
  }
  .display-2 {
    font-size: 35px !important;
  }
}
</style>