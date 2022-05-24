import Vue from "vue";
import Vuetify from "vuetify/lib";
import UIKit from "@foxone/uikit";

import "@foxone/uikit/build/index.min.css";

const preset = UIKit.preset;
const vuetify = new Vuetify(preset);

Vue.use(Vuetify);
Vue.use(UIKit);
Vue.use(UIKit.Toast, vuetify, {
  top: false,
  centered: true
});
Vue.use(UIKit.Dialog, vuetify, { flat: true });

export default vuetify;
