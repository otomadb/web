import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { UserPageLinkFragment } from "~/app/(application)/users/[name]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { $UseHarRoleQuery } from "~/components/useHasRole";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { NicovideoRegistrationRequestLinkFragment } from "../../../(v2)/requests/nicovideo/[sourceId]/Link";
import RequestsList, { Fragment } from "./RequestsList";
import { Fragment as ItemFragment } from "./RequestsListItem";

const meta = {
  component: RequestsList,
  args: {
    style: { width: 1024 },
    fragment: makeFragmentData(
      {
        nodes: [...new Array(10)].map((_, i) => ({
          id: `regreq:${i + 1}`,
          ...makeFragmentData(
            {
              title: `Title ${i + 1}`,
              sourceId: "sm9",
              thumbnailUrl: "/960x540.jpg",
              originalUrl: "https://www.nicovideo.jp/watch/sm9",
              taggings: [...new Array(4)].map((_, i) => ({
                id: `tagging:${i + 1}`,
                tag: {
                  ...makeFragmentData(
                    {
                      name: `Tag ${i + 1}`,
                      type: TagType.Character,
                      explicitParent: {
                        id: `tag:0`,
                        name: "Tag 0",
                      },
                    },
                    CommonTagFragment
                  ),
                },
              })),
              semitaggings: [...new Array(4)].map((_, i) => ({
                id: `tagging:${i + 1}`,
                name: `Semitag ${i + 1}`,
              })),
              requestedBy: {
                id: "user:1",
                displayName: "User 1",
                ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
                ...makeFragmentData(
                  { icon: "/512x512.png", displayName: "User 1" },
                  UserIconFragment
                ),
              } as never, // TODO: Fix type
              ...makeFragmentData(
                { sourceId: "sm9" },
                NicovideoRegistrationRequestLinkFragment
              ),
            },
            ItemFragment
          ),
        })),
      },
      Fragment
    ),
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <RequestsList {...args} />
      </MockedUrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        mswGql.query($UseHarRoleQuery, (req, res, ctx) =>
          res(ctx.data({ whoami: { id: "user:1", hasRole: true } }))
        ),
      ],
    },
  },
} as Meta<typeof RequestsList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
