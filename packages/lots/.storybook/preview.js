import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import PandoLots from "../src/index";
import UIKit, { preset } from "@foxone/uikit";

import "@foxone/uikit/build/index.min.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

Vue.use(Vuetify);
Vue.use(Vuex);

const vuetify = new Vuetify(preset);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});

Vue.use(PandoLots, { vuetify, store });

Vue.use(UIKit, {
  vuetify,
  dialog: { flat: true },
  toast: { top: false, centered: true },
  auth: {
    wallets: ["mixin"]
  }
});

export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context

    const wrapped = story(context);
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      store,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark
        }
      },
      watch: {
        dark: {
          immediate: true,
          handler(val) {
            this.$vuetify.theme.dark = val;
          }
        }
      },
      template: `
        <v-app>
          <v-container fluid>
            <wrapped />
          </v-container>
        </v-app>
      `
    });
  }
];
