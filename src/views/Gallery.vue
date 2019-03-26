<template>
  <Layout>
    <v-snackbar v-model="snack">Se envio correctamente tu imagen</v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Subir Fotografia</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" class="py-4" style="height:250px" v-if="imageUrl">
                <v-text-field
                  label="Seleccionar Imagen"
                  @click="pickFile"
                  v-model="imageName"
                  prepend-icon="attach_file"
                  readonly
                  v-validate="'required'"
                  data-vv-name="img"
                  :error-messages="errors.collect('img')"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="nameG"
                  label="Nombre*"
                  v-validate="'required|max:150'"
                  :counter="150"
                  data-vv-name="name"
                  :error-messages="errors.collect('name')"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="descriptionG"
                  label="Comentario*"
                  v-validate="'required|max:500'"
                  :counter="500"
                  data-vv-name="description"
                  :error-messages="errors.collect('description')"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Campos requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close()">Cerrar</v-btn>
          <v-btn color="blue darken-1" flat @click="save()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="pt-5 upload">
      <v-layout row wrap justify-center align-center py-5 class="upload-ly">
        <v-flex xs12 md4 lg4 xl4 mx-4 text-xs-center text-md-center text-lg-left text-xl-left>
          <strong
            class="headline font-weight-light"
          >Tienes alguna fotografia en nuestro establecimiento que te gustaria compartir.</strong>
        </v-flex>
        <v-flex xs12 md2 lg2 xl2 mx-4 text-xs-center class="btn-upload">
          <v-btn large color="red" dark round @click="dialog = true">Subir Imagen</v-btn>
        </v-flex>
      </v-layout>
    </div>

    <v-carousel hide-controls>
      <v-carousel-item v-for="(item,i) in gallery" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    <masonry
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
      class="pa-5"
    >
      <div v-for="(item, index) in images" :key="index">
        <figure class="pa-2">
          <img :src="item.url" alt class>
          <v-layout wrap py-3>
            <v-flex xs12 mb-3>
              <strong class="title font-weight-regular">{{item.name}}</strong>
            </v-flex>
            <v-flex xs12>
              <span class="body-2 font-weight-thin">{{item.description}}</span>
            </v-flex>
          </v-layout>
        </figure>
      </div>
    </masonry>
  </Layout>
</template>

<script>
import Layout from "../components/Layout";
import GalleryRepository from "@/repository/galleries";
import UploadImages from "@/utils/upload_images";

export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      snack: false,
      nameG: "",
      descriptionG: "",
      dialog: false,
      gallery: [],
      imageName: "",
      imageUrl: "",
      imageFile: "",
      images: [],

      dictionary: {
        custom: {
          img: {
            required: () => "La imagen no puede ir vacía"
            // custom messages
          },
          name: {
            required: () => "El Nombre no puede estar vacío",
            max: "El nombre no puede ser mayor a 150 caracteres"
            // custom messages
          },
          description: {
            required: () => "El Comentario no puede estar vacío",
            max: "La descripcion no puede ser mayor a 500 caracteres"
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
    },
    close() {
      this.dialog = false;
      this.nameG = "";
      this.descriptionG = "";
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
    },
    save() {
      this.$validator.validateAll().then(response => {
        if (response) {
          UploadImages(this.imageUrl, "promosimgs").then(response => {
            console.log("Response image", response);
            GalleryRepository.create({
              url: response.url,
              name: this.nameG,
              description: this.descriptionG
            })
              .then(resp => {
                console.log("Data app user: ", resp);
                this.images.push(resp);
                this.snack = true;
                this.close();
              })
              .catch(err => {
                this.close();
                console.log(err);
              });
          });
        }
      });
    }
  },
  mounted: function() {
    this.$validator.localize("en", this.dictionary);

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
    GalleryRepository.index()
      .then(resp => {
        console.log("Resp", resp);
        this.images = resp.results;
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