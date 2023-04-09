import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import Component from "./OptionalSemitagTagSearcher";
import { mockTagSearcher } from "./TagSearcher/index.mocks";

const meta = {
  component: Component,
  args: {
    handleSelectTag: action("handleSelectTag"),
    handleSelectSemitag: action("handleSelectSemitag"),
    handleToggle: action("handleToggle"),
  },
  render: (args) => (
    <UrqlProvider
      value={createUrqlClient({ url: "/graphql", exchanges: [fetchExchange] })}
    >
      <Component {...args} style={{ width: "320px" }} />
    </UrqlProvider>
  ),
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
      },
    },
  },
} as Meta<typeof Component>;
export default meta;

export const SemitagAlreadyExists: StoryObj<typeof meta> = {
  name: "仮タグがもう追加されている",
  args: {
    isExistsSemitag: () => true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
export const SemitagNotExists: StoryObj<typeof meta> = {
  name: "仮タグがまだ追加されていない",
  args: {
    isExistsSemitag: () => false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
