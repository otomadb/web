import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Head({ params }: { params: { id: string } }) {
  const { tag } = await gqlRequest(
    graphql(`
      query TagPage_Title($id: ID!) {
        tag(id: $id) {
          name
        }
      }
    `),
    { id: `tag:${params.id}` }
  );

  return (
    <>
      <CommonHead />
      <title>{`${tag.name} - タグ - Otomad Database`}</title>
    </>
  );
}
