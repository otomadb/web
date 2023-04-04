import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import Component from "./VideosList";

export default async function RecentVideoListSC() {
  const data = await fetchGql(
    graphql(`
      query HomePage_RecentVideosSection_VideosList {
        ...HomePage_RecentVideosSection_VideosList_Presentation
      }
    `),
    {}
  );
  return <Component fragment={data} />;
}
