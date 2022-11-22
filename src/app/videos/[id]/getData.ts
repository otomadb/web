import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

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
  const { video } = await gqlClient.request(GetVideoQueryDocument, { id });

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
