import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { Query as TagSearcherQuery } from "~/components/TagSearcher";
import { SuggestItemFragment as TagSearcherSuggestItemFragment } from "~/components/TagSearcher/SuggestItem";
import { SuggestsFragment as TagSearcherSuggestsFragment } from "~/components/TagSearcher/Suggests";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import RegisterForm, { Query } from ".";
import { Fragment as SourceFragment } from "./OriginalSource";

const meta = {
  component: RegisterForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    initThumbnailUrl: "/960x540.jpg",
    handleCancel: action("cancel"),
  },
  parameters: {
    msw: {
      handlers: {
        uncocern: [
          mswGql.query(TagSearcherQuery, (req, res, ctx) =>
            res(
              ctx.data({
                searchTags: {
                  ...makeFragmentData(
                    {
                      items: [...new Array(5)].map((_, i) => ({
                        ...makeFragmentData(
                          {
                            name: {
                              id: `tagname:${i + 1}`,
                              primary: true,
                              name: `Tag ${i + 1}`,
                            },
                            tag: {
                              id: `tag:${i + 1}`,
                              ...makeFragmentData(
                                {
                                  name: `Tag ${i + 1}`,
                                  type: TagType.Character,
                                  explicitParent: {
                                    id: "tag:0",
                                    name: "Tag 0",
                                  },
                                },
                                CommonTagFragment
                              ),
                            },
                          },
                          TagSearcherSuggestItemFragment
                        ),
                      })),
                    },
                    TagSearcherSuggestsFragment
                  ),
                },
              })
            )
          ),
        ],
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                fetchSoundcloud: {
                  source: {
                    title: "Title",
                    originalThumbnailUrl: "/960x540.jpg",
                    sourceId: "1469143378",
                    ...makeFragmentData(
                      {
                        title: "Title",
                        sourceId: "BV1xx411c7mu",
                        url: "https://soundcloud.com/pr0tein/ubfhfythunwo",
                        thumbnailUrl: "/960x540.jpg",
                        tags: [...new Array(10)].map((_, i) => ({
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
              })
            )
          ),
        ],
      },
    },
  },
} as Meta<typeof RegisterForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) => res(ctx.delay("infinite"))),
        ],
      },
    },
  },
};

export const 既に登録済み: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                /*
                findSoundcloudVideoSource: {
                  ...makeFragmentData(
                    {
                      id: "source:1",
                      sourceId: "sm2057168",
                      video: {
                        id: "video:1",
                        title: "Title 1",
                        ...makeFragmentData({ serial: 1 }, VideoLinkFragment),
                        ...makeFragmentData(
                          {
                            title: "Title 1",
                            thumbnailUrl: "/960x540.jpg",
                          },
                          VideoThumbnailFragment
                        ),
                      } as never, // TODO: Fix type for merging makeFragmentData
                    },
                    AlreadyRegisteredFragment
                  ),
                } as never,
                findSoundcloudRegistrationRequest: null,
                */
                fetchSoundcloud: { source: null },
              })
            )
          ),
        ],
      },
    },
  },
};

export const 元動画が存在しない: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                fetchSoundcloud: { source: null },
                /*
                findSoundcloudVideoSource: null,
                findSoundcloudRegistrationRequest: null,
                */
              })
            )
          ),
        ],
      },
    },
  },
};

export const 登録可能: Story = {
  args: {},
};
