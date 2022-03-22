import { Framework } from "vuetify";
import "vuetify/types/index.d.ts";

declare module "vue/types/vue" {
  // this.$vuetify inside Vue components
  interface Vue {
    $vuetify: Framework;
  }
}
