import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment CommonSemitag on Semitag {
    name
  }
`);
const CommonSemitag: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <span className={clsx(className, "rounded-sm border")}>
      {fragment.name}
    </span>
  );
};
export default CommonSemitag;

export const CommonSemitag2: React.FC<{
  className?: string;
  size: "xs" | "small";
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, size, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(
        className,
        "flex border border-obsidian-primary bg-obsidian-darker text-snow-darker",
        {
          xs: "px-1 py-0.5 text-xxs",
          small: "px-2 py-1 text-sm",
        }[size]
      )}
    >
      <span>{fragment.name}</span>
    </div>
  );
};
