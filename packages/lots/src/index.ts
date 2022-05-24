import * as components from "./components";
import { mergeDeep } from "vuetify/lib/util/helpers";
import messages from "./i18n/messages";
import modules from "./store";
import { STORE_KEY } from "./constants";
import createHttpService from "./services/http";
import createPersistedState from "vuex-persistedstate";
import {
  FIconClose,
  FIconChevronDown,
  FIconCrowd4PFill,
  FIconHorn4PFill,
  FIconAlert4PFill,
  FIconComment4PFill,
  FIconSendFill,
  FIconPicture,
  FIconSetting,
  FIconAlertFill,
  FIconCommentAFill
} from "@foxone/icons";
import Fennec from "@foxone/fennec-dapp";

import type { VueConstructor } from "vue/types/umd";
import type Vuetify from "vuetify/lib";
import type { Store } from "vuex";

declare module "vue/types/vue" {
  interface Vue {
    $lots: {
      $apis: ReturnType<typeof createHttpService>;
      $fennec: Fennec;
    };
  }
}

export default {
  install: function (
    Vue: VueConstructor,
    { store, vuetify }: { vuetify: Vuetify; store: Store<any> }
  ) {
    // register pando-lots components
    for (const key in components) {
      const component = components[key];

      Vue.component(key, component as typeof Vue);
    }

    // register lots states
    store.registerModule(STORE_KEY, modules);
    createPersistedState({
      key: "lots",
      paths: [STORE_KEY + ".tokens", STORE_KEY + ".welcome"]
    })(store);

    // register losts utils on vue property
    Vue.prototype.$lots = {
      $apis: createHttpService(store),
      $fennec: new Fennec()
    };

    // inject icons and locales in vuetify instance
    const icons = vuetify.framework.icons.values;
    const locales = vuetify.framework.lang.locales;

    vuetify.framework.icons.values = mergeDeep(
      {
        FIconClose: { component: FIconClose },
        FIconChevronDown: { component: FIconChevronDown },
        FIconCrowd4PFill: { component: FIconCrowd4PFill },
        FIconHorn4PFill: { component: FIconHorn4PFill },
        FIconAlert4PFill: { component: FIconAlert4PFill },
        FIconComment4PFill: { component: FIconComment4PFill },
        FIconSendFill: { component: FIconSendFill },
        FIconPicture: { component: FIconPicture },
        FIconSetting: { component: FIconSetting },
        FIconAlertFill: { component: FIconAlertFill },
        FIconCommentAFill: { component: FIconCommentAFill }
      },
      icons
    );
    vuetify.framework.lang.locales = mergeDeep(messages, locales);
  }
};

export { messages };
export * from "./components";
