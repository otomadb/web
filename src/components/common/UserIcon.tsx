import clsx from "clsx";
import { toSvg } from "jdenticon";
import Image from "next/image";
import React, { useMemo } from "react";

import { graphql } from "~/gql";
import { Component_UserIconFragment } from "~/gql/graphql";

export const UserIcon: React.FC<{
  className?: string;
  name: string;
  src: string | null;
  size?: number;
}> = ({ className, src, name, size = 64 }) => {
  const ensuresrc = useMemo(() => {
    if (src && src !== "") return src;
    const base64 = Buffer.from(toSvg(name, size)).toString("base64");
    return `data:image/svg+xml;base64,${base64}`;
  }, [name, size, src]);

  return (
    <Image
      className={clsx([className], ["rounded-sm"])}
      width={size}
      height={size}
      src={ensuresrc}
      alt={name}
    />
  );
};

graphql(`
  fragment Component_UserIcon on User {
    name
    displayName
    icon
  }
`);
export const UserIcon2: React.FC<{
  className?: string;
  fragment: Component_UserIconFragment;
  size?: number;
}> = ({ className, fragment, size = 64 }) => {
  const src = useMemo(() => {
    if (fragment?.icon) return fragment.icon;

    const base64 = Buffer.from(toSvg(fragment.name, size)).toString("base64");
    return `data:image/svg+xml;base64,${base64}`;
  }, [fragment.icon, fragment.name, size]);

  return (
    <div
      className={clsx(className, ["rounded-md", "overflow-hidden"])}
      style={{ width: size, height: size }}
    >
      <Image
        className={clsx(className)}
        width={size}
        height={size}
        src={src}
        alt={fragment.displayName}
      />
    </div>
  );
};
