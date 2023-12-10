import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import CommonTag, { CommonTagFragment } from ".";

export const mockCommonTag = ({ belongTo }: { belongTo: undefined | string }) =>
  makeFragmentData(
    {
      id: "tag:1",
      name: "Tag 1",
      belongTo: belongTo ? { keyword: belongTo } : undefined,
      explicitParent: { id: "tag:1:ex-parent:1", name: "Tag 1 Parent" },
    },
    CommonTagFragment
  );

const meta = {
  component: CommonTag,
  tags: ["autodocs"],
  args: {
    handleToggle: action("handleToggle"),
    size: "small",
    hoverable: false,
    disabled: false,
  },
  parameters: {
    layout: "centered",
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
  excludeStories: /^mock/,
} as Meta<typeof CommonTag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Character: Story = {
  args: { fragment: mockCommonTag({ belongTo: "character" }) },
};

export const Class: Story = {
  args: { fragment: mockCommonTag({ belongTo: "class" }) },
};

export const Copyright: Story = {
  args: { fragment: mockCommonTag({ belongTo: "copyright" }) },
};

export const Event: Story = {
  args: { fragment: mockCommonTag({ belongTo: "event" }) },
};

export const Music: Story = {
  args: { fragment: mockCommonTag({ belongTo: "music" }) },
};

export const Phrase: Story = {
  args: { fragment: mockCommonTag({ belongTo: "phrase" }) },
};

export const Series: Story = {
  args: { fragment: mockCommonTag({ belongTo: "series" }) },
};

export const Style: Story = {
  args: { fragment: mockCommonTag({ belongTo: "style" }) },
};

export const Technique: Story = {
  args: { fragment: mockCommonTag({ belongTo: "technique" }) },
};

export const RealPerson: Story = {
  args: { fragment: mockCommonTag({ belongTo: "realperson" }) },
};
