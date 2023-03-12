import clsx from "clsx";
import React from "react";

import { FragmentType, getFragment, graphql } from "~/gql";
import { styleByTagType } from "~/utils/styleByTagType";

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
              ["text-xs", styleByTagType(type, "text")]
            )}
          >
            {type}
          </span>
        </div>
      ))}
    </div>
  );
};
