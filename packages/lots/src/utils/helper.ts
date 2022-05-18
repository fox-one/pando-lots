export const $t = (vm: Vue, key: string, ...interpolations: string[]) =>
  vm.$vuetify.lang.t("$vuetify.lots." + key, interpolations.join(" "));
