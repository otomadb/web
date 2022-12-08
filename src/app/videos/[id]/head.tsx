import gqlRequest from "graphql-request";

import { graphql } from "~/gql";

export const VideoPageTitleQueryDocument = graphql(`
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
    VideoPageTitleQueryDocument,
    { id: `video:${params.id}` }
  );

  return (
    <>
      <title>{title}</title>
    </>
  );
}
