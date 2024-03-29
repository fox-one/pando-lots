<template>
  <f-bottom-sheet
    v-model="dialog"
    :hide-overlay="!isMobile"
    :hide-close-icon="true"
    :menu-props="{
      'close-on-click': false,
      'close-on-content-click': false,
      'disable-keys': true
    }"
    :content-class="contentClass"
    class="pando-lots-modal"
  >
    <template #activator="{ on }">
      <slot name="activator" :on="on" :loading="loading" :group="group" />
    </template>

    <welcome-modal v-if="showWelcome" />

    <pando-lots-content
      v-else
      :group-id="groupId"
      :groups="groups"
      :loading="loading"
      :container="container"
      v-on="$listeners"
      @close="handleClose"
    />
  </f-bottom-sheet>
</template>

<script lang="ts">
import "./PandoLots.scss";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PandoLotsContent from "./PandoLotsContent.vue";
import WelcomeModal from "../WelcomeModal";
import {
  GlobalActions,
  GlobalGetters,
  GlobalMutations
} from "../../store/types";

@Component({
  components: {
    PandoLotsContent,
    WelcomeModal
  }
})
class PandoLots extends Vue {
  @Prop({ type: String, default: "" }) groupId!: string;

  @Prop({ type: Array, default: () => [] }) groups!: string[];

  @Prop({ type: String, default: "product" }) env!: string;

  @Prop({ type: String, default: "app" }) container!: string;

  @Prop({ type: String, default: "" }) themeColor!: string;

  dialog = false;

  loading = false;

  get contentClass() {
    return [
      "pando-lots-modal__container",
      `pando-lots-modal__container--${this.container}`,
      this.isMobile && "pando-lots-modal__container--mobile"
    ]
      .filter((v) => !!v)
      .join(" ");
  }

  get isMobile() {
    return this.$vuetify.breakpoint.mdAndDown;
  }

  get logged() {
    return this.$store.getters[GlobalGetters.LOGGED];
  }

  get group() {
    return this.$store.getters[GlobalGetters.GROUP_INFO];
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  get showWelcome() {
    const welcome = this.$store.getters[GlobalGetters.WELCOME];

    return this.logged && welcome;
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

  @Watch("currentGroup", { immediate: true })
  async init() {
    if (!this.currentGroup) return;

    this.loading = true;
    this.handleEnvChange();

    try {
      await this.$store.dispatch(GlobalActions.LOAD_PUBLIC_INFO, this);

      if (this.logged) {
        await this.$store.dispatch(GlobalActions.LOAD_ACCOUNT_INFO, this);
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  @Watch("env", { immediate: true })
  handleEnvChange() {
    this.$store.commit(GlobalMutations.SET_CURRENT_ENV, this.env);

    const endpoints = this.$store.getters[GlobalGetters.END_POINTS];

    this.$lots.$apis.config({ baseURL: endpoints.http });
  }

  @Watch("groupId")
  handleGroupChange() {
    this.$store.commit(GlobalMutations.SET_CURRENT_GROUP, this.groupId);
  }

  @Watch("dialog")
  handleDialogChange(value) {
    if (!value) {
      this.$emit("close");
    }
  }

  @Watch("themeColor", { immediate: true })
  handleThemeColorChange(value) {
    const color = value || "#000000";

    this.$vuetify.theme.themes.light.topic = color;
  }

  handleOpen() {
    this.dialog = true;
  }

  handleClose() {
    this.dialog = false;
  }
}
export default PandoLots;
</script>
