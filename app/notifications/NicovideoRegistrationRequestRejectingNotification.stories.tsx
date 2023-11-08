import { Meta, StoryObj } from "@storybook/react";

import Component from "./NicovideoRegistrationRequestRejectingNotification";
import { mock } from "./NicovideoRegistrationRequestRejectingNotification.mocks";

const meta = {
  component: Component,
  args: {
    style: { width: "1024px" },
    fragment: mock,
  },
} as Meta<typeof Component>;
export default meta;

export const W_512: StoryObj<typeof meta> = {
  name: "512px",
  args: {
    style: { width: "512px" },
  },
};

export const W_1024: StoryObj<typeof meta> = {
  name: "1024px",
  args: {
    style: { width: "1024px" },
  },
};
