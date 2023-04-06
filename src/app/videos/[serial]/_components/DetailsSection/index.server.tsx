import { graphql } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";

import DetailsSection from ".";

export default async function DetailsSectionSC({ serial }: { serial: number }) {
  const data = await fetchGql3(
    graphql(`
      query VideoPageLayout_DetailsSectionQuery($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          ...VideoPageLayout_DetailsSection
        }
      }
    `),
    { serial }
  );
  if (!data?.findVideo) throw new Error("Fetch Video details failed");

  return <DetailsSection fragment={data.findVideo} />;
}
