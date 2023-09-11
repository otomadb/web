import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { MockUrqlProvider } from "~/utils/MockUrqlProvider";

import { mockQuerySelected, mockSemitags, Semitags } from "./Semitags";

const meta = {
  component: Semitags,
  args: {
    style: { width: 640 },
    append: action("append"),
    remove: action("remove"),
    setTemporaryPrimaryTitle: action("setTemporaryPrimaryTitle"),
  },
  render(args) {
    return (
      <MockUrqlProvider>
        <Semitags {...args} />
      </MockUrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: { handlers: [mockQuerySelected, mockSemitags] },
  },
} as Meta<typeof Semitags>;
export default meta;

export const NotSelected: StoryObj<typeof meta> = {
  args: {
    fields: [],
  },
};

export const Selected: StoryObj<typeof meta> = {
  args: {
    fields: [
      { id: "id:st1", semitagId: "st1" },
      { id: "id:st2", semitagId: "st2" },
    ],
  },
};
