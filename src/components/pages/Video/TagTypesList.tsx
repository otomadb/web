"use client";
import clsx from "clsx";
import React, { useMemo } from "react";

import { graphql } from "~/gql";
import { VideoPage_TagsTypesListFragment } from "~/gql/graphql";
import { styleByTagType } from "~/utils/styleByTagType";

graphql(`
  fragment VideoPage_TagsTypesList on Video {
    tags(input: {}) {
      tag {
        pseudoType
      }
    }
  }
`);

export const TagTypesList: React.FC<{
  className?: string;
  fragment: VideoPage_TagsTypesListFragment;
}> = ({ className, fragment }) => {
  const types = useMemo(
    () =>
      fragment.tags
        .map(({ tag }) => tag.pseudoType)
        .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2)),
    [fragment]
  );

  return (
    <div className={clsx(className, ["flex"], ["gap-x-2"], ["gap-y-2"])}>
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
