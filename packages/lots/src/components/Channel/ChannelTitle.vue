<template>
  <div class="channel-title">
    <div class="d-flex align-center">
      <span class="topic--text">#</span>
      <span>{{ meta.title }}</span>
    </div>

    <v-menu v-if="meta.showArrow" offset-y nudge-bottom="10">
      <template #activator="{ on }">
        <v-icon class="ml-2" v-on="on">$FIconChevronDown</v-icon>
      </template>

      <f-panel class="pando-lots-channel_menu">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{
            'channel-menu__item': true,
            'channel-menu__item--active': item.active
          }"
          @click="handleSelect(item)"
        >
          <span class="topic--text">#</span>
          <span> {{ item.title }}</span>
        </div>
      </f-panel>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GlobalGetters, GlobalMutations } from "../../store/types";

@Component
class ChannelTitle extends Vue {
  @Prop() group!: API.GroupInfo | null;

  @Prop() groups!: string[];

  groupsInfo: API.GroupInfo[] = [];

  get currentGroup() {
    return this.$store.getters[GlobalGetters.CURRENT_GROUP_ID];
  }

  get meta() {
    return {
      title: this.group?.name ?? "",
      showArrow: this.groupsInfo.length > 0
    };
  }

  get menuItems() {
    return this.groupsInfo
      .filter((x) => !!x)
      .map((x) => ({
        title: x.name,
        id: x.identity_number,
        active: this.currentGroup === x.identity_number
      }));
  }

  async mounted() {
    this.groupsInfo = await Promise.all(
      this.groups.map((id) => this.$lots.$apis.getGroupInfo(id))
    );
  }

  handleSelect(item) {
    this.$store.commit(GlobalMutations.SET_CURRENT_GROUP, item.id);
  }
}
export default ChannelTitle;
</script>

<style lang="scss" scoped>
.channel-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  padding-right: 40px;
}

.pando-lots-channel_menu {
  padding: 20px 16px !important;

  .channel-menu__item {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 24px;
    cursor: pointer;

    &--active {
      font-weight: 600;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
