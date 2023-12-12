import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { NicovideoRequestLinkFragment } from "~/app/(v2)/requests/nicovideo/[sourceId]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.stories";
import { makeFragmentData } from "~/gql";

import { NicovideoOriginalSourceFragment } from "./NicovideoOriginalSource";
import NicovideoRequestForm, {
  Mutation as NicovideoRequestMutation,
  NicovideoRequestFormOriginalSourceFragment,
} from "./NicovideoRequestForm";

export const mockMutationSuccess = mockGql.mutation(
  NicovideoRequestMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestNicovideoRegistration: {
          __typename: "RequestNicovideoRegistrationSucceededPayload",
          request: {
            id: "request:1",
            sourceId: "sm2057168",
            ...makeFragmentData(
              { sourceId: "sm2057168" },
              NicovideoRequestLinkFragment
            ),
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
                    {
                      name: `Tag.${i}.${j}`,
                      belongTo: { keyword: "character" },
                    },
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
  NicovideoRequestFormOriginalSourceFragment
);

const meta = {
  excludeStories: /^mock/,
  component: NicovideoRequestForm,
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
} as Meta<typeof NicovideoRequestForm>;
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
