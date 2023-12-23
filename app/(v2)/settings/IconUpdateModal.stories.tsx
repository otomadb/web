import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { graphql as mswGql } from "msw";

import IconUpdateModal, { UpdateProfileIconMutation } from "./IconUpdateModal";

export const mockUpdateIconSucceeded = mswGql.mutation(
  UpdateProfileIconMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        changeUserIcon: {
          __typename: "ChangeUserIconSucceededSuccess",
          user: {
            id: "user:1",
            icon: "/icon.png",
          },
        },
      })
    )
);

const meta = {
  component: IconUpdateModal,
  args: {
    style: {
      width: 640,
      height: 500,
    },
    original: "/icon.png",
    handleSuccess: action("success"),
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockUpdateIconSucceeded],
      },
    },
  },
  excludeStories: /^mock/,
} satisfies Meta<typeof IconUpdateModal>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
  },
};
