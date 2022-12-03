import { Meta, StoryFn } from "@storybook/vue";
import { PandoLots } from "../components";

import "./PandoLots.scss";

export default {
  title: "PandoLots",
  component: PandoLots
} as Meta<typeof PandoLots>;

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    handleError(error) {
      console.log(error);
    }
  },
  template: `
    <pando-lots
      ref="lots"
      group-id="7000103488"
      :groups="['7000103488']"
      env="oversea"
      @error="handleError"
    >
      <template #activator="{ on }">
        <pando-lots-entry
          env="oversea"
          group-id="7000103488"
          @click.native="on.click"
        />
      </template>
    </pando-lots>
  `
});

export const Default = Template.bind({});
Default.args = {};
