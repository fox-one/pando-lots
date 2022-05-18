<template>
  <div class="message-palceholder" v-html="meta.text" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { $t } from "../../utils/helper";
import { GlobalGetters } from "../../store/types";

@Component
class MessagePlaceholder extends Vue {
  get meta() {
    const group = this.$store.getters[GlobalGetters.GROUP_INFO];
    const download = group.download;

    return {
      text: $t(
        this,
        "chat_only_mixin",
        `<a href="${download}">${$t(this, "learn_more")}</a>`
      )
    };
  }
}
export default MessagePlaceholder;
</script>

<style lang="scss" scoped>
.message-palceholder {
  color: var(--v-greyscale_3-base);
  padding: 12px 16px;

  ::v-deep {
    a {
      color: var(--v-greyscale_3-base);
    }
  }
}
</style>
