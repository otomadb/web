import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonSemitagFragment } from "~/components/CommonSemitag";
import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

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
                { name: "Tag 1", type: TagType.Character },
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
