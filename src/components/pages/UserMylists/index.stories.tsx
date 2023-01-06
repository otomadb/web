import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistConnection,
  aMylistRegistration,
  aMylistRegistrationConnection,
  aUser,
  aVideo,
  MylistShareRange,
} from "~/gql/graphql";

import { UserMylists } from ".";

export default {
  component: UserMylists,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <UserMylists {...args} />
      </UrqlProvider>
    );
  },
  args: {
    pageUserId: "user:1",
    fallback: aMylistConnection({
      nodes: [
        aMylist({
          id: "mylist:1",
          title: "マイリスト1",
          isLikeList: false,
          range: MylistShareRange.Public,
          holder: aUser({
            id: "user:1",
            name: "sno2wman",
            displayName: "SnO2WMaN",
            icon: "/storybook/512x512.png",
          }),
          registrations: aMylistRegistrationConnection({
            nodes: [
              aMylistRegistration({
                id: "mylistRegistration:1",
                video: aVideo({
                  id: "video:1",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:2",
                video: aVideo({
                  id: "video:2",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:3",
                video: aVideo({
                  id: "video:3",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:4",
                video: aVideo({
                  id: "video:4",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:5",
                video: aVideo({
                  id: "video:5",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
            ],
          }),
        }),
        aMylist({
          id: "mylist:2",
          title: "マイリスト2",
          isLikeList: false,
          range: MylistShareRange.Public,
          holder: aUser({
            id: "user:1",
            name: "sno2wman",
            displayName: "SnO2WMaN",
            icon: "/storybook/512x512.png",
          }),
          registrations: aMylistRegistrationConnection({
            nodes: [
              aMylistRegistration({
                id: "mylistRegistration:1",
                video: aVideo({
                  id: "video:1",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:2",
                video: aVideo({
                  id: "video:2",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:3",
                video: aVideo({
                  id: "video:3",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:4",
                video: aVideo({
                  id: "video:4",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
              aMylistRegistration({
                id: "mylistRegistration:5",
                video: aVideo({
                  id: "video:5",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof UserMylists>;

export const W_1024px: StoryObj<typeof UserMylists> = {
  name: "width: 1024px",
  args: {
    className: clsx(["w-[1024px]"]),
  },
};
