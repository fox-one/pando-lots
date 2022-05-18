<template>
  <f-auth-method-modal
    :fennec="hasFennec"
    :client-id="clientId"
    :scope="scope"
    :is-firesbox="false"
    @auth="handleAuth"
    @error="handleError"
  >
    <template #activator="{ on }">
      <f-button :loading="loading" v-on="on">
        {{ btnText }}
      </f-button>
    </template>
  </f-auth-method-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { $t } from "../../utils/helper";
import { loginMixin, loginFennec } from "../../utils/account";
import { GlobalGetters } from "../../store/types";

@Component
class LogginAction extends Vue {
  @Prop({ type: String, default: "" }) clientId!: string;

  @Prop({ type: String, default: "" }) groupId!: string;

  @Prop({ type: String, default: "PROFILE:READ MESSAGES:REPRESENT" })
  scope!: string;

  hasFennec = false;

  loading = false;

  get btnText() {
    return $t(this, "chat_button");
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  mounted() {
    setTimeout(() => {
      this.hasFennec = this.$lots.$fennec?.isAvailable() ?? false;
    }, 200);
  }

  async handleAuth({ code, type }) {
    this.loading = true;

    try {
      if (type === "mixin") {
        await loginMixin(this, { code, groupId: this.currentGroup });
      } else if (type === "fennec") {
        await loginFennec(this, { groupId: this.currentGroup });
      } else {
        this.$emit("error", { message: "Error Auth Method" });
      }
    } catch (error) {
      this.$emit("error", error);
    }

    this.loading = false;
  }
}
export default LogginAction;
</script>
