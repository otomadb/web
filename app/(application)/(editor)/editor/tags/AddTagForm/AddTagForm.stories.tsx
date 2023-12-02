import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";

import { AddTagForm } from "./AddTagForm";
import { commonMock as mockAddTagFormSelectedTag } from "./SelectedTag";

const meta = {
  component: AddTagForm,
  args: {
    style: {
      width: 520,
    },
  },
  parameters: {
    msw: {
      handlers: [mockTagSearcher, mockAddTagFormSelectedTag],
    },
  },
} as Meta<typeof AddTagForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
