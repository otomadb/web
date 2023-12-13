import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { FormModalContext } from "~/components/FormWidget";

import AppSideNav, { AppSideNavQuery } from "./AppSideNav";

const meta = {
  component: AppSideNav,
  args: {
    style: {
      width: 300,
      height: 640,
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <FormModalContext.Provider
        value={{
          current: undefined,
          open: () =>
            parameters.openFormModal === "function"
              ? parameters.openFormModal
              : action("Open FormWidget"),
          close: () => action("Close FormWidget"),
        }}
      >
        <Story />
      </FormModalContext.Provider>
    ),
  ],
} satisfies Meta<typeof AppSideNav>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Fetching: Story = {
  name: "読み込み中",
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(ctx.delay("infinite"))
          ),
        ],
      },
    },
  },
};

export const NogLoggedIn: Story = {
  name: "未ログイン時",
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(ctx.data({ viewer: null }))
          ),
        ],
      },
    },
  },
};

export const Normal: Story = {
  name: "一般ユーザー",
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(
              ctx.data({
                viewer: { id: "u1", isAdmin: false, isEditor: false },
              })
            )
          ),
        ],
      },
    },
  },
};

export const Editor: Story = {
  name: "編集者",
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(
              ctx.data({ viewer: { id: "u1", isAdmin: false, isEditor: true } })
            )
          ),
        ],
      },
    },
  },
};

export const Admin: Story = {
  name: "管理者",
  parameters: {
    msw: {
      handlers: {
        main: [
          graphql.query(AppSideNavQuery, (req, res, ctx) =>
            res(
              ctx.data({ viewer: { id: "u1", isAdmin: true, isEditor: true } })
            )
          ),
        ],
      },
    },
  },
};
