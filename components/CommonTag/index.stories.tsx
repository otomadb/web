import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import CommonTag, { CommonTagFragment } from ".";

const meta = {
  component: CommonTag,
  args: {
    handleToggle: action("handleToggle"),
    size: "small",
    hoverable: true,
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof CommonTag>;
export default meta;

export const Character: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "character" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Class: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "class" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Copyright: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "copyright" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Event: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "event" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Music: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "music" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Phrase: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "phrase" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Series: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "series" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Style: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "style" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};

export const Tactics: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        belongTo: { keyword: "tactics" },
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
  },
};
