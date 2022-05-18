<template>
  <div class="pando-lots-messages">
    <message-item
      v-for="(item, index) in messages"
      :key="index"
      :message="item"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GlobalGetters, GlobalMutations } from "../../store/types";
import Socket from "../../utils/socket";
import MessageItem from "./MessageItem.vue";

@Component({
  components: {
    MessageItem
  }
})
class Messages extends Vue {
  @Prop() loading!: boolean;

  socket = new Socket();

  connecting = true;

  error = false;

  get messages() {
    return this.$store.getters[GlobalGetters.MESSAGES];
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  init() {
    const endpoints = this.$store.getters[GlobalGetters.END_POINTS];
    const token = this.$store.getters[GlobalGetters.GET_TOKEN];
    const url = endpoints.websocket + "/" + this.currentGroup;

    this.socket.connect(url, token, {
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
}
export default Messages;
</script>
