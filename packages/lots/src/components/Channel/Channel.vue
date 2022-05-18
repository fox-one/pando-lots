<template>
  <v-skeleton-loader :loading="loading" type="article">
    <div class="pando-lots-channel">
      <channel-title :group="group" v-bind="$attrs" />
      <channel-information :group="group" />
    </div>
  </v-skeleton-loader>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ChannelTitle from "./ChannelTitle.vue";
import ChannelInformation from "./ChannelInformation.vue";
import { GlobalGetters } from "../../store/types";

@Component({
  inheritAttrs: false,
  components: {
    ChannelTitle,
    ChannelInformation
  }
})
class Channel extends Vue {
  @Prop() loading!: boolean;

  get group() {
    return this.$store.getters[GlobalGetters.GROUP_INFO];
  }
}
export default Channel;
</script>

<style lang="scss" scope>
.pando-lots-channel {
  padding: 24px;
}
</style>
