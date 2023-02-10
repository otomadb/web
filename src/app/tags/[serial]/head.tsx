import { notFound } from "next/navigation";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Head({ params }: { params: { serial: string } }) {
  const { findTag } = await gqlRequest(
    graphql(`
      query TagPage_Title($serial: Int!) {
        findTag(input: { serial: $serial }) {
          name
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findTag) return notFound();

  return (
    <>
      <CommonHead />
      <title>{`${findTag.name} - タグ - Otomad Database`}</title>
    </>
  );
}
