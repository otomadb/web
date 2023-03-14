import clsx from "clsx";
import React from "react";

import { FragmentType, getFragment, graphql } from "~/gql";
import { TagType } from "~/gql/graphql";

const Fragment = graphql(`
  fragment VideoPageLayout_TagTypesList on VideoTagConnection {
    nodes {
      tag {
        type
      }
    }
  }
`);
export const TagTypesList: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
  const types = fragment.nodes
    .map(({ tag: { type } }) => type)
    .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2));

  return (
    <div className={clsx(className, "flex", "gap-x-2", "gap-y-1")}>
      {types.map((type) => (
        <div key={type} className={clsx(["flex"])}>
          <span
            className={clsx(
              ["select-all"],
              [
                "text-xs",
                {
                  "text-copyright-400": type === TagType.Copyright,
                  "text-character-400": type === TagType.Character,
                  "text-music-400": type === TagType.Music,
                  "text-event-400": type === TagType.Event,
                  "text-series-400": type === TagType.Series,
                },
              ]
            )}
          >
            {type}
          </span>
        </div>
      ))}
    </div>
  );
};
