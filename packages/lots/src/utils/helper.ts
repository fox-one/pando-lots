import bridge from "./bridge";

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

export function sendMessage(data) {
  window.parent.postMessage(data, "*");
}

export async function hasFennec(vm: Vue, container) {
  if (container === "app") {
    return vm.$lots.$fennec.isAvailable();
  } else {
    const data = await bridge.sendMessage({ action: "query_fennec_installed" });

    return data.value;
  }
}

export async function connectFennec(vm: Vue, container) {
  if (container === "app") {
    await vm.$lots.$fennec.connect("Pando Lots");

    return await vm.$lots.$fennec.ctx?.wallet?.signToken({
      payload: { from: "pando-lots" }
    });
  } else {
    const data = await bridge.sendMessage({ action: "fennec_connect" });

    return data.token;
  }
}
