import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { within } from "@storybook/testing-library";
import { waitFor } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { YouMylistPageLinkFragment } from "~/app/[locale]/(application)/me/mylists/[slug]/Link";
import { makeFragmentData } from "~/gql";

import CreateMylistForm, { MutationCreateMylist } from ".";

export const mockMylistSuccessful = mockGql.mutation(
  MutationCreateMylist,
  (req, res, ctx) =>
    res(
      ctx.data({
        createMylist: {
          __typename: "CreateMylistSucceededPayload",
          mylist: {
            id: `mylist:${req.variables.slug}`,
            ...makeFragmentData(
              { slug: req.variables.slug, isLikeList: false },
              YouMylistPageLinkFragment
            ),
          },
        },
      })
    )
);

const meta = {
  excludeStories: /^mock/,
  component: CreateMylistForm,
  args: {
    style: {
      width: 640,
      height: 360,
    },
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockMylistSuccessful],
      },
    },
  },
} as Meta<typeof CreateMylistForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PickNone: Story = {
  name: "タイトルとキーワードを入力してマイリストを作成する",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "管理しやすいキーワード" }),
      "test"
    );

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeEnabled();
    });

    await userEvent.click(canvas.getByRole("button", { name: "作成する" }));
  },
};

export const PickPublic: Story = {
  name: "タイトルとキーワードを入力し，範囲を公開にしてマイリストを作成する",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "管理しやすいキーワード" }),
      "test"
    );
    await userEvent.click(canvas.getByRole("radio", { name: "公開" }));

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeEnabled();
    });

    await userEvent.click(canvas.getByRole("button", { name: "作成する" }));
  },
};

export const PickPrivate: Story = {
  name: "タイトルとキーワードを入力し，範囲を非公開にしてマイリストを作成する",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "管理しやすいキーワード" }),
      "test"
    );
    await userEvent.click(canvas.getByRole("radio", { name: "非公開" }));

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeEnabled();
    });

    await userEvent.click(canvas.getByRole("button", { name: "作成する" }));
  },
};

export const TitleEmpty: Story = {
  name: "titleが空文字列",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const $t = canvas.getByRole("textbox", { name: "タイトル" });
    await userEvent.click($t);
    $t.blur();

    await userEvent.type(
      canvas.getByRole("textbox", { name: "管理しやすいキーワード" }),
      "test"
    );

    await waitFor(async () => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(
        canvas.getByText("1文字以上50文字以下で入力してください")
      ).toBeDefined();
    });
  },
};

export const TitleNotMax: Story = {
  name: "titleが規定文字数以下ではない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const $t = canvas.getByRole("textbox", { name: "タイトル" });
    await userEvent.type($t, "t".repeat(51));
    $t.blur();

    await userEvent.type(
      canvas.getByRole("textbox", { name: "管理しやすいキーワード" }),
      "test"
    );

    await waitFor(async () => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(
        canvas.getByText("1文字以上50文字以下で入力してください")
      ).toBeDefined();
    });
  },
};

export const SlugEmpty: Story = {
  name: "slugが空文字列",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    const inputSlug = canvas.getByRole("textbox", {
      name: "管理しやすいキーワード",
    });
    await userEvent.click(inputSlug);
    inputSlug.blur();

    await waitFor(async () => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(
        canvas.getByText("1文字以上50文字以下で入力してください")
      ).toBeDefined();
    });
  },
};

export const SlugNotMax: Story = {
  name: "slugが規定文字数以下ではない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    const inputSlug = canvas.getByRole("textbox", {
      name: "管理しやすいキーワード",
    });
    await userEvent.type(inputSlug, "t".repeat(51));
    inputSlug.blur();

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(
        canvas.getByText("1文字以上50文字以下で入力してください")
      ).toBeDefined();
    });
  },
};

export const SlugNotAZ: Story = {
  name: "slugが半角英数字ではない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    const inputSlug = canvas.getByRole("textbox", {
      name: "管理しやすいキーワード",
    });
    await userEvent.type(inputSlug, "テスト");
    inputSlug.blur();

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(
        canvas.getByText("半角英数字のみで入力してください")
      ).toBeDefined();
    });
  },
};

export const SlugIsLikes: Story = {
  name: 'slugが"likes"の場合は無効',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "Test"
    );
    const inputSlug = canvas.getByRole("textbox", {
      name: "管理しやすいキーワード",
    });
    await userEvent.type(inputSlug, "likes");
    inputSlug.blur();

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "作成する" })).toBeDisabled();
      expect(canvas.getByText('"likes"は使用できません')).toBeDefined();
    });
  },
};
