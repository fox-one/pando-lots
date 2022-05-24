<template>
  <div class="profile-action">
    <span class="mr-1">{{ meta.name }}</span>

    <v-menu offset-y top nudge-right="8" nudge-top="4">
      <template #activator="{ on }">
        <v-icon v-on="on">$FIconSetting</v-icon>
      </template>

      <f-panel class="pa-4 profile-actions" @click="handleDisconnect">
        <div class="disconnect-action">{{ meta.label[0] }}</div>
      </f-panel>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalActions, GlobalGetters } from "../../store/types";
import { $t } from "../../utils/helper";

@Component
class ProfileAction extends Vue {
  get meta() {
    const profile = this.$store.getters[GlobalGetters.PROFILE];

    return {
      name: profile?.full_name ?? "",
      label: [$t(this, "disconnect_wallet")]
    };
  }

  handleDisconnect() {
    this.$store.dispatch(GlobalActions.LOGOUT);
  }
}
export default ProfileAction;
</script>

<style lang="scss" scoped>
.profile-action {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  font-feature-settings: "case" on;
}

.profile-actions {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.disconnect-action {
  color: var(--v-error-base);
  cursor: pointer;
}
</style>
