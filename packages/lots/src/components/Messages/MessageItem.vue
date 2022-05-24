<template>
  <div class="message-item" :class="{ 'message-item--self': meta.self }">
    <div class="message-avatar">
      <v-avatar :size="32">
        <v-img v-if="meta.avatar" :src="meta.avatar" />
      </v-avatar>
    </div>

    <div class="message-content">
      <div class="message-info">
        <span class="username">{{ meta.name }}</span>
        <span class="time">{{ meta.time }}</span>
      </div>

      <div class="message-bubble">
        <message-placeholder
          v-if="meta.notSupport"
          :message="message"
          v-on="$listeners"
        />
        <message-text
          v-if="meta.isTextMessage"
          :message="message"
          v-on="$listeners"
        />
        <message-image
          v-if="meta.isImageMessage"
          :message="message"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MessagePlaceholder from "./MessagePlaceholder.vue";
import MessageText from "./MessageText.vue";
import MessageImage from "./MessageImage.vue";
import { GlobalGetters } from "../../store/types";
import { format } from "@foxone/utils/time";
import { SUPPORT_MESSAGES } from "../../constants";

@Component({
  components: {
    MessagePlaceholder,
    MessageText,
    MessageImage
  }
})
class MessageItem extends Vue {
  @Prop() message!: API.Message;

  get meta() {
    const message = this.message;
    const profile = this.$store.getters[GlobalGetters.PROFILE];
    const self = message.speaker_id === profile?.user_id ?? "";
    const notSupport = !SUPPORT_MESSAGES.includes(message.category);
    const isTextMessage = message.category === "PLAIN_TEXT";
    const isImageMessage = message.category === "PLAIN_IMAGE";

    return {
      self,
      avatar: message.speaker_avatar,
      name: message.speaker_name,
      time: format(message.created_at, "MM/DD HH:mm"),
      notSupport,
      isTextMessage,
      isImageMessage
    };
  }
}
export default MessageItem;
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  align-items: flex-end;
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }

  .message-content {
    margin-left: 16px;
    overflow: hidden;
  }

  .message-info {
    font-size: 12px;
    line-height: 15px;

    .username {
      margin-right: 8px;
      font-weight: 500;
      color: var(--v-greyscale_3-base);
    }

    .time {
      font-weight: 400;
      color: var(--v-greyscale_4-base);
    }
  }

  .message-bubble {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-top: 8px;
    border-radius: 8px;
    max-width: 100%;
    background: var(--v-greyscale_6-base);
    border: 1px solid var(--v-greyscale_6-base);
  }
}

.message-item.message-item--self {
  justify-content: flex-end;

  .message-avatar {
    display: none;
  }

  .message-content {
    text-align: right;
  }

  .message-bubble {
    background: var(--v-greyscale_7-base);
    border: 1px solid var(--v-greyscale_5-base);
  }
}
</style>
