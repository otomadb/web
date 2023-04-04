import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import Component from "./RequestsList";

export default async function RequestsListSC() {
  const data = await fetchGql(
    graphql(`
      query HomePage_RecentNicovideoRequestsSection_RequestsList {
        ...HomePage_RecentNicovideoRequestsSection_RequestsList_Presentation
      }
    `),
    {}
  );
  return <Component fragment={data} />;
}
