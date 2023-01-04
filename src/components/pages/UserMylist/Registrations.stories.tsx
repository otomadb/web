import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistRegistration,
  aMylistRegistrationConnection,
  aVideo,
  MylistPage_RegistrationsSectionDocument,
} from "~/gql/graphql";

import { Registrations } from "./Registrations";

export default {
  component: Registrations,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <Registrations {...args} />
      </UrqlProvider>
    );
  },
  args: {
    mylistId: "mylist:1",
    fallback: {
      registrations: aMylistRegistrationConnection({
        nodes: [...new Array(24)].map((_, i) =>
          aMylistRegistration({
            id: `mylistRegistration:${i + 1}`,
            video: aVideo({
              id: `video:${i + 1}`,
              title: `Video ${i + 1}`,
              thumbnailUrl: "/storybook/960x540.jpg",
            }),
          })
        ),
      }),
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          MylistPage_RegistrationsSectionDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                mylist: aMylist({
                  registrations: aMylistRegistrationConnection({
                    nodes: [...new Array(24)].map((_, i) =>
                      aMylistRegistration({
                        id: `mylistRegistration:${i + 1}`,
                        video: aVideo({
                          id: `video:${i + 1}`,
                          title: `Video ${i + 1}`,
                          thumbnailUrl: "/storybook/960x540.jpg",
                        }),
                      })
                    ),
                  }),
                }),
              })
            )
        ),
      ],
    },
  },
} as Meta<typeof Registrations>;

export const Primary: StoryObj<typeof Registrations> = {};
