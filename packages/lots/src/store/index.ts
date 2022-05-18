import Vue from "vue";
import { ActionTypes, GetterTypes, MutationTypes } from "./types";
import { END_POINTS } from "../constants";

const state = () => ({
  tokens: {},
  current: "",
  env: "product",
  profile: null,
  settings: null,
  groupInfo: null,
  messages: [],
  messageIdsMap: {}
});

const getters = {
  [GetterTypes.CURRENT_GROUP_ID](state) {
    return state.current;
  },
  [GetterTypes.GET_TOKEN](state) {
    return state.tokens[state.current] ?? "";
  },
  [GetterTypes.END_POINTS](state) {
    return END_POINTS[state.env];
  },
  [GetterTypes.LOGGED](state) {
    return Boolean(state.tokens[state.current]);
  },
  [GetterTypes.GROUP_INFO](state) {
    return state.groupInfo;
  },
  [GetterTypes.PROFILE](state) {
    return state.profile;
  },
  [GetterTypes.MESSAGES](state) {
    return state.messages;
  }
};

const mutations = {
  [MutationTypes.SET_TOKEN](state, token) {
    Vue.set(state.tokens, state.current, token);
  },
  [MutationTypes.REMOVE_TOKEN](state) {
    Vue.set(state.tokens, state.current, "");
  },
  [MutationTypes.SET_CURRENT_GROUP](state, value) {
    state.current = value;
  },
  [MutationTypes.SET_CURRENT_ENV](state, value) {
    state.env = value;
  },
  [MutationTypes.SET_PROIFLE](state, value) {
    state.profile = value;
  },
  [MutationTypes.SET_SETTINGS](state, value) {
    state.settings = value;
  },
  [MutationTypes.SET_GROUP_INFO](state, value) {
    state.groupInfo = value;
  },
  [MutationTypes.SET_MESSAGES](state, messages) {
    state.messages = messages;
    state.messageIdsMap = messages.reduce((m, msg) => {
      m[msg.id] = true;

      return m;
    }, {});
  },
  [MutationTypes.SET_MESSAGE](state, message) {
    if (!state.messageIdsMap[message.id]) {
      Vue.set(state.messageIdsMap, message.id, message);
    }
  }
};

const actions = {
  async [ActionTypes.LOAD_ACCOUNT_INFO]({ commit }, vm: Vue) {
    const [profile, settings] = await Promise.all([
      vm.$lots.$apis.getProfile(),
      vm.$lots.$apis.getSettings()
    ]);

    commit(MutationTypes.SET_PROIFLE, profile);
    commit(MutationTypes.SET_SETTINGS, settings);
  },
  async [ActionTypes.LOAD_PUBLIC_INFO]({ commit, state }, vm: Vue) {
    const [groupInfo, messages] = await Promise.all([
      vm.$lots.$apis.getGroupInfo(state.current),
      vm.$lots.$apis.getMessages(state.current)
    ]);

    commit(MutationTypes.SET_GROUP_INFO, groupInfo);
    commit(MutationTypes.SET_MESSAGES, messages);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
