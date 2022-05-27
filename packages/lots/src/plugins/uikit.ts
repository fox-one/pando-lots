import Vue from "vue";
import Vuetify from "vuetify/lib";
import UIKit from "@foxone/uikit";
import { mergeDeep } from "vuetify/lib/util/helpers";

import "@foxone/uikit/build/index.min.css";

const preset = UIKit.preset;
const options = {
  theme: {
    themes: {
      light: {
        primary: "#000000",
        topic: "#000000",
        entry_bg: "#F5F5F5"
      },
      dark: {
        primary: "#FFFFFF",
        topic: "#FFFFFF",
        entry_bg: "#303030"
      }
    }
  }
};
const vuetify = new Vuetify(mergeDeep(preset, options));

Vue.use(Vuetify);
Vue.use(UIKit);
Vue.use(UIKit.Toast, vuetify, {
  top: false,
  centered: true
});
Vue.use(UIKit.Dialog, vuetify, { flat: true });

export default vuetify;
