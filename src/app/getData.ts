import "server-only";

import gqlRequest from "graphql-request";

import { graphql } from "~/gql";

const IndexPageQueryDocument = graphql(`
  query IndexPage {
    recentRegisteredVideos: videos(input: { limit: 100 }) {
      nodes {
        id
        title
        thumbnailUrl
      }
    }
  }
`);

export const getData = async () => {
  const { recentRegisteredVideos } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    IndexPageQueryDocument
  );

  return {
    recentRegisteredVideos: recentRegisteredVideos.nodes.map(
      ({ id, title, thumbnailUrl }) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: id.split(":").at(1)!,
        title,
        thumbnailUrl,
      })
    ),
  };
};
