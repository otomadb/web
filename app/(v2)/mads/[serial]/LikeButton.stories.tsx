import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { waitFor, within } from "@storybook/testing-library";
import { ComponentProps } from "react";

import { isTest } from "~/test/isTest";

import { Presentation } from "./LikeButton";

const meta = {
  component: Presentation,
  args: {
    like: action("like"),
    unlike: action("unlike"),
    style: {
      width: 192,
    },
  },
} satisfies Meta<typeof Presentation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  name: "読み込み中",
  args: {
    current: undefined,
  },
};

export const IsLiked: Story = {
  name: "いいね済み",
  args: {
    current: true,
  },
};

export const IsNotLiked: Story = {
  name: "まだいいねしていない",
  args: {
    current: false,
  },
};

export const PressLike: Story = {
  name: "いいねした",
  args: {
    current: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<ComponentProps<typeof Presentation>>();

    return (
      <Presentation
        {...args}
        like={() => updateArgs({ current: true })}
        unlike={() => updateArgs({ current: false })}
      />
    );
  },
  play: async function Play({ canvasElement }) {
    if (isTest) return;

    const canvas = within(canvasElement);
    await canvas.getByRole("checkbox").click();

    await waitFor(async () => {
      await expect(canvas.getByRole("checkbox")).toHaveAttribute(
        "aria-checked",
        "true"
      );
    });
  },
};

export const PressUnlike: Story = {
  name: "いいねを解除した",
  args: {
    current: true,
  },
  render: PressLike.render,
  play: async function Play({ canvasElement }) {
    if (isTest) return;

    const canvas = within(canvasElement);
    await canvas.getByRole("checkbox").click();

    await waitFor(async () => {
      await expect(canvas.getByRole("checkbox")).toHaveAttribute(
        "aria-checked",
        "false"
      );
    });
  },
};
