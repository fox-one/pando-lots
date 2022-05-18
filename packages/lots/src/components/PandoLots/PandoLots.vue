<template>
  <f-bottom-sheet
    v-model="dialog"
    :hide-close-icon="true"
    :menu-props="{
      'close-on-click': false,
      'close-on-content-click': false,
      'disable-keys': true
    }"
    class="pando-lots-modal"
    content-class="pando-lots-modal__container"
  >
    <template #activator="{ on }">
      <slot name="activator" :on="on" />
    </template>

    <pando-lots-content
      :group-id="groupId"
      :groups="groups"
      :loading="loading"
      @close="handleClose"
    />
  </f-bottom-sheet>
</template>

<script lang="ts">
import "./PandoLots.scss";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PandoLotsContent from "./PandoLotsContent.vue";
import {
  GlobalActions,
  GlobalGetters,
  GlobalMutations
} from "../../store/types";

@Component({
  components: { PandoLotsContent }
})
class PandoLots extends Vue {
  @Prop({ type: String, default: "" }) groupId!: string;

  @Prop({ type: Array, default: () => [] }) groups!: string[];

  @Prop({ type: String, default: "product" }) env!: string;

  dialog = false;

  loading = false;

  get logged() {
    return this.$store.getters[GlobalGetters.LOGGED];
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  created() {
    this.$store.commit(GlobalMutations.SET_CURRENT_ENV, this.env);
    this.$store.commit(GlobalMutations.SET_CURRENT_GROUP, this.groupId);
  }

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }

  @Watch("currentGroup")
  async init() {
    console.log("init");
    this.loading = true;

    await this.$store.dispatch(GlobalActions.LOAD_PUBLIC_INFO, this);

    if (this.logged) {
      await this.$store.dispatch(GlobalActions.LOAD_ACCOUNT_INFO, this);
    }

    this.loading = false;
  }

  @Watch("env", { immediate: true })
  handleGroupChange() {
    this.$store.commit(GlobalMutations.SET_CURRENT_ENV, this.env);

    const endpoints = this.$store.getters[GlobalGetters.END_POINTS];

    this.$lots.$apis.config({ baseURL: endpoints.http });
  }

  handleClose() {
    this.dialog = false;
  }
}
export default PandoLots;
</script>
