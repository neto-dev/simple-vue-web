<template>
  <Layout>
    <v-snackbar v-model="snack">Se envio correctamente la reseña</v-snackbar>
    <div class="pt-5 upload" style="background: #ecf0f1">
      <v-layout row wrap justify-center align-center py-5 class="upload-ly">
        <v-flex
          xs12
          md12
          lg12
          xl12
          mx-4
          text-xs-center
          text-md-center
          text-lg-center
          text-xl-center
        >
          <strong
            class="headline font-weight-light"
          >Tienes algun comentario que te gustaria compartir.</strong>
        </v-flex>
        <v-flex xs12 md8 lg6 xl6 ma-4 text-xs-center class="btn-upload">
          <v-layout wrap row>
            <v-flex xs12>
              <v-text-field
                v-model="nameR"
                label="Nombre Completo"
                v-validate="'required|max:150'"
                :counter="150"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="commentR"
                label="Comentario"
                v-validate="'required|max:500'"
                :counter="500"
                data-vv-name="comment"
                :error-messages="errors.collect('comment')"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-rating v-model="rating" background-color="red lighten-3" color="red" x-large></v-rating>
            </v-flex>
            <v-flex text-xs-center my-3>
              <v-btn large color="red" dark round @click="save">Enviar comentario</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <masonry
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
      class="pa-5"
    >
      <div v-for="(item, index) in reviews" :key="index">
        <v-card class="mx-auto my-3" color="#e74c3c" dark max-width="400">
          <v-card-title>
            <span class="title font-weight-light">{{item.name}}</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">{{item.comment}}</v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content>
                <v-rating
                  v-model="item.stars"
                  readonly
                  background-color="white lighten-3"
                  color="white"
                ></v-rating>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </div>
    </masonry>
  </Layout>
</template>

<script>
import Layout from "../components/Layout";
import ReviewRepository from "@/repository/reviews";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      snack: false,
      dialog: false,
      gallery: [],
      rating: 4,
      reviews: [],
      dictionary: {
        custom: {
          name: {
            required: () => "El Nombre no puede estar vacío",
            max: "El nombre no puede ser mayor a 150 caracteres"
            // custom messages
          },
          comment: {
            required: () => "El Comentario no puede estar vacío",
            max: "El comentario no puede ser mayor a 500 caracteres"
            // custom messages
          }
        }
      }
    };
  },
  components: {
    Layout
  },
  methods: {
    clear() {
      this.nameR = "";
      this.commentR = "";
    },
    save() {
      this.$validator.validateAll().then(response => {
        if (response) {
          ReviewRepository.create({
            name: this.nameR,
            comment: this.commentR,
            stars: this.rating
          })
            .then(resp => {
              console.log("Data app user: ", resp);
              this.reviews.push(resp);
              this.snack = true
              this.clear();
            })
            .catch(err => {
              this.clear();
              console.log(err);
            });
        }
      });
    }
  },
  mounted: function() {
    this.$validator.localize("en", this.dictionary);

    ReviewRepository.index()
      .then(resp => {
        console.log("Resp", resp);
        this.reviews = resp.results;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@media only screen and (max-width: 700px) {
  .upload {
    padding-top: 0px !important;
  }
  .upload-ly {
    padding-top: 10px !important;
  }
  .btn-upload {
    margin-top: 20px;
  }
}
</style>