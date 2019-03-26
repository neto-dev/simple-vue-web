<template>
  <section>
    <v-snackbar v-model="snack">Se envio correctamente tu mensaje</v-snackbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" @click="$router.push({ name: item.url })">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat color="white">
      <v-toolbar-title class="white--text" style="background:white">
        <figure class="logo">
          <img src="../assets/logo.png" class="title-tool" alt style=" width: 100px">
        </figure>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn large class="btn-menu" flat @click="$router.push({ name: 'home' })">Inicio</v-btn>

      <v-btn large class="btn-menu" flat @click="$router.push({ path: 'galeria' })">Geleria</v-btn>

      <v-btn large class="btn-menu" flat @click="$router.push({ path: 'menu' })">Menú</v-btn>

      <v-btn large class="btn-menu" flat @click="$router.push({ path: 'resenas' })">Reseñas</v-btn>

      <v-btn large class="btn-menu-small" flat icon @click="drawer = true">
        <v-icon large>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <slot/>
    <v-layout style="background: #EFEEED" row wrap>
      <v-flex xs12 md6 lg6 xl6>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7288.326880626649!2d-104.665512!3d24.025301!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bc822102ca6cf%3A0xb3a08ec87afe1640!2sAv+20+de+Noviembre+109%2C+Zona+Centro%2C+34000+Durango%2C+Dgo.!5e0!3m2!1ses-419!2smx!4v1553436599067"
            width="100%"
            height="500"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </div>
      </v-flex>
      <v-flex xs12 md6 lg6 xl6>
        <v-layout justify-center row wrap pa-4>
          <h1 class="mt-4">Envianos algún comentario.</h1>
          <v-flex xs11>
            <v-text-field
              v-model="nameC"
              v-validate="'required|max:150'"
              :counter="150"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              label="Nombre Completo"
            ></v-text-field>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              v-model="emailC"
              v-validate="'required'"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              label="Email"
            ></v-text-field>
          </v-flex>
          <v-flex xs11>
            <v-textarea
              v-model="commentC"
              v-validate="'required|max:500'"
              :counter="500"
              data-vv-name="comment"
              :error-messages="errors.collect('comment')"
              label="Comentario"
            ></v-textarea>
          </v-flex>
          <v-flex xs11>
            <v-btn color="red" round dark @click="send">Enviar</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-footer height="auto">
      <v-card flat tile color="red" class="flex pa-3 lighten-1 white--text text-xs-left">
        <!-- <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>-->

        <v-card-text class="white--text pt-0">
          <strong class="subheading">
            Av. 20 de Noviembre 109 Pte
            Centro Historico
          </strong>
        </v-card-text>
        <v-card-text>
          <strong class="subheading">Tel (618) 8128028</strong>
        </v-card-text>
        <v-card-text>
          <strong class="subheading">Horario; 7:30 AM - 22:00PM</strong>
        </v-card-text>
        <v-card-text>
          <strong class="subheading">Durango, Dgo.</strong>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2019 —
          <strong>Los Manzanos</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </section>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Layout",
  props: {},
  data() {
    return {
      snack: false,
      drawer: false,
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ],
      items: [
        {
          title: "Inicio",
          icon: "home",
          url: "home"
        },
        {
          title: "Galeria",
          icon: "photo",
          url: "gallery"
        },
        {
          title: "Menú",
          icon: "dashboard",
          url: "menu"
        },
        {
          title: "Reseñas",
          icon: "comments",
          url: "reviews"
        }
      ],
      dictionary: {
        custom: {
          name: {
            required: () => "El Nombre no puede estar vacío",
            max: "El nombre no puede ser mayor a 150 caracteres"
            // custom messages
          },
          email: {
            required: () => "El Email no puede estar vacío",
            email: "Ingresa un email valido"
            // custom messages
          },
          comment: {
            required: () => "El Comentario no puede estar vacío",
            max: "El comentario no puede ser mayor a 500 caracteres"
            // custom messages
          }
        }
      },
      mounted: function() {
        this.$validator.localize("en", this.dictionary);
      },
      methods: {
        send() {
          this.$validator.validateAll().then(response => {
            if (response) {
              this.snack = true;
            }
          });
        }
      }
    };
  }
};
</script>

<style>
.btn-menu-small {
  display: none;
}

.logo {
  background: white;
  position: absolute;
  padding: 30px;
  top: 0;
  border-radius: 0px 0px 6px 6px;
}

@media only screen and (max-width: 700px) {
  .btn-menu {
    display: none;
  }
  .btn-menu-small {
    display: block;
  }
  .title-tool {
    display: none !important;
  }
}
</style>