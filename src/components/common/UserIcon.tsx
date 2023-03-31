import Avatar from "boring-avatars";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserIcon on User {
    name
    displayName
    icon
  }
`);
export const UserIcon: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  size?: number;
}> = ({ className, size = 64, ...props }) => {
  const { displayName, name, icon } = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, ["rounded-md", "overflow-hidden"])}
      style={{ width: size, height: size }}
    >
      {icon && (
        <Image
          className={clsx(["w-full"], ["h-full"])}
          width={size}
          height={size}
          src={icon}
          alt={displayName}
        />
      )}
      {!icon && (
        <Avatar
          size={size}
          name={name}
          variant="marble"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      )}
    </div>
  );
};
