import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "@storybook/test";
import { userEvent, within } from "@storybook/testing-library";
import { waitFor } from "@storybook/testing-library";
import { graphql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { isTest } from "~/test/isTest";

import TagSearcher, { AlwaysSelectableBehavior, Query } from ".";

export const mockTagSearcher = graphql.query(Query, (req, res, ctx) =>
  res(
    ctx.data({
      searchTags: {
        items: [...new Array(req.variables.limit || 3)].map((_, i) => ({
          tag: {
            id: `searched-tag:${i}`,
            ...makeFragmentData(
              {
                name: `Tag ${i}`,
                belongTo: { keyword: "copyright" },
                explicitParent: null,
              },
              CommonTagFragment
            ),
          },
          name: {
            id: `searched-tag:${i}:name:1`,
            primary: true,
            name: `Tag ${i}`,
          },
        })),
      },
    })
  )
);

export const mockNoResult = graphql.query(Query, (req, res, ctx) =>
  res(
    ctx.data({
      searchTags: {
        items: [],
      },
    })
  )
);

export const mockTagSearcherNothing = graphql.query(Query, (req, res, ctx) =>
  res(ctx.data({ searchTags: { items: [] } }))
);

export const mockTagSearcherLoading = graphql.query(Query, (req, res, ctx) =>
  res(ctx.delay("infinite"))
);

const meta = {
  component: TagSearcher,
  args: {
    style: { width: 320 },
    size: "medium",
    behavior: {
      mode: "simple",
      handleSelect: action("handleSelect"),
    },
  },
  parameters: { msw: { handlers: [mockTagSearcher] } },
  excludeStories: /^mock/,
} as Meta<typeof TagSearcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    style: { width: 240 },
    size: "small",
  },
};

export const Medium: Story = {};

export const Large: Story = {
  args: {
    style: { width: 480 },
    size: "large",
  },
};

export const InputQuery: Story = {
  name: "適当なクエリを入力",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const LoadingSuggests: Story = {
  name: "取得中",
  args: {
    initQuery: "Test",
  },
  parameters: { msw: { handlers: [mockTagSearcherLoading] } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));
  },
};

export const NoSuggests: Story = {
  name: "検索候補がない",
  args: {
    initQuery: "Test",
  },
  parameters: { msw: { handlers: [mockNoResult] } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));
  },
};

/*
export const SelectSuggests: Story = {
  name: "検索候補を選択",
  args: {
    initQuery: "Test",
  },
  play: async ({ canvasElement }) => {
    if (isTest) return;

    const canvas = within(canvasElement);

    await waitFor(async () => {
      const items = await canvas.findAllByLabelText("検索候補");
      await userEvent.click(items[0]);
    });
  },
};
*/

export const AdditionalOption: Story = {
  name: "別の選択肢を提示",
  args: {
    initQuery: "Test",
    Additional: ({ query }) => <div>{query}を仮タグとして追加</div>,
  },
  play: async ({ canvasElement }) => {
    if (isTest) return;

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));

    await waitFor(() => {
      expect(canvas.getByText("Testを仮タグとして追加")).toBeDefined();
    });
  },
};

const behaviorAlwaysSelectable = {
  mode: "always-selectable",
  isSelected: (id) => id === "searched-tag:0",
  handleSelect: fn(),
  Selected: ({ Tag }) => <>{Tag}は既に選択されています</>,
  NotSelected: ({ Tag }) => <>{Tag}</>,
} satisfies AlwaysSelectableBehavior;

export const AlreadySelected: Story = {
  name: "外部では既に選択されている",
  args: {
    initQuery: "Test",
    behavior: behaviorAlwaysSelectable,
  },
  play: async ({ canvasElement }) => {
    if (isTest) return;

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));

    await waitFor(() => {
      expect(canvas.getByLabelText("Tag 0")).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });
  },
};

export const AlreadySelectedButSelectable: Story = {
  name: "外部では既に選択されているが，選択可能",
  args: {
    initQuery: "Test",
    behavior: behaviorAlwaysSelectable,
  },
  play: async ({ canvasElement, args }) => {
    if (isTest) return;

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox"));

    await waitFor(async () => {
      await userEvent.click(canvas.getByLabelText("Tag 0"));
      expect(
        (args.behavior as AlwaysSelectableBehavior).handleSelect
      ).toBeCalled();
    });
  },
};
