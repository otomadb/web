import { ResultOf } from "@graphql-typed-document-node/core";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { MadPageLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import { UserPageLinkFragment } from "~/app/(v2)/users/[name]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { Query as TagSearcherQuery } from "~/components/TagSearcher";
import { SuggestItemFragment } from "~/components/TagSearcher/SuggestItem";
import { SuggestsFragment } from "~/components/TagSearcher/Suggests";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { NicovideoOriginalSourceFragment } from "./NicovideoOriginalSource";
import NicovideoRegisterForm, {
  NicovideoRegisterFormMutation,
  NicovideoRegisterFormRequestFragment,
  NicovideoRegisterOriginalSourceFragment,
} from "./NicovideoRegisterForm";

export const mockMutationSuccess = mockGql.mutation(
  NicovideoRegisterFormMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        registerVideoFromNicovideo: {
          __typename: "RegisterVideoFromNicovideoSucceededPayload",
          video: {
            id: "video:1",
            title: "Title 1",
            ...makeFragmentData({ serial: 1 }, MadPageLinkFragment),
          },
        },
      })
    )
);

export const mockSourceFragment = makeFragmentData(
  {
    sourceId: "sm2057168",
    url: "https://www.nicovideo.jp/watch/sm2057168",
    info: {
      title: "Title 1",
      thumbnailUrl: "/thumbnail.jpg",
    },
    ...makeFragmentData(
      {
        sourceId: "sm2057168",
        url: "https://www.nicovideo.jp/watch/sm2057168",
        info: {
          title: "Title 1",
          thumbnailUrl: "/thumbnail.jpg",
          tags: [...new Array(11)].map((_, i) => ({
            name: `source tag ${i}`,
            searchTags: {
              items: [...new Array(3)].map((_, j) => ({
                tag: {
                  id: `tag:${i}:${j}`,
                  ...makeFragmentData(
                    { name: `Tag.${i}.${j}`, type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              })),
            },
          })),
        },
      },
      NicovideoOriginalSourceFragment
    ),
  },
  NicovideoRegisterOriginalSourceFragment
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
    } as ResultOf<typeof NicovideoRegisterFormRequestFragment>["requestedBy"],
    taggings: [
      {
        id: "tagging:1",
        tag: {
          id: "tag:1",
          ...makeFragmentData(
            { name: "Requested Tag 1", type: TagType.Character },
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
  NicovideoRegisterFormRequestFragment
);

export const mockTagSearcher = mockGql.query(
  TagSearcherQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        searchTags: {
          ...makeFragmentData(
            {
              items: [...new Array(3)].map((_, i) => ({
                ...makeFragmentData(
                  {
                    name: {
                      id: `searched-tag:${i}:name`,
                      primary: false,
                      name: `Searched Tag ${i}`,
                    },
                    tag: {
                      id: `searched-tag:${i}`,
                      ...makeFragmentData(
                        {
                          name: `Searched Tag ${i}`,
                          type: TagType.Character,
                          explicitParent: null,
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
);

const meta = {
  excludeStories: /^mock/,
  component: NicovideoRegisterForm,
  args: {
    style: {
      width: 640,
      height: 640,
    },
    handleSuccess: action("success"),
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
} as Meta<typeof NicovideoRegisterForm>;
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
