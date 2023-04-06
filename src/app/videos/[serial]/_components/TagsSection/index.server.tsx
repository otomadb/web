import { graphql } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";

import { TagsSection } from ".";

export default async function TagsSectionSC({ serial }: { serial: number }) {
  const data = await fetchGql3(
    graphql(`
      query VideoPageLayout_TagsSectionQuery($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          ...VideoPageLayout_TagsSection
        }
      }
    `),
    { serial }
  );
  if (!data?.findVideo) throw new Error("Fetch video taggings failed");

  return <TagsSection fragment={data.findVideo} />;
}
