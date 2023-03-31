import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { makeFragmentData } from "~/gql";

import { Query, SearchBox } from "./SearchBox";
import { Fragment as SuggestsFragment } from "./Suggests";

const meta = {
  component: SearchBox,
  render: (args) => (
    <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
      <SearchBox {...args} style={{ width: "320px" }} />
    </UrqlProvider>
  ),
  args: {
    query: "",
    setResult: action("setResult"),
    setUpstream: action("setQuery"),
  },
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
} as Meta<typeof SearchBox>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};

export const Fetching: StoryObj<typeof meta> = {
  name: "取得中",
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

export const InputQuery: StoryObj<typeof meta> = {
  name: "何か入力",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};
