"use client";

import "client-only";

import clsx from "clsx";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import SemitagRow from "./SemitagRow";

export const SemitagRows: React.FC = () => {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query CheckSemitagsPage {
        findSemitags(checked: false) {
          nodes {
            ...CheckSemitagsPage_SemitagRow
            id
          }
        }
      }
    `),
  });

  return (
    <div className={clsx(["flex", "flex-col", "gap-y-0.5"])}>
      {fetching && <p>loading...</p>}
      {data?.findSemitags.nodes.map((semitag) => (
        <SemitagRow key={semitag.id} fragment={semitag} />
      ))}
    </div>
  );
};
