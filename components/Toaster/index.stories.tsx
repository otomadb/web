import { Meta, StoryObj } from "@storybook/react";

import { ToastProvider } from ".";
import Crust from "./Crust";

const meta = {
  component: () => (
    <ToastProvider selector="#toast">
      <div id="toast"></div>
    </ToastProvider>
  ),
} as Meta<typeof Crust>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
