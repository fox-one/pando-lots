<template>
  <div class="pando-lots-entry">
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      type="paragraph"
      class="pando-lots-entry-wrapper"
    />

    <template v-else>
      <div class="pando-lots-entry__icon">
        <v-icon color="primary">$FIconCommentAFill</v-icon>
      </div>

      <div class="pando-lots-entry__content">
        <div class="group-title">{{ meta.title }}</div>
        <div class="group-info">
          <div class="user-avatars">
            <v-avatar
              v-for="(url, index) in meta.avatars"
              :key="index"
              :size="32"
              class="user-avatar"
            >
              <v-img :src="url" />
            </v-avatar>
          </div>
          <div>{{ meta.members }} Members</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class PandoLotsEntry extends Vue {
  @Prop() loading!: boolean;

  @Prop() group!: API.GroupInfo;

  get meta() {
    return {
      title: this.group?.name ?? "",
      avatars: this.group?.active_users?.map((x) => x.avatar_url),
      members: this.group?.members_count?.total
    };
  }
}
export default PandoLotsEntry;
</script>

<style lang="scss" scoped>
.pando-lots-entry-wrapper {
  display: inline-block;
  min-height: 96px;
  min-width: 320px;
}

.pando-lots-entry {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 16px;

  &:hover {
    background: var(--v-greyscale_6-base);
    border-radius: 8px;
  }

  &__icon {
    background: var(--v-greyscale_6-base);
    border-radius: 8px;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }

  .group-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 12px;
  }

  .group-info {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--v-greyscale_3-base);
  }

  .user-avatars {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 12px;
  }

  .user-avatar {
    margin-left: -16px;
    border: 2px solid white;

    &:last-child {
      margin-left: 0;
    }
  }
}
</style>
