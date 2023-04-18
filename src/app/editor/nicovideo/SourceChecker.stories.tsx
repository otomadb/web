import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { RegisterNicovideoPage_SourceCheckerDocument } from "~/gql/graphql";

import { RegisterContext } from "./RegisterContext";
import { RequestContext } from "./RequestContext";
import { SourceChecker } from "./SourceChecker";
import {
  mockSourceAlreadyExists,
  mockSourceNotExistsYet,
} from "./SourceChecker.mocks";
import { mockTagButton } from "./TagButton.mocks";

const meta = {
  component: SourceChecker,
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
          <RequestContext.Provider
            value={{ setRequestId: action("setRequestId") }}
          >
            <SourceChecker {...args} />
          </RequestContext.Provider>
        </RegisterContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagButton],
      },
    },
  },
} as Meta<typeof SourceChecker>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          RegisterNicovideoPage_SourceCheckerDocument,
          (req, res, ctx) => res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const SourceAlreadyRegistered: StoryObj<typeof meta> = {
  name: "動画が既に登録済み",
  parameters: {
    msw: {
      handlers: {
        concern: [mockSourceAlreadyExists],
      },
    },
  },
};

export const SourceNotYetRegistered: StoryObj<typeof meta> = {
  name: "動画はまだ登録されていない",
  parameters: {
    msw: {
      handlers: {
        concern: [mockSourceNotExistsYet],
      },
    },
  },
};
