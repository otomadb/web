import "server-only";

import gqlRequest from "graphql-request";

import { graphql } from "~/gql";

import { HistoryItemType, TagType } from "./types";

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
        explicitParent {
          id
          name
        }
      }
      thumbnailUrl
      history(input: { order: { createdAt: ASC } }) {
        nodes {
          type: __typename
          id
          createdAt
          user {
            id
            name
            displayName
            icon
          }
          ... on VideoAddTitleHistoryItem {
            title
          }
          ... on VideoDeleteTitleHistoryItem {
            title
          }
          ... on VideoChangePrimaryTitleHistoryItem {
            from
            to
          }
          ... on VideoAddThumbnailHistoryItem {
            thumbnail
          }
          ... on VideoDeleteThumbnailHistoryItem {
            thumbnail
          }
          ... on VideoChangePrimaryThumbnailHistoryItem {
            from
            to
          }
          ... on VideoAddTagHistoryItem {
            tag {
              id
              name
              explicitParent {
                id
                name
              }
            }
          }
          ... on VideoDeleteTagHistoryItem {
            tag {
              id
              name
              explicitParent {
                id
                name
              }
            }
          }
          ... on VideoAddNiconicoSourceHistoryItem {
            niconico {
              id
            }
          }
        }
      }
    }
  }
`);

export const getData = async (
  videoId: string
): Promise<{
  id: string;
  title: string;
  titles: { title: string; primary: boolean }[];
  thumbnailUrl: string;
  tags: TagType[];
  history: HistoryItemType[];
}> => {
  const { video } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    VideoPageQueryDocument,
    { id: videoId }
  );

  return {
    id: video.id,
    title: video.title,
    titles: video.titles.map(({ title, primary }) => ({
      title,
      primary,
    })),
    thumbnailUrl: video.thumbnailUrl,
    tags: video.tags.map(({ id, name, explicitParent }) => {
      return {
        id,
        name,
        explicitParent: explicitParent
          ? { id: explicitParent.id, name: explicitParent.name }
          : null,
      };
    }),
    history: video.history.nodes.map((item) => {
      const { id, createdAt } = item;
      const user = {
        id: item.user.id,
        name: item.user.name,
        displayName: item.user.displayName,
        icon: item.user.icon,
      };
      switch (item.type) {
        case "VideoRegisterHistoryItem": {
          return { id, createdAt, user, type: "REGISTER" };
        }
        case "VideoAddTitleHistoryItem": {
          const { title } = item;
          return { id, createdAt, user, type: "ADD_TITLE", title };
        }
        case "VideoDeleteTitleHistoryItem": {
          const { title } = item;
          return { id, createdAt, user, type: "DELETE_TITLE", title };
        }
        case "VideoChangePrimaryTitleHistoryItem": {
          const { from, to } = item;
          return {
            id,
            createdAt,
            user,
            type: "CHANGE_PRIMARY_TITLE",
            from: from || null,
            to,
          };
        }
        case "VideoAddThumbnailHistoryItem": {
          const { thumbnail } = item;
          return { id, createdAt, user, type: "ADD_THUMBNAIL", thumbnail };
        }
        case "VideoDeleteThumbnailHistoryItem": {
          const { thumbnail } = item;
          return { id, createdAt, user, type: "DELETE_THUMBNAIL", thumbnail };
        }
        case "VideoChangePrimaryThumbnailHistoryItem": {
          const { from, to } = item;
          return {
            id,
            createdAt,
            user,
            type: "CHANGE_PRIMARY_THUMBNAIL",
            from: from || null,
            to,
          };
        }
        case "VideoAddTagHistoryItem": {
          const { tag } = item;
          return {
            id,
            createdAt,
            user,
            type: "ADD_TAG",
            tag: {
              id: tag.id,
              name: tag.name,
              explicitParent: tag.explicitParent
                ? {
                    id: tag.explicitParent.id,
                    name: tag.explicitParent.name,
                  }
                : null,
            },
          };
        }
        case "VideoDeleteTagHistoryItem": {
          const { tag } = item;
          return {
            id,
            createdAt,
            user,
            type: "DELETE_TAG",
            tag: {
              id: tag.id,
              name: tag.name,
              explicitParent: tag.explicitParent
                ? {
                    id: tag.explicitParent.id,
                    name: tag.explicitParent.name,
                  }
                : null,
            },
          };
        }
        case "VideoAddNiconicoSourceHistoryItem": {
          return {
            id,
            createdAt,
            user,
            type: "ADD_NICONICO_SOURCE",
          };
        }
        default: {
          throw new Error("wow");
        }
      }
    }),
  };
};
