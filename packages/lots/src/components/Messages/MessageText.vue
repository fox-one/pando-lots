<template>
  <div class="message-text" :class="{ 'message-text--self': self }">
    {{ meta.text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class MessageText extends Vue {
  @Prop() message!: API.Message;

  @Prop() self!: boolean;

  get meta() {
    return {
      text: this.message.text
    };
  }
}
export default MessageText;
</script>

<style lang="scss" scoped>
.message-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 12px 16px;
}

.message-text--self {
  color: var(--v-topic-base);
}
</style>
