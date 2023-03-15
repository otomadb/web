import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment VideoPage_Semitag on Semitag {
    name
  }
`);
export const Semitag: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

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
