<template>
  <div class="image-action">
    <f-button icon width="24" height="24" :loading="uploading">
      <v-icon class="image-icon"> $FIconPicture </v-icon>
    </f-button>

    <input
      ref="input"
      type="file"
      class="upload-input"
      accept="image/*"
      :disabled="disabled"
      @change="handleUpload"
    />
  </div>
</template>

<script lang="ts">
import { Base64 } from "@foxone/utils";
import { Component, Vue, Prop } from "vue-property-decorator";
import { getImageSize } from "../../utils/helper";

@Component
class ImageAction extends Vue {
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  uploading = false;

  async handleUpload(e) {
    const file = e?.target?.files?.[0];

    if (!file) return;

    // 5 MB
    if (file.size / (1024 * 1024) > 5) {
      this.$emit("error", { message: "The file size is too large" });

      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    this.uploading = true;

    try {
      const uploadData = await this.$lots.$apis.uploadAttachment(formData);
      const { height, width } = await getImageSize(uploadData.view_url);
      const payload = {
        category: "PLAIN_IMAGE",
        attachment_id: uploadData.attachment_id,
        size: file.size,
        created_at: new Date().toISOString(),
        mime_type: file.type,
        width,
        height
      };
      const data = Base64.encode(JSON.stringify(payload));

      await this.$lots.$apis.sendMessage({ category: "PLAIN_IMAGE", data });
    } catch (error) {
      this.$emit("error", error);
    }

    this.uploading = false;
  }
}
export default ImageAction;
</script>

<style lang="scss" scoped>
.image-action {
  position: relative;
}

.image-icon {
  z-index: 1;
}

.upload-input {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
  cursor: pointer;
  opacity: 0;
}
</style>
