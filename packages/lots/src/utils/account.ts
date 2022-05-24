import { GlobalActions, GlobalMutations } from "../store/types";

export async function loginMixin(vm: Vue, { code, groupId }) {
  const resp = await vm.$lots.$apis.authMixin(groupId, code);

  await updateAccount(vm, { token: resp.token });
}

export async function loginFennec(vm: Vue, { groupId }) {
  await vm.$lots.$fennec.connect("Pando Lots");

  const token = await vm.$lots.$fennec.ctx?.wallet?.signToken({
    payload: { from: "pando-lots" }
  });
  const resp = await vm.$lots.$apis.authFennec(groupId, token || "");

  await updateAccount(vm, { token: resp.token });
}

export async function updateAccount(vm: Vue, { token }) {
  vm.$store.commit(GlobalMutations.SET_TOKEN, token);

  await vm.$store.dispatch(GlobalActions.LOAD_ACCOUNT_INFO, vm);
}
