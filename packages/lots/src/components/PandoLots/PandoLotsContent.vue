<template>
  <div class="pando-lots-content">
    <channel :group-id="groupId" v-bind="$attrs" v-on="$listeners" />

    <span class="pando-lots-close">
      <v-icon @click="$emit('close')">$FIconClose</v-icon>
    </span>

    <f-divider />

    <v-flex class="pando-lots-messages__wrapper">
      <messages v-bind="$attrs" v-on="$listeners" />
    </v-flex>

    <f-divider />

    <chat-area v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Channel from "../Channel";
import ChatArea from "../ChatArea";
import Messages from "../Messages";

@Component({
  inheritAttrs: false,
  components: {
    Channel,
    ChatArea,
    Messages
  }
})
class PandoLotsContent extends Vue {
  @Prop({ type: String, default: "" }) groupId!: string;
}
export default PandoLotsContent;
</script>

<style lang="scss" scoped>
.pando-lots-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .pando-lots-close {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 32px;
    height: 32px;
    background-color: var(--v-greyscale_6-base);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .v-icon::after {
      display: none !important;
    }
  }

  .pando-lots-messages__wrapper {
    height: 100%;
    overflow: hidden;
  }
}
</style>
