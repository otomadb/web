import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import SearchContents, { AppSideNavQuery } from ".";
import AppSideNav from ".";

const meta = {
  component: AppSideNav,
  args: {
    style: {
      width: 300,
      height: 720,
    },
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <AppSideNav {...args} />
      </MockedUrqlProvider>
    );
  },
} satisfies Meta<typeof SearchContents>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(ctx.data({ viewer: { isAdmin: false, isEditor: false } }))
          ),
        ],
      },
    },
  },
};
export const Editor: Story = {
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(ctx.data({ viewer: { isAdmin: false, isEditor: true } }))
          ),
        ],
      },
    },
  },
};
export const Admin: Story = {
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(ctx.data({ viewer: { isAdmin: true, isEditor: true } }))
          ),
        ],
      },
    },
  },
};
