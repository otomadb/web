import { Meta, StoryObj } from "@storybook/react";

import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import SearchContents from ".";

const meta = {
  component: SearchContents,
  args: {
    style: {
      width: 640,
    },
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <SearchContents {...args} />
      </MockedUrqlProvider>
    );
  },
} satisfies Meta<typeof SearchContents>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
