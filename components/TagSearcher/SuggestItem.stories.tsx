import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import SuggestItem, { Fragment } from "./SuggestItem";

const meta = {
  component: SuggestItem,
  args: {
    handleSelect: action("handleSelect"),
  },
} as Meta<typeof SuggestItem>;

export default meta;

export const PrimaryName: StoryObj<typeof meta> = {
  name: "メインのタグ名",
  args: {
    fragment: makeFragmentData(
      {
        name: {
          id: "n1",
          primary: true,
          name: "ぼっち・ざ・ろっく！",
        },
        tag: {
          id: "t1",
          ...makeFragmentData(
            {
              name: "ぼっち・ざ・ろっく！",
              type: TagType.Copyright,
              explicitParent: null,
            },
            CommonTagFragment
          ),
        },
      },
      Fragment
    ),
  },
};

export const NotPrimaryName: StoryObj<typeof meta> = {
  name: "メインのタグ名ではない",
  args: {
    fragment: makeFragmentData(
      {
        name: {
          id: "n1",
          primary: false,
          name: "ぼっち・ざ・まっど！",
        },
        tag: {
          id: "t1",
          ...makeFragmentData(
            {
              name: "ぼっち・ざ・ろっく！",
              type: TagType.Copyright,
              explicitParent: null,
            },
            CommonTagFragment
          ),
        },
      },
      Fragment
    ),
  },
};
