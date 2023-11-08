import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserIcon on User {
    displayName
    icon
  }
`);
export const UserIcon: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  size?: number;
}> = ({ className, size = 64, ...props }) => {
  const { displayName, icon } = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, ["rounded-md", "overflow-hidden"])}
      style={{ width: size, height: size }}
    >
      <Image
        className={clsx(["w-full"], ["h-full"])}
        width={size}
        height={size}
        src={icon}
        alt={displayName}
      />
    </div>
  );
};
