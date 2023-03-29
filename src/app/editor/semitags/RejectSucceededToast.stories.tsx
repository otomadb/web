import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonSemitagFragment } from "~/components/CommonSemitag";
import { makeFragmentData } from "~/gql";

import SucceededResolveToast, { Fragment } from "./RejectSucceededToast";

const meta = {
  component: SucceededResolveToast,
  args: {},

  parameters: {},
} as Meta<typeof SucceededResolveToast>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        rejecting: {
          semitag: {
            id: "s1",
            checked: true,
            ...makeFragmentData({ name: "Semitag 1" }, CommonSemitagFragment),
          },
        },
      },
      Fragment
    ),
  },
};
