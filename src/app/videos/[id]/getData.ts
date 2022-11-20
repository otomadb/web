// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355
import gqlRequest from "graphql-request";

import { graphql } from "~/gql";
const GetVideoQueryDocument = graphql(`
  query GetVideo($id: ID!) {
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
        }
        ... on VideoAddTagHistoryItem {
          tag {
            id
            name
          }
        }
      }
    }
  }
`);

export const getData = async (id: string) => {
  const { video } = await gqlRequest(
    "http://localhost:8080/graphql",
    GetVideoQueryDocument,
    { id }
  );
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
  };
};
