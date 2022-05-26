<template>
  <div class="chat-area">
    <div v-if="!logged" class="loggin-area">
      <loggin-action v-bind="$attrs" v-on="$listeners" />
    </div>

    <div v-else class="form-area">
      <message-form v-on="$listeners" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store/types";
import LogginAction from "../LogginAction";
import MessageForm from "./MessageForm.vue";

@Component({
  inheritAttrs: false,
  components: {
    LogginAction,
    MessageForm
  }
})
class ChatArea extends Vue {
  get logged() {
    return this.$store.getters[GlobalGetters.LOGGED];
  }
}
export default ChatArea;
</script>

<style lang="scss" scoped>
.chat-area {
  .loggin-area {
    padding: 44px 0;
    display: flex;
    justify-content: center;
  }

  .form-area {
    padding: 24px;
  }
}
</style>
