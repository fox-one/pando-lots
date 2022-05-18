<template>
  <div class="channel-information">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="channel-information__item"
    >
      <v-icon size="16" color="greyscale_3" class="mr-3">
        {{ item.icon }}
      </v-icon>
      <span v-html="item.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { $t } from "../../utils/helper";

@Component
class ChannelInformation extends Vue {
  @Prop() group!: API.GroupInfo;

  get items() {
    const total = this.group.members_count.total;
    const id = this.group.identity_number;

    return [
      {
        icon: "$FIconCrowd4PFill",
        value: new Intl.NumberFormat().format(total)
      },
      {
        icon: "$FIconHorn4PFill",
        value: $t(
          this,
          "channel_info_id",
          `<span class="channel-information_id">
            <a href="" target="_blank">${id}</a>
          </span>`
        )
      }
    ];
  }
}
export default ChannelInformation;
</script>

<style lang="scss" scoped>
.channel-information {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: var(--v-greyscale_3-base);

  ::v-deep {
    a {
      color: var(--v-greyscale_3-base);
    }
  }
}

.channel-information__item {
  margin-top: 16px;

  &:first-child {
    margin-top: 24px;
  }
}
</style>
