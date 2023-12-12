import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { YoutubeRequestPageLinkFragment } from "~/app/(v2)/requests/youtube/[sourceId]/Link";
import { mockTagSearcher } from "~/components/TagSearcher/index.stories";
import { makeFragmentData } from "~/gql";

import { YoutubeRegisterOriginalSourceFragment } from "./YoutubeOriginalSource";
import YoutubeRequestForm, {
  YoutubeRequestFormOriginalSourceFragment,
  YoutubeRequestMutation,
} from "./YoutubeRequestForm";

export const mockMutationSuccess = mockGql.mutation(
  YoutubeRequestMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestYoutubeRegistration: {
          __typename: "RequestYoutubeRegistrationSucceededPayload",
          request: {
            id: "request:1",
            sourceId: "Q16KpquGsIc",
            ...makeFragmentData(
              { sourceId: "Q16KpquGsIc" },
              YoutubeRequestPageLinkFragment
            ),
          },
        },
      })
    )
);

export const mockSourceFragment = makeFragmentData(
  {
    sourceId: "Q16KpquGsIc",
    url: "https://www.youtube.com/watch?v=Q16KpquGsIc",
    thumbnailUrl: "/thumbnail.jpg",
    ...makeFragmentData(
      {
        sourceId: "Q16KpquGsIc",
        url: "https://www.youtube.com/watch?v=Q16KpquGsIc",
        thumbnailUrl: "/thumbnail.jpg",
      },
      YoutubeRegisterOriginalSourceFragment
    ),
  },
  YoutubeRequestFormOriginalSourceFragment
);

const meta = {
  excludeStories: /^mock/,
  component: YoutubeRequestForm,
  args: {
    style: {
      width: 640,
      height: 640,
    },
    handleSuccess: action("success"),
    handleCancel: action("cancel"),
    sourceFragment: mockSourceFragment,
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockMutationSuccess],
        misc: [mockTagSearcher],
      },
    },
  },
} as Meta<typeof YoutubeRequestForm>;
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
