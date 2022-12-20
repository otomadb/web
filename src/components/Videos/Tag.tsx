import clsx from "clsx";
import React from "react";

import { TagLink } from "~/components/common/Link";
import { graphql } from "~/gql";
import { PseudoTagType, VideoPage_TagFragment } from "~/gql/graphql";

graphql(`
  fragment VideoPage_Tag on Tag {
    id
    name
    type: pseudoType
    explicitParent {
      id
      name
    }
  }
`);

export const Tag: React.FC<{
  className?: string;
  tag: VideoPage_TagFragment;
}> = ({ className, tag }) => {
  const { id, name, type, explicitParent } = tag;
  return (
    <TagLink
      tagId={id}
      className={clsx(
        className,
        ["flex"],
        ["items-center"],
        ["whitespace-nowrap"],
        ["bg-white"],
        [
          "border",
          "border-gray-200",
          [
            "border-l-4",
            {
              "border-l-character-400": type === PseudoTagType.Character,
              "border-l-music-400": type === PseudoTagType.Music,
              "border-l-copyright-400": type === PseudoTagType.Copyright,
              "border-l-event-400": type === PseudoTagType.Event,
              "border-l-series-400": type === PseudoTagType.Series,
            },
          ],
        ],
        ["shadow-sm"],
        ["rounded"],
        ["pr-2", "pl-1.5", "py-0.5"]
      )}
    >
      <span className={clsx(["text-slate-800"], ["text-xs"])}>{name}</span>
      {explicitParent?.name && (
        <span className={clsx(["ml-0.5"], ["text-slate-500"], ["text-xs"])}>
          ({explicitParent.name})
        </span>
      )}
    </TagLink>
  );
};
