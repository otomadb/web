import { action } from "@storybook/addon-actions";
import { expect, jest } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";

import { Current, FormModalContext } from "~/components/FormWidget";
import { makeFragmentData } from "~/gql";

import BilibiliRequestTimelineEvent, {
  BilibiliRequestTimelineEventFragment,
} from "./BilibiliRequestTimelineEvent";
import {
  mockHasNoRole,
  mockHasRole,
} from "./YoutubeRequestTimelineEvent.stories";

const meta = {
  component: BilibiliRequestTimelineEvent,
  args: {
    style: { width: 720 },
    fragment: makeFragmentData(
      {
        createdAt: "2021-01-01T00:00:00.000Z",
        request: {
          id: "request:1",
          title: "Title 1",
          sourceId: "BV1xx411c7mu",
          thumbnailUrl: "/960x540.jpg",
          originalUrl: "https://www.bilibili.com/video/BV1xx411c7mu",
        },
        event: {
          id: "event:1",
          user: {
            id: "user:1",
            displayName: "User1",
            name: "user1",
            icon: "/icon.png",
          },
        },
      },
      BilibiliRequestTimelineEventFragment
    ),
  },
  decorators: [
    (Story, { parameters }) => {
      return (
        <FormModalContext.Provider
          value={{
            current: undefined,
            open:
              typeof parameters.openFormModal === "function"
                ? parameters.openFormModal
                : action("Open form modal"),
            close: action("Close form modal"),
          }}
        >
          <Story />
        </FormModalContext.Provider>
      );
    },
  ],
} as Meta<typeof BilibiliRequestTimelineEvent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NotEditor: Story = {
  name: "編集者権限なし",

  parameters: {
    msw: {
      handlers: {
        roles: mockHasNoRole,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button")).toBeDisabled();
    });
  },
};

export const Editor: Story = {
  name: "編集者権限あり",

  parameters: {
    openFormModal: jest.fn(),
    msw: {
      handlers: {
        roles: mockHasRole,
      },
    },
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button")).toBeEnabled();
    });

    canvas.getByRole("button").click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "SOURCE_INPUT",
        mode: "register",
        init: {
          type: "bilibili",
          sourceId: "BV1xx411c7mu",
        },
      } satisfies Extract<Current, { type: "SOURCE_INPUT" }>);
    });
  },
};
