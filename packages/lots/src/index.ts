import * as components from "./components";
import { mergeDeep } from "vuetify/lib/util/helpers";
import {
  FIconLakeBrand,
  FIconRingsBrand,
  FIconLeafBrand,
  FIconFSwapBrand,
  FIconLakeLogo,
  FIconRingsLogo,
  FIconLeafLogo,
  FIconFSwapLogo,
  FIconWaveBrand,
  FIconWaveLogo,
  FIconCheck,
  FIconWalletAFill
} from "@foxone/icons";
import messages from "./i18n/messages";

import type { VueConstructor } from "vue/types/umd";
import type Vuetify from "vuetify/lib";

export default {
  install: function (Vue: VueConstructor, vuetify: Vuetify) {
    // register pando-ui components
    

    // inject icons and locales in vuetify instance
  }
};

export { messages };
export * from "./components";