import clsx from "clsx";
import { toSvg } from "jdenticon";
import Image from "next/image";
import React, { useMemo } from "react";

import { FragmentType, useFragment, graphql } from "~/gql";

const Fragment = graphql(`
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
  const src = useMemo(() => {
    if (icon) return icon;
    const base64 = Buffer.from(toSvg(name, size)).toString("base64");
    return `data:image/svg+xml;base64,${base64}`;
  }, [icon, name, size]);

  return (
    <div
      className={clsx(className, ["rounded-md", "overflow-hidden"])}
      style={{ width: size, height: size }}
    >
      <Image
        className={clsx(["w-full"], ["h-full"])}
        width={size}
        height={size}
        src={src}
        alt={displayName}
      />
    </div>
  );
};
