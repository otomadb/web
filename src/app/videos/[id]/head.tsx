import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Head({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage_Title($id: ID!) {
        video(id: $id) {
          title
        }
      }
    `),
    { id: `video:${params.id}` }
  );

  return (
    <>
      <CommonHead />
      <title>{`${video.title} - 動画 - Otomad Database`}</title>
    </>
  );
}
