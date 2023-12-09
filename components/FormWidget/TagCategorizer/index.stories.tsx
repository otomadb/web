import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType, TypeCategoryTagType } from "~/gql/graphql";

import { QueryFetchCategories, TagCategorizerForm } from ".";

export const mockMutationSuccess = mockGql.query(
  QueryFetchCategories,
  (req, res, ctx) =>
    res(
      ctx.data({
        getTag: {
          id: "tag:1",
          parents: {
            nodes: [
              {
                parent: {
                  id: "ctag:charactor",
                  name: "ctag",
                  isCategoryTag: true,
                },
              },
            ],
          },
          ...makeFragmentData(
            {
              name: "tag",
              type: TagType.Character,
              explicitParent: null,
            },
            CommonTagFragment
          ),
        },
        getAllTypeCategoryTag: [
          {
            type: TypeCategoryTagType.Character,
            tag: { id: "ctag:charactor", name: "キャラクター" },
          },
          {
            type: TypeCategoryTagType.Class,
            tag: { id: "ctag:music", name: "クラス" },
          },
          {
            type: TypeCategoryTagType.Copyright,
            tag: { id: "ctag:copyright", name: "作品" },
          },
          {
            type: TypeCategoryTagType.Event,
            tag: { id: "ctag:event", name: "イベント" },
          },
          {
            type: TypeCategoryTagType.Music,
            tag: { id: "ctag:music", name: "曲" },
          },
          {
            type: TypeCategoryTagType.Phrase,
            tag: { id: "ctag:phrase", name: "フレーズ" },
          },
          {
            type: TypeCategoryTagType.Series,
            tag: { id: "ctag:series", name: "シリーズ" },
          },
          {
            type: TypeCategoryTagType.Style,
            tag: { id: "ctag:style", name: "スタイル" },
          },
          {
            type: TypeCategoryTagType.Tactics,
            tag: { id: "ctag:tactics", name: "戦術" },
          },
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
