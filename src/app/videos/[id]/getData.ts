import "server-only";

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
      history(order: { createdAt: ASC }) {
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
            type
          }
        }
        ... on VideoDeleteTagHistoryItem {
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
    createdAt: string;
    user: { id: string; name: string; displayName: string; icon: string };
  } & (
    | { type: "REGISTER" }
    | { type: "ADD_TITLE"; title: string }
    | { type: "DELETE_TITLE"; title: string }
    | { type: "CHANGE_PRIMARY_TITLE"; from: string | null; to: string }
    | { type: "ADD_THUMBNAIL"; thumbnail: string }
    | { type: "DELETE_THUMBNAIL"; thumbnail: string }
    | { type: "CHANGE_PRIMARY_THUMBNAIL"; from: string | null; to: string }
    | { type: "ADD_TAG"; tag: { id: string; name: string; type: string } }
    | { type: "DELETE_TAG"; tag: { id: string; name: string; type: string } }
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
            tag: { id: tag.id, name: tag.name, type: tag.type },
          };
        }
        case "VideoDeleteTagHistoryItem": {
          const { tag } = item;
          return {
            id,
            createdAt,
            user,
            type: "DELETE_TAG",
            tag: { id: tag.id, name: tag.name, type: tag.type },
          };
        }
      }
    }),
  };
};
