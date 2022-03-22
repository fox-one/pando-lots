import Vue from "vue";
import App from "./Playground.vue";
import store from "./store";
import i18n from "./i18n";
import vuetify from "./plugins/uikit";
import PandoUI from "./index";

Vue.use(PandoUI, vuetify);

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
} as any).$mount("#app");
