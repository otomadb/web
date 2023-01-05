import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistRegistration,
  aMylistRegistrationConnection,
  aUser,
  aVideo,
  MylistShareRange,
  UseViewerDocument,
} from "~/gql/graphql";

import { LargeMylistListItem } from "./LargeMylistListItem";

export default {
  component: LargeMylistListItem,
  args: {
    className: clsx(["w-[1024px]"]),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <LargeMylistListItem {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(UseViewerDocument, (req, res, ctx) =>
          res(ctx.data({ whoami: null }))
        ),
      ],
    },
  },
} as Meta<typeof LargeMylistListItem>;

export const NotLikeList: StoryObj<typeof LargeMylistListItem> = {
  name: "いいねリストでない",
  args: {
    fragment: aMylist({
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
  },
};

export const OthersLikeList: StoryObj<typeof LargeMylistListItem> = {
  name: "自分以外のいいねリスト",
  args: {
    fragment: aMylist({
      id: "mylist:1",
      title: "likes list for user:1",
      isLikeList: true,
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
  },
};

export const MyLikeList: StoryObj<typeof LargeMylistListItem> = {
  name: "自分のいいねリスト",
  args: {
    fragment: aMylist({
      id: "mylist:1",
      title: "likes list for user:1",
      isLikeList: true,
      range: MylistShareRange.Private,
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
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(UseViewerDocument, (req, res, ctx) =>
          res(ctx.data({ whoami: aUser({ id: "user:1" }) }))
        ),
      ],
    },
  },
};

export const NoRegistration: StoryObj<typeof LargeMylistListItem> = {
  name: "マイリストへの登録がない",
  args: {
    fragment: aMylist({
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
        nodes: [],
      }),
    }),
  },
};
