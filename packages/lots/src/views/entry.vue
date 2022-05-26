<template>
  <pando-lots-entry
    :env="meta.env"
    :group-id="meta.groupId"
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
      env: this.$route.query?.env ?? "product",
      groupId: this.$route.query?.groupId ?? "",
      id: this.$route.query?.id ?? ""
    };
  }

  handleOpen() {
    sendMessage({ from: "pando_lots_entry", action: "open_lots_modal" });
  }
}
export default EntryPage;
</script>
