import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import vuetify from "./plugins/uikit";
import Vuex from "vuex";
import PandoLots from "./index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});

Vue.use(PandoLots, { vuetify, store });
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  vuetify,
  render: (h) => h(App)
} as any).$mount("#app");
