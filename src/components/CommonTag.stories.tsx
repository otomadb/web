import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { CommonTag, Fragment } from "./CommonTag";

const meta = {
  component: CommonTag,
  args: {
    handleToggle: action("handleToggle"),
  },
} as Meta<typeof CommonTag>;
export default meta;

export const Character: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Character,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Class: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Class,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Copyright: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Copyright,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Event: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Event,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Music: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Music,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Phrase: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Phrase,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Series: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Series,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Style: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Style,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Subtle: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Subtle,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Tactics: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Tactics,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};

export const Unknown: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Unknown,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      Fragment
    ),
  },
};
