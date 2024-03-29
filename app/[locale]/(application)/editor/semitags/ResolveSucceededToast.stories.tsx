import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonSemitagFragment } from "~/components/CommonSemitag";
import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";

import SucceededResolveToast, { Fragment } from "./ResolveSucceededToast";

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
        resolving: {
          semitag: {
            id: "s1",
            checked: true,
            ...makeFragmentData({ name: "Semitag 1" }, CommonSemitagFragment),
          },
          resolveTo: {
            tag: {
              id: "t1",
              ...makeFragmentData(
                { name: "Tag 1", belongTo: { keyword: "character" } },
                CommonTagFragment
              ),
            },
          },
        },
      },
      Fragment
    ),
  },
};
