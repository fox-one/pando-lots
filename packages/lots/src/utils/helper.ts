export const $t = (vm: Vue, key: string, ...interpolations: string[]) =>
  vm.$vuetify.lang.t("$vuetify.lots." + key, interpolations.join(" "));

export const getImageSize = async (src: string): Promise<any> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      resolve({ width: img.width, height: img.height });
    };

    img.src = src;
  });
};
