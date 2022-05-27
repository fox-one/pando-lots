<template>
  <div id="pando-lots-wrapper"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { usePandoLots } from "../script";

@Component
class PlaygroundIFream extends Vue {
  mounted() {
    usePandoLots({
      domain: "http://192.168.3.5:8089",
      attach: "#pando-lots-wrapper",
      entries: [
        {
          id: "pando_entry_1",
          query: {
            env: "develop",
            groupId: "7000104299",
            themeColor: "#F7931B",
            entryBg: "#F1FDF3"
          }
        },
        {
          id: "pando_entry_2",
          query: { env: "develop", groupId: "7000103413" }
        }
      ],
      modal: {
        id: "pando_modal",
        query: {
          env: "develop",
          groupId: "7000104299",
          groups: ["7000103413", "7000104299"]
        }
      }
    });
  }
}
export default PlaygroundIFream;
</script>
