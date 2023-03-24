import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment, RequestFormPart } from "./RequestFormPart";
import { Fragment as ToggleTagButtonFragment } from "./ToggleTagButton";

const meta = {
  component: RequestFormPart,
  args: {},
  render(args) {
    return <RequestFormPart {...args} />;
  },
} as Meta<typeof RequestFormPart>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "req1",
        title: "Title 1",
        checked: false,
        taggings: [
          {
            id: "tagging1",
            tag: {
              id: "tag1",
              ...makeFragmentData(
                {
                  id: "tag1",
                  ...makeFragmentData(
                    {
                      type: TagType.Music,
                      name: "Tag 1",
                      explicitParent: null,
                    },
                    CommonTagFragment
                  ),
                },
                ToggleTagButtonFragment
              ),
            },
          },
          {
            id: "tagging2",
            tag: {
              id: "tag2",
              ...makeFragmentData(
                {
                  id: "tag2",
                  ...makeFragmentData(
                    {
                      type: TagType.Character,
                      name: "Tag 2",
                      explicitParent: { id: "tag5", name: "Tag 4" },
                    },
                    CommonTagFragment
                  ),
                },
                ToggleTagButtonFragment
              ),
            },
          },
          {
            id: "tagging3",
            tag: {
              id: "tag3",
              ...makeFragmentData(
                {
                  id: "tag3",
                  ...makeFragmentData(
                    {
                      type: TagType.Character,
                      name: "Tag 3",
                      explicitParent: { id: "tag5", name: "Tag 4" },
                    },
                    CommonTagFragment
                  ),
                },
                ToggleTagButtonFragment
              ),
            },
          },
          {
            id: "tagging1",
            tag: {
              id: "tag4",
              ...makeFragmentData(
                {
                  id: "tag4",
                  ...makeFragmentData(
                    {
                      type: TagType.Copyright,
                      name: "Tag 4",
                      explicitParent: null,
                    },
                    CommonTagFragment
                  ),
                },
                ToggleTagButtonFragment
              ),
            },
          },
          {
            id: "tagging1",
            tag: {
              id: "tag5",
              ...makeFragmentData(
                {
                  id: "tag5",
                  ...makeFragmentData(
                    {
                      type: TagType.Style,
                      name: "Tag 5",
                      explicitParent: null,
                    },
                    CommonTagFragment
                  ),
                },
                ToggleTagButtonFragment
              ),
            },
          },
        ],
        semitaggings: [
          { id: "semitagging1", name: "Semitag 1", note: "Semitag 1 note" },
          { id: "semitagging2", name: "Semitag 2", note: null },
        ],
      },
      Fragment
    ),
  },
};
