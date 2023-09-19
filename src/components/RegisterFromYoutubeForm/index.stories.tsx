import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { Fragment as VideoLinkFragment } from "~/app/mads/[serial]/Link";
import { Fragment as CommonTagFragment } from "~/components/CommonTag";
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
import { Fragment as AlreadyRegisteredFragment } from "./AlreadyRegistered";
import { Fragment as SourceFragment } from "./OriginalSource";
import { Fragment as RegReqFragment } from "./Request";

const commonMocks = [
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
];
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
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeVideoSource: null,
              fetchYoutube: {
                source: {
                  thumbnailUrl: "/960x540.jpg",
                  ...makeFragmentData(
                    {
                      url: "https://www.Youtube.jp/watch?v=Q16KpquGsIc",
                      thumbnailUrl: "/960x540.jpg",
                      sourceId: "Q16KpquGsIc",
                    },
                    SourceFragment
                  ),
                },
              },
              findYoutubeRegistrationRequest: {
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
        mswGql.query(Query, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
};

export const 既に登録済み: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...commonMocks,
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeVideoSource: {
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
              },
              fetchYoutube: { source: null },
              findYoutubeRegistrationRequest: null,
            })
          )
        ),
      ],
    },
  },
};

export const 元動画が存在しない: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...commonMocks,
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeVideoSource: null,
              fetchYoutube: { source: null },
              findYoutubeRegistrationRequest: null,
            })
          )
        ),
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
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeVideoSource: null,
              fetchYoutube: {
                source: {
                  thumbnailUrl: "/960x540.jpg",
                  ...makeFragmentData(
                    {
                      url: "https://www.Youtube.jp/watch?v=Q16KpquGsIc",
                      thumbnailUrl: "/960x540.jpg",
                      sourceId: "Q16KpquGsIc",
                    },
                    SourceFragment
                  ),
                },
              },
              findYoutubeRegistrationRequest: null,
            })
          )
        ),
      ],
    },
  },
};
