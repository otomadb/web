import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { RegisterContext } from "~/app/editor/nicovideo/_components/Original/Context";
import { mockTagButton } from "~/app/editor/nicovideo/_components/TagButton.mocks";

import SourceChecker from "./SourceChecker";
import {
  mockAlreadyRegistered,
  mockAlreadyRequested,
  mockLoading,
  mockNeitherRegisterNorRequest,
} from "./SourceChecker.mocks";

const meta = {
  component: SourceChecker,
  args: {
    style: { width: "1024px" },
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          exchanges: [fetchExchange],
        })}
      >
        <RegisterContext.Provider
          value={{
            setTitle: action("setTitle"),
            setSourceId: action("setSourceId"),
            setThumbnailUrl: action("setThumbnailUrl"),
            toggleSemitag: action("toggleSemitag"),
            toggleTag: action("toggleTag"),
          }}
        >
          <SourceChecker {...args}>
            <p>ここに申請フォームが置かれる</p>
          </SourceChecker>
        </RegisterContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcert: [mockTagButton],
      },
    },
  },
} as Meta<typeof SourceChecker>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  name: "ロード中",
  parameters: {
    msw: {
      handlers: {
        concern: [mockLoading],
      },
    },
  },
};

export const AlreadyRegistered: StoryObj<typeof meta> = {
  name: "動画が既に登録済み",
  parameters: {
    msw: {
      handlers: {
        concern: [mockAlreadyRegistered],
      },
    },
  },
};

export const AlreadyRequested: StoryObj<typeof meta> = {
  name: "既にリクエスト済み",
  parameters: {
    msw: {
      handlers: {
        concern: [mockAlreadyRequested],
      },
    },
  },
};

export const NeitherRegisterNorRequest: StoryObj<typeof meta> = {
  name: "登録もリクエストもされていない",
  parameters: {
    msw: {
      handlers: {
        concern: [mockNeitherRegisterNorRequest],
      },
    },
  },
};
