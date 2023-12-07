import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { BilibiliRequestPageLinkFragment } from "~/app/(v2)/requests/bilibili/[sourceId]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { mockTagSearcher } from "../Nicovideo/NicovideoRegister.stories";
import { BilibiliOriginalSourceFragment } from "./BilibiliOriginalSource";
import BilibiliRequestForm, {
  BilibiliRequestFormOriginalSourceFragment,
  BilibiliRequestMutation,
} from "./BilibiliRequestForm";

export const mockMutationSuccess = mockGql.mutation(
  BilibiliRequestMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestBilibiliRegistration: {
          __typename: "RequestBilibiliRegistrationSucceededPayload",
          request: {
            id: "request:1",
            sourceId: "BV1xx411c7mu",
            ...makeFragmentData(
              { sourceId: "BV1xx411c7mu" },
              BilibiliRequestPageLinkFragment
            ),
          },
        },
      })
    )
);

export const mockSourceFragment = makeFragmentData(
  {
    sourceId: "BV1xx411c7mu",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    title: "Title 1",
    thumbnailUrl: "/thumbnail.jpg",
    ...makeFragmentData(
      {
        sourceId: "BV1xx411c7mu",
        url: "https://www.bilibili.com/video/BV1xx411c7mu",
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
      BilibiliOriginalSourceFragment
    ),
  },
  BilibiliRequestFormOriginalSourceFragment
);

const meta = {
  excludeStories: /^mock/,
  component: BilibiliRequestForm,
  args: {
    sourceFragment: mockSourceFragment,
    style: {
      width: 640,
      height: 640,
    },
    handleSuccess: action("success"),
    handleCancel: action("cancel"),
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockMutationSuccess],
        misc: [mockTagSearcher],
      },
    },
  },
} as Meta<typeof BilibiliRequestForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const NoTitle: Story = {
  name: "タイトル無しを許容しない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.clear(canvas.getByRole("textbox", { name: "タイトル" }));

    expect(
      canvas.getByRole("button", { name: "リクエストする" })
    ).toBeDisabled();
  },
};
