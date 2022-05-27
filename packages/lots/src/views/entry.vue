<template>
  <pando-lots-entry
    :env="meta.env"
    :group-id="meta.groupId"
    :entry-bg="meta.entryBg"
    @click.native="handleOpen"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { sendMessage } from "../utils/helper";

@Component
class EntryPage extends Vue {
  get meta() {
    return {
      entryBg: this.$route.query?.entryBg ?? "",
      env: this.$route.query?.env ?? "product",
      groupId: this.$route.query?.groupId ?? "",
      id: this.$route.query?.id ?? "",
      themeColor: this.$route.query?.themeColor ?? ""
    };
  }

  handleOpen() {
    sendMessage({
      from: "pando_lots_entry",
      action: "open_lots_modal",
      groupId: this.meta.groupId,
      themeColor: this.meta.themeColor
    });
  }
}
export default EntryPage;
</script>
