<template>
  <div class="message-form">
    <div class="input-area">
      <f-input
        v-model="message"
        :placeholder="meta.placeholder"
        :disabled="meta.disabled"
        hide-details
        @keydown.enter="handleSubmit"
      />

      <v-scale-transition origin="center">
        <f-button
          v-if="meta.valid"
          icon
          :loading="loading"
          class="submit-btn"
          @click="handleSubmit"
        >
          <v-icon color="greyscale_7">$FIconSendFill</v-icon>
        </f-button>
      </v-scale-transition>
    </div>

    <div class="bottom-area">
      <profile-action v-on="$listeners" />

      <image-action :disabled="meta.disabled" v-on="$listeners" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters } from "../../store/types";
import { $t } from "../../utils/helper";
import ProfileAction from "./ProfileAction.vue";
import ImageAction from "./ImageAction.vue";
import { Base64 } from "@foxone/utils";

@Component({
  components: {
    ProfileAction,
    ImageAction
  }
})
class MessageForm extends Vue {
  message = "";

  loading = false;

  get meta() {
    const settings: API.GroupSettings =
      this.$store.getters[GlobalGetters.SETTINGS];
    const disabled = ["mute", "lecture"].includes(
      settings?.["group-mode"] ?? ""
    );
    const placeholder = disabled
      ? $t(this, "chat_only_operator_speak")
      : $t(this, "chat_placeholder");
    const valid = !!this.message;

    return {
      valid,
      disabled,
      placeholder
    };
  }

  async handleSubmit() {
    if (!this.message) return;

    this.loading = true;

    try {
      await this.$lots.$apis.sendMessage({
        category: "PLAIN_TEXT",
        data: Base64.encode(this.message)
      });
      this.message = "";
    } catch (error) {
      this.$emit("error", error);
    }

    this.loading = false;
  }
}
export default MessageForm;
</script>

<style lang="scss" scoped>
.input-area {
  display: flex;

  .submit-btn {
    height: 52px;
    width: 52px;
    background: var(--v-primary-base);
    border-radius: 8px;
    margin-left: 12px;
  }
}

.bottom-area {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
</style>
