import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { MockUrqlProvider } from "~/utils/MockUrqlProvider";

import { expl } from "./ExplicitParentTag";
import { RegisterTagForm } from "./Form";
import { mockQuery as mockImplicitParentTags } from "./ImplicitParentTags";
import { mockQuerySelected, mockSemitags } from "./Semitags";
import { mockSuccessful } from "./useRegister";

const meta = {
  component: RegisterTagForm,
  args: { style: { width: 1024 } },
  render(args) {
    return (
      <MockUrqlProvider>
        <RegisterTagForm {...args} />
      </MockUrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        mockSuccessful,
        mockTagSearcher,
        expl,
        mockImplicitParentTags,
        mockSemitags,
        mockQuerySelected,
      ],
    },
  },
} as Meta<typeof RegisterTagForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
