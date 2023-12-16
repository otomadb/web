import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { FormModalContext } from "~/components/FormWidget";
import { makeFragmentData } from "~/gql";

import AppSideNavMenu, { AppSideNavMenuFragment } from "./AppSideNavMenu";

const meta = {
  component: AppSideNavMenu,
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
} satisfies Meta<typeof AppSideNavMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NogLoggedIn: Story = {
  name: "未ログイン時",
  args: {
    fragment: makeFragmentData({ viewer: null }, AppSideNavMenuFragment),
  },
};

export const Normal: Story = {
  name: "一般ユーザー",
  args: {
    fragment: makeFragmentData(
      { viewer: { id: "u1", isAdmin: false, isEditor: false } },
      AppSideNavMenuFragment
    ),
  },
};

export const Editor: Story = {
  name: "編集者",
  args: {
    fragment: makeFragmentData(
      { viewer: { id: "u1", isAdmin: false, isEditor: true } },
      AppSideNavMenuFragment
    ),
  },
};

export const Admin: Story = {
  name: "管理者",
  args: {
    fragment: makeFragmentData(
      { viewer: { id: "u1", isAdmin: true, isEditor: true } },
      AppSideNavMenuFragment
    ),
  },
};
