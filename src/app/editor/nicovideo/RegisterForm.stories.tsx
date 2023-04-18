import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import {} from "~/components/TagSearcher/SearchBox";
import { makeFragmentData } from "~/gql";
import { RegisterNicovideoPage_RegisterForm_RegisterVideoDocument } from "~/gql/graphql";

import { RegisterForm } from "./RegisterForm";
import { mockSourceNotExistsYet } from "./SourceChecker.mocks";
import { Fragment as SucceededToastFragment } from "./SucceededToast";
import { mockTagButton } from "./TagButton.mocks";

const meta = {
  component: RegisterForm,
  args: {
    sourceId: "sm2057168",
    clearSourceId: action("clearSourceId"),
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          exchanges: [fetchExchange],
        })}
      >
        <RegisterForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {},
} as Meta<typeof RegisterForm>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockSourceNotExistsYet, mockTagButton, mockTagSearcher],
        concern: [
          graphql.mutation(
            RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
            (req, res, ctx) => {
              return res(
                ctx.data({
                  registerVideoFromNicovideo: {
                    __typename: "RegisterVideoFromNicovideoSucceededPayload",
                    ...makeFragmentData(
                      {
                        video: {
                          id: "v1",
                          title: req.variables.input.primaryTitle,
                          thumbnailUrl: req.variables.input.primaryThumbnailUrl,
                        },
                      },
                      SucceededToastFragment
                    ),
                  },
                })
              );
            }
          ),
        ],
      },
    },
  },
};
