import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { makeFragmentData } from "~/gql";
import { MylistShareRange } from "~/gql/graphql";

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
        /*
        graphql.query(UseViewerDocument, (req, res, ctx) =>
          // @ts-ignore 一旦無視
          res(ctx.data({ whoami: null }))
        ),
        */
      ],
    },
  },
} as Meta<typeof MylistListItem>;

export default meta;

export const NoRegistration: StoryObj<typeof MylistListItem> = {
  name: "マイリストへの登録がない",
  args: {
    fragment: makeFragmentData(
      {
        id: "mylist_1",
        title: "マイリスト1",
        isLikeList: false,
        range: MylistShareRange.Public,
        holder: {
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        },
        registrations: {
          nodes: [],
        },
      },
      Fragment
    ),
  },
};

export const NotLikeList: StoryObj<typeof meta> = {
  name: "いいねリストでない",
  args: {
    fragment: makeFragmentData(
      {
        id: "mylist_1",
        title: "マイリスト1",
        isLikeList: false,
        range: MylistShareRange.Public,
        holder: {
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        },
        registrations: {
          nodes: [
            {
              id: "mylistRegistration:1",
              video: {
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:2",
              video: {
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:3",
              video: {
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:4",
              video: {
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:5",
              video: {
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};

export const OthersLikeList: StoryObj<typeof meta> = {
  name: "自分以外のいいねリスト",
  args: {
    fragment: makeFragmentData(
      {
        id: "mylist_1",
        title: "likes list for user:1",
        isLikeList: true,
        range: MylistShareRange.Public,
        holder: {
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        },
        registrations: {
          nodes: [
            {
              id: "mylistRegistration:1",
              video: {
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:2",
              video: {
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:3",
              video: {
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:4",
              video: {
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:5",
              video: {
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};

export const MyLikeList: StoryObj<typeof MylistListItem> = {
  name: "自分のいいねリスト",
  args: {
    fragment: makeFragmentData(
      {
        id: "mylist_1",
        title: "likes list for user:1",
        isLikeList: true,
        range: MylistShareRange.Private,
        holder: {
          id: "user:1",
          name: "sno2wman",
          displayName: "SnO2WMaN",
          icon: "/512x512.png",
        },
        registrations: {
          nodes: [
            {
              id: "mylistRegistration:1",
              video: {
                id: "video_1",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:2",
              video: {
                id: "video_2",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:3",
              video: {
                id: "video_3",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:4",
              video: {
                id: "video_4",
                thumbnailUrl: "/960x540.jpg",
              },
            },
            {
              id: "mylistRegistration:5",
              video: {
                id: "video_5",
                thumbnailUrl: "/960x540.jpg",
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
  parameters: {
    msw: {
      handlers: [],
    },
  },
};
