import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { Fragment as CommonSemitagFragment } from "~/components/CommonSemitag";
import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment as RejectSucceededToastFragment } from "./RejectSucceededToast";
import { Fragment as ResolveSucceededToastFragment } from "./ResolveSucceededToast";
import SemitagRow, { Fragment } from "./SemitagRow";
import { Mutation as RejectMutation } from "./useReject";
import { Mutation as ResolveMutation } from "./useResolve";

const meta = {
  component: SemitagRow,
  args: {
    updateList: action("updateList"),
  },
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(ResolveMutation, (req, res, ctx) => {
          return res(
            ctx.data({
              resovleSemitag: {
                __typename: "ResolveSemitagSucceededPayload",
                ...makeFragmentData(
                  {
                    resolving: {
                      semitag: {
                        id: "s1",
                        checked: true,
                        ...makeFragmentData(
                          { name: "Semitag 1" },
                          CommonSemitagFragment
                        ),
                      },
                      resolveTo: {
                        tag: {
                          id: "t1",
                          ...makeFragmentData(
                            { name: "Tag 1", type: TagType.Character },
                            CommonTagFragment
                          ),
                        },
                      },
                    },
                  },
                  ResolveSucceededToastFragment
                ),
              },
            })
          );
        }),
        graphql.mutation(RejectMutation, (req, res, ctx) => {
          return res(
            ctx.data({
              rejectSemitag: {
                __typename: "RejectSemitagSucceededPayload",
                ...makeFragmentData(
                  {
                    rejecting: {
                      semitag: {
                        id: "s1",
                        checked: true,
                        ...makeFragmentData(
                          { name: "Semitag 1" },
                          CommonSemitagFragment
                        ),
                      },
                    },
                  },
                  RejectSucceededToastFragment
                ),
              },
            })
          );
        }),
      ],
    },
  },
} as Meta<typeof SemitagRow>;
export default meta;

export const NotChecked: StoryObj<typeof meta> = {
  name: "未チェックの仮タグ",
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "v1",
          title: "Video 1",
        },
        checked: false,
        suggestTags: {
          __typename: "SemitagSuggestTagsReturn",
          items: [
            {
              canResolveTo: true,
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: false,
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: true,
              name: { id: "t3name", name: "Tag 3", primary: true },
              tag: {
                id: "t3",
                ...makeFragmentData(
                  { name: "Tag 3", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};

export const Checked: StoryObj<typeof meta> = {
  name: "チェック済みの仮タグ",
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "v1",
          title: "Video 1",
        },
        checked: true,
        suggestTags: {
          __typename: "SemitagSuggestTagsReturn",
          items: [
            {
              canResolveTo: true,
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: false,
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};

export const LongVideoTitle: StoryObj<typeof meta> = {
  name: "長い動画タイトル",
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "v1",
          title:
            "涼宮ハルヒコラボ、開催中よ！SOS団、全員集合！しかも、イベントはフルボイス！ただの野球部には興味ありません！野球型青春体験ゲーム、八月のシンデレラナイン！",
        },
        checked: false,
        suggestTags: {
          __typename: "SemitagSuggestTagsReturn",
          items: [
            {
              canResolveTo: true,
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: false,
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: true,
              name: { id: "t3name", name: "Tag 3", primary: true },
              tag: {
                id: "t3",
                ...makeFragmentData(
                  { name: "Tag 3", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};
