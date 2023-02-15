import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import { VideoPage_SemitagFragment } from "~/gql/graphql";

graphql(`
  fragment VideoPage_Semitag on Semitag {
    id
    name
  }
`);
export const Semitag: React.FC<{
  className?: string;
  fragment: VideoPage_SemitagFragment;
}> = ({ className, fragment }) => {
  return (
    <div
      className={clsx(className, ["flex", "items-center", "justify-between"])}
    >
      <div
        className={clsx(
          ["bg-white"],
          ["border", "border-gray-200"],
          ["shadow-sm"],
          ["rounded"],
          ["px-2", "py-0.5"],
          ["text-slate-700"],
          ["text-xs"]
        )}
      >
        {fragment.name}
      </div>
    </div>
  );
};
