import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { SourceIdInputForm } from "./SourceIdInputForm";

const meta = {
  component: SourceIdInputForm,
  args: {
    set: action("set"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SourceIdInputForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof SourceIdInputForm>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
