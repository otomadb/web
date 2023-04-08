import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { Fragment as UserIconFragment } from "~/components/common/UserIcon";
import { makeFragmentData } from "~/gql";

import { Fragment as AccordionFragment } from "./ProfileAccordion";
import ProfileIndicator, { Fragment } from "./ProfileIndicator";

const meta = {
  component: ProfileIndicator,
} as Meta<typeof ProfileIndicator>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        ...makeFragmentData(
          {
            name: "user1",
            displayName: "User 1",
            icon: "/512x512.png",
          },
          UserIconFragment
        ),
        ...makeFragmentData(
          {
            name: "user1",
            isEditor: false,
            isAdministrator: false,
          },
          AccordionFragment
        ),
      } as ResultOf<typeof Fragment>,
      Fragment
    ),
  },
};
