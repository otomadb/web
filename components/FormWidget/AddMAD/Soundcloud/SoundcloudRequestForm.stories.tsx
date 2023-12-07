import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { SoundcloudRequestPageLinkFragment } from "~/app/(v2)/requests/soundcloud/[sourceId]/Link";
import { makeFragmentData } from "~/gql";

import { mockTagSearcher } from "../Nicovideo/NicovideoRegister.stories";
import { SoundcloudRegisterOriginalSourceFragment } from "./SoundcloudOriginalSource";
import SoundcloudRequestForm, {
  SoundcloudRequestFormOriginalSourceFragment,
  SoundcloudRequestMutation,
} from "./SoundcloudRequestForm";

export const mockMutationSuccess = mockGql.mutation(
  SoundcloudRequestMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestSoundcloudRegistration: {
          __typename: "RequestSoundcloudRegistrationSucceededPayload",
          request: {
            id: "request:1",
            sourceId: "keigoooo/hyperflip-donaldcore",
            ...makeFragmentData(
              {
                sourceId: "keigoooo/hyperflip-donaldcore",
              },
              SoundcloudRequestPageLinkFragment
            ),
          },
        },
      })
    )
);

export const mockSourceFragment = makeFragmentData(
  {
    sourceId: "keigoooo/hyperflip-donaldcore",
    title: "Title 1",
    url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    thumbnailUrl: "/thumbnail.jpg",
    ...makeFragmentData(
      {
        sourceId: "keigoooo/hyperflip-donaldcore",
        title: "Title 1",
        url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
        thumbnailUrl: "/thumbnail.jpg",
      },
      SoundcloudRegisterOriginalSourceFragment
    ),
  },
  SoundcloudRequestFormOriginalSourceFragment
);

const meta = {
  excludeStories: /^mock/,
  component: SoundcloudRequestForm,
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
} as Meta<typeof SoundcloudRequestForm>;
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
