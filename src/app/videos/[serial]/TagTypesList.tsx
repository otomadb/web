import clsx from "clsx";
import React from "react";

import { TagType } from "~/components/common/TagType";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment VideoPageLayout_TagTypesList on VideoTagConnection {
    nodes {
      tag {
        ...TagType
        type
      }
    }
  }
`);
export const TagTypesList: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, "flex", "gap-x-2", "gap-y-1")}>
      {fragment.nodes
        .filter(
          ({ tag: { type: t1 } }, i, arr) =>
            i === arr.findIndex(({ tag: { type: t2 } }) => t1 === t2)
        )
        .map((node) => (
          <TagType
            key={node.tag.type}
            className={clsx(["text-xs"])}
            fragment={node.tag}
          />
        ))}
    </div>
  );
};
