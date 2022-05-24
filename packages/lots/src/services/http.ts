import Http from "@foxone/utils/http";
import { CODE_AUTH_FAIL } from "../constants";
import { GlobalActions, GlobalGetters } from "../store/types";
import createApis from "./apis";

import type { Store } from "vuex";

function generateStructureInterceptor(store: Store<any>) {
  return [
    (res) => {
      if (res?.data?.code) {
        if (res?.data?.code === CODE_AUTH_FAIL) {
          store.commit(GlobalActions.LOGOUT);
        }

        return Promise.reject(res.data);
      }

      return res.data;
    },
    (error) => {
      if (error?.response?.data) {
        const { code, message } = error.response.data;

        return Promise.reject({ code, message });
      }

      return Promise.reject({ code: -1, message: "No Response Data" });
    }
  ];
}

function generateAuthInterceptor(store: Store<any>) {
  return [
    (configs) => {
      const token = store.getters[GlobalGetters.GET_TOKEN];

      if (token) {
        configs.headers.Authorization = `Bearer ${token}`;
      }

      return configs;
    }
  ];
}

export default function createHttpService(store: Store<any>) {
  const endpoints = store.getters[GlobalGetters.END_POINTS];

  const http = new Http(
    { baseURL: endpoints.http },
    [generateAuthInterceptor(store)],
    [generateStructureInterceptor(store)]
  );

  return createApis(http);
}
