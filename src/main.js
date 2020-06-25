import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'popper.js';
import 'bootstrap';
import "../src/assets/app.scss"
import VueMeta from 'vue-meta'
import i18n from './i18n'

Vue.config.productionTip = false;
Vue.use(VueMeta)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
