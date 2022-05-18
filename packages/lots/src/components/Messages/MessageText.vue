<template>
  <div class="message-text">{{ meta.text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class MessageText extends Vue {
  @Prop() message!: API.Message;

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
</style>
