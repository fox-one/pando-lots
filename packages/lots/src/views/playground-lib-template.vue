<template>
  <pando-lots
    ref="lots"
    env="develop"
    group-id="7000104299"
    :groups="['7000103413', '7000104299']"
    @error="handleError"
  >
    <template #activator="{ on }">
      <pando-lots-entry
        env="develop"
        group-id="7000104299"
        @click.native="on.click"
      />
    </template>
  </pando-lots>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class PlaygroundLib extends Vue {
  handleError(error) {
    this.$uikit.toast.error({ message: error?.message || error?.description });
  }
}
export default PlaygroundLib;
</script>
