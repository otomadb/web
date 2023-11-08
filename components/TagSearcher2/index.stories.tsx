import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";
import { ComponentProps } from "react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import TagSearcher, { Query } from ".";
import { Fragment as SuggestItemFragment } from "./SuggestItem";
import { Fragment as SuggestsFragment } from "./Suggests";

const meta = {
  component: TagSearcher,
  render: (args) => (
    <MockedUrqlProvider>
      <TagSearcher {...args} />
    </MockedUrqlProvider>
  ),
  args: {
    style: { width: 320 },
    size: "medium",
    handleSelect: action("handleSelect"),
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                ...makeFragmentData(
                  {
                    items: [...new Array(3)].map((_, i) => ({
                      ...makeFragmentData(
                        {
                          name: {
                            id: `tagname:${i + 1}`,
                            primary: true,
                            name: `Tag ${i + 1}`,
                          },
                          tag: {
                            id: `tag:${i + 1}`,
                            ...makeFragmentData(
                              {
                                name: `Tag ${i + 1}`,
                                type: TagType.Character,
                                explicitParent: {
                                  id: "tag:0",
                                  name: "Tag 0",
                                },
                              },
                              CommonTagFragment
                            ),
                          },
                        },
                        SuggestItemFragment
                      ),
                    })),
                  },
                  SuggestsFragment
                ),
              },
            })
          )
        ),
      ],
    },
  },
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

export const 適当なクエリを入力: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const 取得中: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(Query, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const 検索候補がない: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                ...makeFragmentData({ items: [] }, SuggestsFragment),
              },
            })
          )
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const 検索候補を選択: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");

    const items = await canvas.findAllByLabelText("検索候補");
    await userEvent.click(items[0]);
  },
};

const Additional: ComponentProps<typeof TagSearcher>["Additional"] = ({
  query,
}) => <span style={{ color: "white" }}>{query}</span>;

export const 別の選択肢を提示: Story = {
  args: { Additional },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
