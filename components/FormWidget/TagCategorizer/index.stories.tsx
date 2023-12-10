import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";

import TagCategorizerForm, { QueryFetchCategories } from ".";

export const mockMutationSuccess = mockGql.query(
  QueryFetchCategories,
  (req, res, ctx) =>
    res(
      ctx.data({
        getTag: {
          id: "tag:1",
          allBelongTo: [
            {
              group: {
                keyword: "character",
              },
            },
          ],
          ...makeFragmentData(
            {
              name: "tag",
              explicitParent: null,
              belongTo: { keyword: "character" },
            },
            CommonTagFragment
          ),
        },
        getAllAbstractGroups: [
          { keyword: "character", name: "キャラクター" },
          { keyword: "class", name: "クラス" },
          { keyword: "music", name: "楽曲" },
          { keyword: "copyright", name: "作品" },
          { keyword: "event", name: "イベント" },
          { keyword: "phrase", name: "フレーズ" },
          { keyword: "series", name: "シリーズ" },
          { keyword: "style", name: "スタイル" },
          { keyword: "tactics", name: "戦術" },
        ],
      })
    )
);

const meta = {
  excludeStories: /^mock/,
  component: TagCategorizerForm,
  args: {
    style: {
      width: 640,
      height: 360,
    },
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockMutationSuccess],
      },
    },
  },
} as Meta<typeof TagCategorizerForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
