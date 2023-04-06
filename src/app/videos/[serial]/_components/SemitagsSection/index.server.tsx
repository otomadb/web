import { graphql } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";

import SemitagsSection from ".";

export default async function SemitagsSectionSC({
  serial,
}: {
  serial: number;
}) {
  const data = await fetchGql3(
    graphql(`
      query VideoPageLayout_SemitagsSectionQuery($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          ...VideoPageLayout_SemitagsSection
        }
      }
    `),
    { serial }
  );
  if (!data?.findVideo) throw new Error("Fetch video semitaggings failed");

  return <SemitagsSection fragment={data.findVideo} />;
}
