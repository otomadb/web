import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { MadPageLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import { UserPageLinkFragment } from "~/app/(v2)/users/[name]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.stories";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";

import { SoundcloudRegisterOriginalSourceFragment } from "./SoundcloudOriginalSource";
import SoundcloudRegisterForm, {
  SoundcloudRegisterFormRequestFragment,
  SoundcloudRegisterMutation,
} from "./SoundcloudRegisterForm";

export const mockMutationSuccess = mockGql.mutation(
  SoundcloudRegisterMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        registerSoundcloudMAD: {
          __typename: "RegisterSoundcloudMADSucceededPayload",
          mad: {
            id: "mad:1",
            title: "Title 1",
            ...makeFragmentData({ serial: 1 }, MadPageLinkFragment),
          },
        },
      })
    )
);

export const mockSourceFragment = makeFragmentData(
  {
    title: "Title 1",
    thumbnailUrl: "/thumbnail.jpg",
    sourceId: "keigoooo/hyperflip-donaldcore",
    url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    ...makeFragmentData(
      {
        sourceId: "keigoooo/hyperflip-donaldcore",
        url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
        title: "Title 1",
        thumbnailUrl: "/thumbnail.jpg",
      },
      SoundcloudRegisterOriginalSourceFragment
    ),
  },
  SoundcloudRegisterOriginalSourceFragment
);

export const mockRequestFragment = makeFragmentData(
  {
    id: "request:1",
    title: "Title 1",
    requestedBy: {
      id: "user:1",
      displayName: "User 1",
      ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
      ...makeFragmentData(
        { displayName: "User 1", icon: "/icon.png" },
        UserIconFragment
      ),
    },
    taggings: [
      {
        id: "tagging:1",
        tag: {
          id: "tag:1",
          ...makeFragmentData(
            { name: "Requested Tag 1", belongTo: { keyword: "character" } },
            CommonTagFragment
          ),
        },
      },
    ],
    semitaggings: [
      { id: "semitagging:1", name: "Requested Semitag 1" },
      { id: "semitagging:2", name: "Requested Semitag 2" },
      { id: "semitagging:3", name: "Requested Semitag 3" },
    ],
  },
  SoundcloudRegisterFormRequestFragment
);

const meta = {
  excludeStories: /^mock/,
  component: SoundcloudRegisterForm,
  args: {
    style: {
      width: 640,
      height: 640,
    },
    initThumbnailUrl: "/960x540.jpg",
    handleCancel: action("cancel"),
    sourceFragment: mockSourceFragment,
    requestFragment: mockRequestFragment,
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockMutationSuccess],
        misc: [mockTagSearcher],
      },
    },
  },
} as Meta<typeof SoundcloudRegisterForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithRequest: Story = {
  args: {},
};

export const NoRequest: Story = {
  args: {
    requestFragment: undefined,
  },
};

export const NoTitle: Story = {
  name: "タイトル無しを許容しない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.clear(canvas.getByRole("textbox", { name: "タイトル" }));

    expect(canvas.getByRole("button", { name: "登録する" })).toBeDisabled();
  },
};
