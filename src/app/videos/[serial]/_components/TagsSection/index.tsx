import clsx from "clsx";
import React from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { TagType } from "~/components/common/TagType";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment VideoPageLayout_TagsSection on Video {
    taggings {
      nodes {
        id
        tag {
          ...Link_Tag
          ...CommonTag
          ...TagType
          id
          type
        }
      }
    }
  }
`);
export const TagsSection = ({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div className={clsx(["flex", "flex-col"], ["gap-y-1"])}>
      <div className={clsx("flex", "gap-x-2", "gap-y-1")}>
        {fragment.taggings.nodes
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
      <div className={clsx(["flex", "flex-col", "items-start", "gap-y-0.5"])}>
        {fragment.taggings.nodes.map((tagging) => (
          <div key={tagging.id} className={clsx(["flex"])}>
            <LinkTag fragment={tagging.tag}>
              <CommonTag
                fragment={tagging.tag}
                className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
              />
            </LinkTag>
          </div>
        ))}
      </div>
    </div>
  );
};
