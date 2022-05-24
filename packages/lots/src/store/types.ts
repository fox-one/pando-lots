import { STORE_KEY } from "../constants";

export const GetterTypes = {
  GET_TOKEN: "GET_TOKEN",
  GET_GROUP_BY_ID: "GET_GROUP_BY_ID",
  CURRENT_GROUP_ID: "CURRENT_GROUP_ID",
  END_POINTS: "END_POINTS",
  LOGGED: "LOGGED",
  GROUP_INFO: "GROUP_INFO",
  PROFILE: "PROFILE",
  MESSAGES: "MESSAGES",
  SETTINGS: "SETTINGS",
  WELCOME: "WELCOME"
};

export const MutationTypes = {
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  SET_CURRENT_GROUP: "SET_CURRENT_GROUP",
  SET_CURRENT_ENV: "SET_CURRENT_ENV",
  SET_PROIFLE: "SET_PROIFLE",
  SET_SETTINGS: "SET_SETTINGS",
  SET_GROUP_INFO: "SET_GROUP_INFO",
  SET_MESSAGES: "SET_MESSAGES",
  SET_MESSAGE: "SET_MESSAGE",
  SET_WELCOME: "SET_WELCOME"
};

export const ActionTypes = {
  LOAD_ACCOUNT_INFO: "LOAD_ACCOUNT_INFO",
  LOAD_PUBLIC_INFO: "LOAD_PUBLIC_INFO",
  LOGOUT: "LOGOUT"
};

export const GlobalGetters = {
  ...getGlobalTypes(GetterTypes, STORE_KEY + "/")
};

export const GlobalMutations = {
  ...getGlobalTypes(MutationTypes, STORE_KEY + "/")
};

export const GlobalActions = {
  ...getGlobalTypes(ActionTypes, STORE_KEY + "/")
};

function getGlobalTypes<T>(types: T, prefix: string) {
  return Object.keys(types).reduce(
    (m, k) => ({
      [k]: `${prefix}${types[k]}`,
      ...m
    }),
    {}
  ) as { [k in keyof T]: string };
}
