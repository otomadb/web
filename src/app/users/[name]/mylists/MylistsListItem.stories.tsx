import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { makeFragmentData } from "~/gql";
import {
  aMylist,
  aMylistRegistration,
  aMylistRegistrationConnection,
  aUser,
  aVideo,
  MylistShareRange,
  UseViewerDocument,
} from "~/gql/graphql";

import { Fragment, MylistListItem } from "./MylistsListItem";

const meta = {
  component: MylistListItem,
  args: { Link: (props) => <a {...props} /> },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({ url: "/graphql", exchanges: [] })}
      >
        <MylistListItem {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(UseViewerDocument, (req, res, ctx) =>
          // @ts-ignore 一旦無視
          res(ctx.data({ whoami: null }))
        ),
      ],
    },
  },
} as Meta<typeof MylistListItem>;

export default meta;

export const NoRegistration: StoryObj<typeof MylistListItem> = {
  name: "マイリストへの登録がない",
  args: {
    fragment: makeFragmentData(
      aMylist({
        id: "mylist_1",
        title: "マイリスト1",
        isLikeList: false,
        range: MylistShareRange.Public,
        holder: aUser({
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        }),
        registrations: aMylistRegistrationConnection({
          nodes: [],
        }),
      }),
      Fragment
    ),
  },
};

export const NotLikeList: StoryObj<typeof meta> = {
  name: "いいねリストでない",
  args: {
    fragment: makeFragmentData(
      aMylist({
        id: "mylist_1",
        title: "マイリスト1",
        isLikeList: false,
        range: MylistShareRange.Public,
        holder: aUser({
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        }),
        registrations: aMylistRegistrationConnection({
          nodes: [
            aMylistRegistration({
              id: "mylistRegistration:1",
              video: aVideo({
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:2",
              video: aVideo({
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:3",
              video: aVideo({
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:4",
              video: aVideo({
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:5",
              video: aVideo({
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
          ],
        }),
      }),
      Fragment
    ),
  },
};

export const OthersLikeList: StoryObj<typeof meta> = {
  name: "自分以外のいいねリスト",
  args: {
    fragment: makeFragmentData(
      aMylist({
        id: "mylist_1",
        title: "likes list for user:1",
        isLikeList: true,
        range: MylistShareRange.Public,
        holder: aUser({
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        }),
        registrations: aMylistRegistrationConnection({
          nodes: [
            aMylistRegistration({
              id: "mylistRegistration:1",
              video: aVideo({
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:2",
              video: aVideo({
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:3",
              video: aVideo({
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:4",
              video: aVideo({
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:5",
              video: aVideo({
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
          ],
        }),
      }),
      Fragment
    ),
  },
};

export const MyLikeList: StoryObj<typeof MylistListItem> = {
  name: "自分のいいねリスト",
  args: {
    fragment: makeFragmentData(
      aMylist({
        id: "mylist_1",
        title: "likes list for user:1",
        isLikeList: true,
        range: MylistShareRange.Private,
        holder: aUser({
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        }),
        registrations: aMylistRegistrationConnection({
          nodes: [
            aMylistRegistration({
              id: "mylistRegistration:1",
              video: aVideo({
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:2",
              video: aVideo({
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:3",
              video: aVideo({
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:4",
              video: aVideo({
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
            aMylistRegistration({
              id: "mylistRegistration:5",
              video: aVideo({
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              }),
            }),
          ],
        }),
      }),
      Fragment
    ),
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
