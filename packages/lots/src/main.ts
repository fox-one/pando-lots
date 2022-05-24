import Vue from "vue";
import App from "./Playground.vue";
import i18n from "./i18n";
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
  i18n,
  vuetify,
  render: (h) => h(App)
} as any).$mount("#app");
