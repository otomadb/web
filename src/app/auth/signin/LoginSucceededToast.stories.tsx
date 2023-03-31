import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { Fragment, SucceededToast } from "./LoginSucceededToast";

const meta = {
  component: SucceededToast,
  args: {
    handleToggle: action("handleToggle"),
  },
} as Meta<typeof SucceededToast>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        user: {
          displayName: "User 1",
        },
      },
      Fragment
    ),
  },
};
