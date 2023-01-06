import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylistRegistration,
  aMylistRegistrationConnection,
  aVideo,
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
} as Meta<typeof Registrations>;

export const W1024: StoryObj<typeof Registrations> = {
  name: "width: 1024px",
  args: {
    className: css`
      width: 1024px;
    `,
  },
};
