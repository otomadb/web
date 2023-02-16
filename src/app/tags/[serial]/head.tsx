import { notFound } from "next/navigation";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Head({ params }: { params: { serial: string } }) {
  const { findTag } = await fetchGql(
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
