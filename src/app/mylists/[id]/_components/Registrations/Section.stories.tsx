import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistRegistration,
  aMylistRegistrationCollection,
  aVideo,
  MylistPage_RegistrationsSectionDocument,
} from "~/gql/graphql";

import { RegistrationsSection } from "./Section";

export default {
  component: RegistrationsSection,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <RegistrationsSection {...args} />
      </UrqlProvider>
    );
  },
  args: {
    mylistId: "mylist:1",
    fallback: {
      registrations: aMylistRegistrationCollection({
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
                  registrations: aMylistRegistrationCollection({
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
} as Meta<typeof RegistrationsSection>;

export const Primary: StoryObj<typeof RegistrationsSection> = {};
