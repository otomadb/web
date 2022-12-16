import gqlRequest from "graphql-request";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { VideoPageTitleDocument } from "~/gql/graphql";

export default async function Head({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    graphql(`
      query VideoPageTitle($id: ID!) {
        video(id: $id) {
          id
          title
        }
      }
    `),
    { id: `video:${params.id}` }
  );

  return (
    <>
      <CommonHead />
      <title>{`${video.title} - otomad database`}</title>
    </>
  );
}
