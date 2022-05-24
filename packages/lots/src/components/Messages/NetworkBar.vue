<template>
  <v-expand-transition>
    <div v-if="connecting" class="network-bar">
      <v-icon color="white" size="16">$FIconAlert4PFill</v-icon>
      <span class="ml-3">{{ meta.text }}</span>
    </div>
  </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { $t } from "../../utils/helper";

@Component
class NetworkBar extends Vue {
  @Prop() connecting!: boolean;

  get meta() {
    return {
      text: $t(this, "chat_reconnect")
    };
  }
}
export default NetworkBar;
</script>

<style lang="scss" scoped>
.network-bar {
  padding: 16px 24px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.006em;
  background: var(--v-error-base);
  display: flex;
  align-items: center;
}
</style>
