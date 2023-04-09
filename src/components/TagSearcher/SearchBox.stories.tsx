import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { SearchBox } from "./SearchBox";

const meta = {
  component: SearchBox,
  args: {
    style: { width: "320px" },
    setQuery: action("setQuery"),
  },
} as Meta<typeof SearchBox>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};

export const Fetching: StoryObj<typeof meta> = {
  name: "取得中",
  args: {
    fetching: true,
  },
};

export const InputQuery: StoryObj<typeof meta> = {
  name: "何か入力",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
