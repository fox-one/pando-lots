import Vue from "vue";
import Vuetify from "vuetify/lib";
import UIKit from "@foxone/uikit";

import "@foxone/uikit/build/index.min.css";

const preset = UIKit.preset;

Vue.use(Vuetify);
Vue.use(UIKit);

export default new Vuetify(preset);
