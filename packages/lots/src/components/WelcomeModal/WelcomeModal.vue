<template>
  <div class="hello-modal">
    <v-img :src="meta.image" />
    <div class="hello-modal__title">{{ meta.title }}</div>
    <p class="hello-modal__subtitle">{{ meta.desc }}</p>

    <div class="hello-modal__terms">
      <p>
        <v-icon color="warning" class="mr-2">$FIconAlertFill</v-icon>
        <span class="ml-2">{{ meta.rule1 }}</span>
      </p>
      <p>
        <v-icon color="warning">$FIconAlertFill</v-icon>
        <span class="ml-2">{{ meta.rule2 }}</span>
      </p>
      <p>
        <v-icon color="warning">$FIconAlertFill</v-icon>
        <span class="ml-2">{{ meta.rule3 }}</span>
      </p>
    </div>

    <div class="hello-modal__action">
      <f-button color="primary" @click="handleConfirm">{{ meta.btn }}</f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GlobalGetters, GlobalMutations } from "../../store/types";
import { $t } from "../../utils/helper";

@Component
class WelcomeModal extends Vue {
  get group(): API.GroupInfo {
    return this.$store.getters[GlobalGetters.GROUP_INFO];
  }

  get meta() {
    return {
      image: "https://static.fox.one/image/lots_hello.png",
      title: $t(this, "hello_title"),
      desc: $t(this, "hello_desc"),
      btn: $t(this, "hello_button"),
      rule1: $t(this, "hello_rules_1"),
      rule2: $t(
        this,
        "hello_rules_2",
        (this.group?.lots_history_messages_count ?? 0) + ""
      ),
      rule3: $t(this, "hello_rules_3")
    };
  }

  handleConfirm() {
    this.$store.commit(GlobalMutations.SET_WELCOME, false);
  }
}
export default WelcomeModal;
</script>

<style lang="scss" scoped>
.hello-modal {
  padding: 80px 48px 48px 48px;
  height: 100%;
  overflow: auto;

  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-top: 48px;
  }

  &__subtitle {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--v-greyscale_3-base);
    margin: 24px 0;
  }

  &__terms {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 24px;

    p {
      display: flex;
      align-items: flex-start;
    }
  }

  &__action {
    margin-top: 48px;
    text-align: center;
  }
}
</style>
