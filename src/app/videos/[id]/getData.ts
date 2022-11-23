import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

const VideoPageQueryDocument = graphql(`
  query VideoPage($id: ID!) {
    video(id: $id) {
      id
      title
      titles {
        title
        primary
      }
      tags {
        id
        name
        type
      }
      thumbnailUrl
      history {
        type: __typename
        id
        createdAt
        user {
          id
          name
          displayName
          icon
        }
        ... on VideoAddTagHistoryItem {
          tag {
            id
            name
            type
          }
        }
      }
    }
  }
`);

export const getData = async (
  id: string
): Promise<{
  id: string;
  title: string;
  titles: { title: string; primary: boolean }[];
  thumbnailUrl: string;
  tags: { id: string; name: string; type: string }[];
  history: ({
    id: string;
    createdAt: any;
    user: { id: string; name: string; displayName: string; icon: string };
  } & (
    | { type: "REGSITER_VIDEO" }
    | { type: "ADD_TAG"; tag: { id: string; name: string; type: string } }
  ))[];
}> => {
  const { video } = await gqlClient.request(VideoPageQueryDocument, { id });

  return {
    id: video.id,
    title: video.title,
    titles: video.titles.map(({ title, primary }) => ({
      title,
      primary,
    })),
    thumbnailUrl: video.thumbnailUrl,
    tags: video.tags.map(({ id, name, type }) => ({
      id,
      name,
      type: type.toString(),
    })),
    history: video.history.map((item) => {
      const user = {
        id: item.user.id,
        name: item.user.name,
        displayName: item.user.displayName,
        icon: item.user.icon,
      };
      switch (item.type) {
        case "VideoRegisterHistoryItem": {
          const { createdAt, id } = item;
          return {
            id,
            createdAt,
            user,
            type: "REGSITER_VIDEO",
          };
        }
        case "VideoAddTagHistoryItem": {
          const { createdAt, id, tag } = item;
          return {
            id,
            createdAt,
            user,
            type: "ADD_TAG",
            tag: { id: tag.id, name: tag.name, type: tag.type },
          };
        }
      }
    }),
  };
};
