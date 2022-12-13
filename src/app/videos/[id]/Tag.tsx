import clsx from "clsx";
import React from "react";

import { TagLink } from "~/components/Link";
import { PseudoTagType } from "~/gql/graphql";

export const Tag: React.FC<{
  className?: string;
  id: string;
  name: string;
  type: PseudoTagType;
  contextName?: string;
}> = ({ className, id, name, contextName, type }) => {
  return (
    <TagLink
      key={id}
      tagId={id}
      className={clsx(
        className,
        ["flex"],
        ["items-center"],
        ["whitespace-nowrap"],
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
      {contextName && (
        <span className={clsx(["ml-0.5"], ["text-slate-500"], ["text-xs"])}>
          ({contextName})
        </span>
      )}
    </TagLink>
  );
};
