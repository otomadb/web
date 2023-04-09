import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentProps } from "react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { TagSearcher } from ".";
import {
  mockTagSearcher,
  mockTagSearcherLoading,
  mockTagSearcherNothing,
} from "./index.mocks";

const meta = {
  component: TagSearcher,
  render: (args) => (
    <UrqlProvider
      value={createUrqlClient({ url: "/graphql", exchanges: [fetchExchange] })}
    >
      <TagSearcher {...args} />
    </UrqlProvider>
  ),
  args: {
    style: { width: "320px" },
    handleSelect: action("handleSelect"),
  },
  parameters: {
    msw: {
      handlers: [mockTagSearcher],
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
      handlers: [mockTagSearcherLoading],
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
      handlers: [mockTagSearcherNothing],
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
    <p>{query}</p>
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
      handlers: [mockTagSearcherLoading],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
