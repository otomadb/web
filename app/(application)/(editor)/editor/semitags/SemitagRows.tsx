"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import SemitagRow from "./SemitagRow";

export const SemitagRows: React.FC = () => {
  const [{ data }, updateList] = useQuery({
    query: graphql(`
      query CheckSemitagsPage_SemitagRows {
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
      {data?.findSemitags.nodes.map((semitag) => (
        <SemitagRow
          key={semitag.id}
          fragment={semitag}
          updateList={() => updateList({ requestPolicy: "network-only" })}
        />
      ))}
    </div>
  );
};
