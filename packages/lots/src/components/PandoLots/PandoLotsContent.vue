<template>
  <div class="pando-lots-content">
    <channel :group-id="groupId" v-bind="$attrs" />

    <span class="pando-lots-close">
      <v-icon @click="$emit('close')">$FIconClose</v-icon>
    </span>

    <f-divider />

    <v-flex class="messages-wrapper">
      <messages v-bind="$attrs" />
    </v-flex>

    <f-divider />

    <chat-form v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Channel from "../Channel";
import ChatForm from "../ChatForm";
import Messages from "../Messages";

@Component({
  inheritAttrs: false,
  components: {
    Channel,
    ChatForm,
    Messages
  }
})
class PandoLotsContent extends Vue {
  @Prop({ type: String, default: "" }) groupId!: string;
}
export default PandoLotsContent;
</script>

<style lang="scss" scoped>
.messages-wrapper {
  overflow: auto;
}
</style>
