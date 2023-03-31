import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { ListItem } from "./RequestsListItem";

export const Fragment = graphql(`
  fragment TopPage_RecentNicovideoRegistrationRequests on Query {
    findNicovideoRegistrationRequests(first: 6, checked: false) {
      nodes {
        id
        ...TopPage_RecentNicovideoRequestsSection_RequestsListItem
      }
    }
  }
`);
export const Presentation: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(["grid", "grid-cols-6"], ["gap-x-2"])}>
      {fragment.findNicovideoRegistrationRequests.nodes.map((node) => (
        <ListItem key={node.id} fragment={node} />
      ))}
    </div>
  );
};

export default async function RequestsList() {
  const data = await fetchGql(
    graphql(`
      query TopPage_RecentNicovideoRequestsSection_RequestListQuery {
        ...TopPage_RecentNicovideoRegistrationRequests
      }
    `),
    {},
    { next: { revalidate: 0 } }
  );

  if (!data) return null;
  return <Presentation fragment={data} />;
}
