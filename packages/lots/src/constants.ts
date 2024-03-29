export const STORE_KEY = "pando_lots";

export const CODE_AUTH_FAIL = 100401;

export const END_POINTS = {
  product: {
    http: "https://xuexi-courses-api.songy.info/v1",
    websocket: "wss://xuexi-courses-ws.songy.info"
  },
  develop: {
    http: "https://dev-xuexi-courses-api.songy.info/v1",
    websocket: "wss://dev-courses-ws.songy.info"
  },
  oversea: {
    http: "https://supergroup-api.mixin.fan/v1",
    websocket: "wss://supergroup-ws.mixin.fan"
  }
};

export const SUPPORT_MESSAGES = ["PLAIN_TEXT", "PLAIN_IMAGE"];
