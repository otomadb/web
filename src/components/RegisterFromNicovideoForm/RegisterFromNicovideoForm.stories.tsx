import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import RegisterForm, { q } from "./RegisterFromNicovideoForm";
import { Fragment as RegReqFragment } from "./Request";
import { Fragment as SourceFragment } from "./Source";
const commonMocks = [mockTagSearcher];
const meta = {
  component: RegisterForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    initThumbnailUrl: "/960x540.jpg",
  },
  render(args) {
    return (
      <MockedAuth0Provider>
        <MockedUrqlProvider>
          <RegisterForm {...args} />
        </MockedUrqlProvider>
      </MockedAuth0Provider>
    );
  },
} as Meta<typeof RegisterForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...commonMocks,
        mswGql.query(q, (req, res, ctx) =>
          res(
            ctx.data({
              fetchNicovideo: {
                source: {
                  ...makeFragmentData(
                    {
                      title: "Title",
                      sourceId: "sm9",
                      thumbnailUrl: "/960x540.jpg",
                      tags: [...new Array(11)].map((_, i) => ({
                        name: `Tag ${i + 1}`,
                        searchTags: {
                          items: [...new Array(3)].map((_, j) => ({
                            tag: {
                              id: `tag:${j + 1}`,
                              ...makeFragmentData(
                                {
                                  name: `Tag ${j + 1}`,
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
                        },
                      })),
                    },
                    SourceFragment
                  ),
                },
              },
              findNicovideoRegistrationRequest: {
                id: "reqreq:1",
                ...makeFragmentData(
                  {
                    title: "Title 1",
                    checked: false,
                    requestedBy: {
                      id: "user:1",
                      displayName: "User 1",
                      ...makeFragmentData(
                        {
                          displayName: "User 1",
                          icon: "/512x512.png",
                        },
                        UserIconFragment
                      ),
                    } as never, // TODO: fix type
                    taggings: [...new Array(10)].map((_, i) => ({
                      id: `tagging:${i + 1}`,
                      tag: {
                        id: `tag:${i + 1}`,
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
                    semitaggings: [...new Array(10)].map((_, i) => ({
                      id: `semitaggings:${i + 1}`,
                      name: `Semitag ${i + 1}`,
                    })),
                  },
                  RegReqFragment
                ),
              },
            })
          )
        ),
      ],
    },
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...commonMocks,
        mswGql.query(q, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
};

export const リクエストが存在しない: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...commonMocks,
        mswGql.query(q, (req, res, ctx) =>
          res(
            ctx.data({
              fetchNicovideo: {
                source: {
                  ...makeFragmentData(
                    {
                      title: "Title",
                      sourceId: "sm9",
                      thumbnailUrl: "/960x540.jpg",
                      tags: [...new Array(11)].map((_, i) => ({
                        name: `Tag ${i + 1}`,
                        searchTags: {
                          items: [...new Array(3)].map((_, j) => ({
                            tag: { id: `tag:${j + 1}` },
                          })),
                        },
                      })),
                    },
                    SourceFragment
                  ),
                },
              },
              findNicovideoRegistrationRequest: null,
            })
          )
        ),
      ],
    },
  },
};
