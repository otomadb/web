import clsx from "clsx";
import { toSvg } from "jdenticon";
import Image from "next/image";
import React, { useMemo } from "react";

export const UserIcon: React.FC<{
  className?: string;
  name: string;
  src: string | null | undefined;
  size?: number;
}> = ({ className, src, name, size = 64 }) => {
  const ensuresrc = useMemo(() => {
    if (src) return src;
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
