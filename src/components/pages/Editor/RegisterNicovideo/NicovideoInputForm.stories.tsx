import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { NicovideoInputForm } from "./NicovideoInputForm";

const meta = {
  component: NicovideoInputForm,
  args: {
    set: action("set"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <NicovideoInputForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: { handlers: [] },
  },
} as Meta<typeof NicovideoInputForm>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
