import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueMasonry from 'vue-masonry-css'
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

Vue.use(VueMasonry)

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')