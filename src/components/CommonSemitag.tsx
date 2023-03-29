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
    <span className={clsx(className, ["border", "rounded-sm"])}>
      {fragment.name}
    </span>
  );
};
export default CommonSemitag;
