import { Meta, StoryObj } from "@storybook/react";

import { Fragment as NicovideoRegistrationRequestPageLinkFragment } from "~/app/requests/nicovideo/[sourceId]/Link";
import { Fragment as UserPageLinkFragment } from "~/app/users/[name]/Link";
import { Fragment as UserIconFragment } from "~/components/common/UserIcon";
import { makeFragmentData } from "~/gql";

import { Fragment, Presentation } from "./RequestsList";
import { Fragment as ListItemFragment } from "./RequestsListItem";

const meta = {
  component: Presentation,
} as Meta<typeof Presentation>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        findNicovideoRegistrationRequests: {
          nodes: [...new Array(18)].map((_, i) => ({
            id: `r${i}`,
            ...makeFragmentData(
              {
                ...makeFragmentData(
                  { sourceId: `sm${i}` },
                  NicovideoRegistrationRequestPageLinkFragment
                ),
                title: `Title ${i}`,
                sourceId: `sm${i}`,
                thumbnailUrl: "/960x540.jpg",
                requestedBy: {
                  ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
                  ...makeFragmentData(
                    {
                      icon: "/512x512.png",
                      name: "user1",
                      displayName: "User 1",
                    },
                    UserIconFragment
                  ),
                  id: "u1",
                  displayName: "User 1",
                },
              },
              ListItemFragment
            ),
          })),
        },
      },
      Fragment
    ),
  },
};
