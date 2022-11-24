import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

const IndexPageQueryDocument = graphql(`
  query IndexPage {
    recentRegisteredVideos: videos(input: { limit: 12 }) {
      nodes {
        id
        title
        thumbnailUrl
      }
    }
  }
`);

export const getData = async () => {
  const { recentRegisteredVideos } = await gqlClient.request(
    IndexPageQueryDocument
  );
  return {
    recentRegisteredVideos: recentRegisteredVideos.nodes.map(
      ({ id, title, thumbnailUrl }) => ({
        id,
        title,
        thumbnailUrl,
      })
    ),
  };
};
