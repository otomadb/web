import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { MadPageLinkFragment as VideoLinkFragment } from "~/app/(application)/mads/[serial]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { Fragment as AlreadyRegisteredFragment } from "~/components/Form/AlreadyRegistered";
import { Fragment as SourceFragment } from "~/components/Form/RegisterMAD/FromSoundcloud/OriginalSource";
import { Query as TagSearcherQuery } from "~/components/TagSearcher2";
import { Fragment as TagSearcherSuggestItemFragment } from "~/components/TagSearcher2/SuggestItem";
import { Fragment as TagSearcherSuggestsFragment } from "~/components/TagSearcher2/Suggests";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import RequestForm, { Query } from ".";

const meta = {
  component: RequestForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    url: "sm",
    handleCancel: action("cancel"),
  },
  render(args) {
    return (
      <MockedAuth0Provider>
        <MockedUrqlProvider>
          <RequestForm {...args} />
        </MockedUrqlProvider>
      </MockedAuth0Provider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [
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
      },
    },
  },
} as Meta<typeof RequestForm>;
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
                findSoundcloudMADSource: {
                  id: "source:1",
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
                findSoundcloudRegistrationRequestByUrl: null,
                fetchSoundcloud: { source: null },
              })
            )
          ),
        ],
      },
    },
  },
};

export const 既にリクエスト済み: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                findSoundcloudRegistrationRequestByUrl: {
                  id: "reqreq:1",
                  sourceId: "sm2057168",
                },
                findSoundcloudMADSource: null,
                fetchSoundcloud: { source: null },
              })
            )
          ),
        ],
      },
    },
  },
};

export const 動画が存在しない: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                fetchSoundcloud: { source: null },
                findSoundcloudRegistrationRequestByUrl: null,
                findSoundcloudMADSource: null,
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
  parameters: {
    msw: {
      handlers: {
        concern: [
          mswGql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                findSoundcloudRegistrationRequestByUrl: null,
                findSoundcloudMADSource: null,
                fetchSoundcloud: {
                  source: {
                    sourceId: "1408289521",
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
              })
            )
          ),
        ],
      },
    },
  },
};
