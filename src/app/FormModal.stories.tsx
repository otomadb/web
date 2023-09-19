import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";
import { ComponentProps } from "react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { Query as RequestFromNicovideoCheckQuery } from "~/components/Form/RequestMAD/FromNicovideo";
import { Query as RegisterFromNicovideoFormQuery } from "~/components/RegisterFromNicovideoForm";
import { Fragment as SourceFragment } from "~/components/RegisterFromNicovideoForm/OriginalSource";
import { Fragment as RegReqFragment } from "~/components/RegisterFromNicovideoForm/Request";
import { Query as TagSearcherQuery } from "~/components/TagSearcher2";
import { Fragment as TagSearcherSuggestItemFragment } from "~/components/TagSearcher2/SuggestItem";
import { Fragment as TagSearcherSuggestsFragment } from "~/components/TagSearcher2/Suggests";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import FormModal, { Current, FormModalContext } from "./FormModal";

const meta = {
  component: FormModal,
  render: ({ current, ...args }) => (
    <MockedUrqlProvider>
      <FormModalContext.Provider
        value={{
          current,
          open: action("open"),
          close: action("close"),
        }}
      >
        <FormModal {...args} />
      </FormModalContext.Provider>
    </MockedUrqlProvider>
  ),
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
} as Meta<
  ComponentProps<typeof FormModal> & { current: Exclude<Current, undefined> }
>;

export default meta;

export type Story = StoryObj<typeof meta>;

const mocksRegisterFromNicovideo = mswGql.query(
  RegisterFromNicovideoFormQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
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
              } as never,
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
);
export const ニコニコ動画から直接登録: Story = {
  args: {
    current: { type: "FROM_NICOVIDEO", source: "sm2057168" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRegisterFromNicovideo,
      },
    },
  },
};

const mocksRequestFromNicovideo = [
  mswGql.query(RequestFromNicovideoCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoRegistrationRequest: null,
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
      })
    )
  ),
];

export const ニコニコ動画からIDを入力してリクエスト: Story = {
  args: {
    current: { type: "REQUEST_FROM_NICOVIDEO" },
  },
  parameters: {
    msw: {
      handlers: { concern: mocksRequestFromNicovideo },
    },
  },
};

export const ニコニコ動画から直接リクエスト: Story = {
  args: {
    current: { type: "REQUEST_FROM_NICOVIDEO_WITH_ID", sourceId: "sm2057168" },
  },
  parameters: {
    msw: {
      handlers: { concern: mocksRequestFromNicovideo },
    },
  },
};
