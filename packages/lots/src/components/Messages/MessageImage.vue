<template>
  <v-img
    v-if="meta.url"
    :src="meta.url"
    width="100%"
    class="message-image"
    @click="$emit('preview', message)"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class MessageImage extends Vue {
  @Prop() message!: API.Message;

  get meta() {
    return { url: this.message?.attachment?.view_url };
  }
}
export default MessageImage;
</script>

<style lang="scss" scoped>
.message-image {
  border-radius: 8px;
  cursor: pointer;
}
</style>
