import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import clsx from "clsx";
import { graphql } from "msw";
import { ComponentProps } from "react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { TagSearcher } from ".";
import { Query as SearchBoxQuery } from "./SearchBox";
import { Fragment as SuggestItemFragment } from "./SuggestItem";
import { Fragment as SuggestsFragment } from "./Suggests";

const meta = {
  component: TagSearcher,
  render: (args) => (
    <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
      <TagSearcher {...args} style={{ width: "320px" }} />
    </UrqlProvider>
  ),
  args: {
    handleSelect: action("handleSelect"),
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchBoxQuery, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                ...makeFragmentData(
                  {
                    items: [
                      {
                        ...makeFragmentData(
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
                          SuggestItemFragment
                        ),
                      },
                      {
                        ...makeFragmentData(
                          {
                            name: {
                              id: "n2",
                              primary: true,
                              name: "後藤ひとり",
                            },
                            tag: {
                              id: "t2",
                              ...makeFragmentData(
                                {
                                  name: "後藤ひとり",
                                  type: TagType.Character,
                                  explicitParent: {
                                    id: "t1",
                                    name: "ぼっち・ざ・ろっく！",
                                  },
                                },
                                CommonTagFragment
                              ),
                            },
                          },
                          SuggestItemFragment
                        ),
                      },
                      {
                        ...makeFragmentData(
                          {
                            name: {
                              id: "n3",
                              primary: true,
                              name: "伊地知虹夏",
                            },
                            tag: {
                              id: "t3",
                              ...makeFragmentData(
                                {
                                  name: "伊地知虹夏",
                                  type: TagType.Character,
                                  explicitParent: {
                                    id: "t1",
                                    name: "ぼっち・ざ・ろっく！",
                                  },
                                },
                                CommonTagFragment
                              ),
                            },
                          },
                          SuggestItemFragment
                        ),
                      },
                    ],
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

export const Primary: StoryObj<typeof meta> = {};

export const InputQuery: StoryObj<typeof TagSearcher> = {
  name: "適当なクエリを入力",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const Fetching: StoryObj<typeof TagSearcher> = {
  name: "取得中",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchBoxQuery, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const Nothing: StoryObj<typeof TagSearcher> = {
  name: "検索候補がない",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchBoxQuery, (req, res, ctx) =>
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

export const Select: StoryObj<typeof TagSearcher> = {
  name: "検索候補を選択",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");

    const items = await canvas.findAllByLabelText("検索候補");
    await userEvent.click(items[0]);
  },
};

const Optional: ComponentProps<typeof TagSearcher>["Optional"] = ({
  query,
}) => (
  <div>
    <button
      type="button"
      aria-label="仮タグとして追加"
      className={clsx(
        ["bg-white"],
        ["border"],
        ["px-2", "py-0.5"],
        ["text-xs"],
        ["text-left"]
      )}
      onClick={(e) => {
        action("selectOptional")(query);
        e.currentTarget.blur();
      }}
    >
      <span>{query}</span>
      を仮タグとして追加
    </button>
  </div>
);

export const OptionalChoice: StoryObj<typeof meta> = {
  name: "別の選択肢を提示",
  args: {
    Optional,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const FetchingOptionalChoice: StoryObj<typeof meta> = {
  name: "検索しつつ別の選択肢を提示",
  args: {
    Optional,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchBoxQuery, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const OptionalChoiceSelect: StoryObj<typeof meta> = {
  name: "別の選択肢を選択",
  args: {
    Optional,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");

    const optional = await canvas.findByLabelText("仮タグとして追加");
    await userEvent.click(optional);
  },
};
