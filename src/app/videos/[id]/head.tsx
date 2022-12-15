import gqlRequest from "graphql-request";

import { graphql } from "~/gql";
import { VideoPageTitleDocument } from "~/gql/graphql";

graphql(`
  query VideoPageTitle($id: ID!) {
    video(id: $id) {
      id
      title
    }
  }
`);

export default async function Head({ params }: { params: { id: string } }) {
  const {
    video: { title },
  } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    VideoPageTitleDocument,
    { id: `video:${params.id}` }
  );

  return (
    <>
      <title>{title}</title>
    </>
  );
}
