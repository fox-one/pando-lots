<template>
  <pando-lots
    ref="lots"
    :env="meta.env"
    :group-id="meta.groupId"
    :groups="meta.groups"
    container="ifream"
    @error="handleError"
    @close="handleClose"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { sendMessage } from "../utils/helper";

@Component
class ModalPage extends Vue {
  groupId = "";

  get meta() {
    const defaultGroupId = this.$route.query?.groupId ?? "";

    return {
      env: this.$route.query?.env ?? "product",
      groupId: this.groupId || defaultGroupId,
      groups: ((this.$route.query?.groups ?? "") as string).split(",")
    };
  }

  mounted() {
    window.addEventListener("message", this.handleMessage, false);
  }

  handleMessage(event) {
    const action = event?.data?.action;

    if (action === "open_lots_modal") {
      this.groupId = event?.data?.data?.groupId ?? "";
      this.handleOpen();
    }
  }

  handleOpen() {
    (this.$refs.lots as any)?.handleOpen();
  }

  handleClose() {
    sendMessage({ from: "pando_lots_modal", action: "close_lots_modal" });
  }

  handleError(error) {
    this.$uikit.toast.error({ message: error?.message || error?.description });
  }
}
export default ModalPage;
</script>
