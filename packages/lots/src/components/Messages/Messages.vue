<template>
  <div class="pando-lots-messages">
    <nerwork-bar :connecting="connecting" />

    <div id="messages" ref="messages" class="message-items">
      <message-item
        v-for="(item, index) in messages"
        :key="index"
        :message="item"
        @preview="handlePreview"
        v-on="$listeners"
      />
    </div>

    <image-gallery
      :index="previewIndex"
      :is-open="isPreview"
      :items="images"
      @close="handleClose"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { GlobalGetters, GlobalMutations } from "../../store/types";
import Socket from "../../utils/socket";
import MessageItem from "./MessageItem.vue";
import NerworkBar from "./NetworkBar.vue";
import ImageGallery from "./ImageGallery.vue";

@Component({
  inheritAttrs: false,
  components: {
    MessageItem,
    NerworkBar,
    ImageGallery
  }
})
class Messages extends Vue {
  @Prop() loading!: boolean;

  socket = new Socket();

  connecting = false;

  error = false;

  isPreview = false;

  previewIndex = 0;

  get messages(): API.Message[] {
    return this.$store.getters[GlobalGetters.MESSAGES];
  }

  get images() {
    return this.messages
      .filter((x) => x.category === "PLAIN_IMAGE")
      .map((x) => {
        return {
          src: x.attachment.view_url,
          w: x.attachment.width ?? 100,
          h: x.attachment.height ?? 100,
          id: x.id
        };
      });
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  get token() {
    return this.$store.getters[GlobalGetters.GET_TOKEN];
  }

  mounted() {
    this.init();
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.$nextTick(() => {
      const el: any = this.$refs.messages;
      const offset = el?.scrollHeight ?? 0;

      this.$vuetify.goTo(offset, { container: el });
    });
  }

  @Watch("messages")
  handleMessagesChange() {
    this.scrollToBottom();
  }

  @Watch("currentGroup")
  @Watch("token")
  init() {
    const endpoints = this.$store.getters[GlobalGetters.END_POINTS];
    const url = endpoints.websocket + "/" + this.currentGroup;

    this.socket.disconnect();

    if (!this.token) return;

    this.socket.connect(url, this.token, {
      onfail: () => {
        this.connecting = false;
        this.$emit("error", { message: "Websocket connect error" });
      },
      onerror: () => {
        this.connecting = true;
      },
      onconnected: () => {
        this.connecting = false;
      },
      onmessage: (msg) => {
        this.$store.commit(GlobalMutations.SET_MESSAGE, msg);
      }
    });
  }

  handleClose() {
    this.previewIndex = 0;
    this.isPreview = false;
  }

  handlePreview(message: API.Message) {
    const index = this.images.findIndex((x) => x.id === message.id);

    if (index < 0) return;

    this.previewIndex = index;
    this.isPreview = true;
  }
}
export default Messages;
</script>

<style lang="scss" scoped>
.pando-lots-messages {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.message-items {
  flex: 1;
  height: 100%;
  overflow: auto;
  padding: 24px;
}
</style>
