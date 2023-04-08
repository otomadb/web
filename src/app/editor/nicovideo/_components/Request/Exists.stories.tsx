import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { RegisterContext } from "../Original/Context";
import { Fragment as TagButtonFragment } from "../TagButton";
import { RequestContext } from "./Context";
import { Exists, Fragment } from "./Exists";

const meta = {
  component: Exists,
  args: {},
  render(args) {
    return (
      <RegisterContext.Provider
        value={{
          setTitle: action("setTitle"),
          setSourceId: action("setSourceId"),
          setThumbnailUrl: action("setThumbnailUrl"),
          toggleSemitag: action("toggleSemitag"),
          toggleTag: action("toggleTag"),
        }}
      >
        <RequestContext.Provider
          value={{ setRequestId: action("setRequestId") }}
        >
          <Exists {...args} />
        </RequestContext.Provider>
      </RegisterContext.Provider>
    );
  },
} as Meta<typeof Exists>;
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
                TagButtonFragment
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
                TagButtonFragment
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
                TagButtonFragment
              ),
            },
          },
          {
            id: "tagging4",
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
                TagButtonFragment
              ),
            },
          },
          {
            id: "tagging5",
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
                TagButtonFragment
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
