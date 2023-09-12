import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { AddTagForm } from "./AddTagForm";
import { commonMock as mockAddTagFormSelectedTag } from "./SelectedTag";

const meta = {
  component: AddTagForm,
  args: {
    style: {
      width: 520,
    },
  },
  render(args) {
    return (
      <MockedAuth0Provider>
        <MockedUrqlProvider>
          <AddTagForm {...args} />
        </MockedUrqlProvider>
      </MockedAuth0Provider>
    );
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
