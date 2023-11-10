import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { MadPageLinkFragment as VideoLinkFragment } from "~/app/(application)/mads/[serial]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { Fragment as AlreadyRegisteredFragment } from "~/components/Form/AlreadyRegistered";
import { Query as TagSearcherQuery } from "~/components/TagSearcher2";
import { Fragment as TagSearcherSuggestItemFragment } from "~/components/TagSearcher2/SuggestItem";
import { Fragment as TagSearcherSuggestsFragment } from "~/components/TagSearcher2/Suggests";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import RegisterForm, { Query } from ".";
import { Fragment as SourceFragment } from "./OriginalSource";
import { Fragment as RegReqFragment } from "./Request";

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
  render(args) {
    return (
      <MockedAuth0Provider>
        <MockedUrqlProvider>
          <RegisterForm {...args} />
        </MockedUrqlProvider>
      </MockedAuth0Provider>
    );
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
                findNicovideoVideoSource: null,
                fetchNicovideo: {
                  source: {
                    title: "Title",
                    thumbnailUrl: "/960x540.jpg",
                    ...makeFragmentData(
                      {
                        title: "Title",
                        sourceId: "sm2057168",
                        url: "https://www.nicovideo.jp/watch/sm2057168",
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
                findNicovideoVideoSource: {
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
                fetchNicovideo: { source: null },
                findNicovideoRegistrationRequest: null,
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
                findNicovideoVideoSource: null,
                fetchNicovideo: { source: null },
                findNicovideoRegistrationRequest: null,
              })
            )
          ),
        ],
      },
    },
  },
};

export const リクエストが存在しない: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                findNicovideoVideoSource: null,
                fetchNicovideo: {
                  source: {
                    title: "Title",
                    thumbnailUrl: "/960x540.jpg",
                    ...makeFragmentData(
                      {
                        title: "Title",
                        sourceId: "sm2057168",
                        url: "https://www.nicovideo.jp/watch/sm2057168",
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
                findNicovideoRegistrationRequest: null,
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
