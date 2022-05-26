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
      <f-button color="primary" :loading="loading" v-on="on">
        <v-icon size="16" class="mr-2">$FIconComment4PFill</v-icon>

        <span> {{ btnText }} </span>
      </f-button>
    </template>
  </f-auth-method-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { $t, hasFennec } from "../../utils/helper";
import { loginMixin, loginFennec } from "../../utils/account";
import { GlobalGetters } from "../../store/types";

@Component
class LogginAction extends Vue {
  @Prop() container!: string;

  hasFennec = false;

  loading = false;

  get clientId() {
    return this.group?.client_id ?? "";
  }

  get scope() {
    return this.group?.mixin_oauth_scope.replace(/\+/g, " ") ?? "";
  }

  get btnText() {
    return $t(this, "chat_button");
  }

  get group(): API.GroupInfo {
    return this.$store.getters[GlobalGetters.GROUP_INFO];
  }

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  async mounted() {
    this.hasFennec = await hasFennec(this, this.container);
  }

  async handleAuth({ code, type }) {
    this.loading = true;

    try {
      if (type === "mixin") {
        await loginMixin(this, { code, groupId: this.currentGroup });
      } else if (type === "fennec") {
        await loginFennec(this, {
          groupId: this.currentGroup,
          container: this.container
        });
      } else {
        this.$emit("error", { message: "Error Auth Method" });
      }
    } catch (error) {
      this.$emit("error", error);
    }

    this.loading = false;
  }

  handleError(error) {
    this.$emit("error", error);
  }
}
export default LogginAction;
</script>
