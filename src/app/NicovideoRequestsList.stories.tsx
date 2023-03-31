import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import {
  Fragment,
  Presentation,
} from "./_components/RecentNicovideoRequestsSection/RequestsList";

const meta = {
  component: Presentation,
} as Meta<typeof Presentation>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        findNicovideoRegistrationRequests: {
          nodes: [],
        },
      },
      Fragment
    ),
  },
};
