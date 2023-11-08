"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";

export const ToggleSwitch: React.FC<{
  className?: string;
  handleToggle(v: boolean): void;
  size?: number;
}> = ({ className, handleToggle, size = 16 }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    handleToggle(toggle);
  }, [toggle, handleToggle]);

  return (
    <div
      style={{
        width: size * 2.5,
        height: size * 1.25,
      }}
      className={clsx(
        className,
        ["group/toggle"],
        ["cursor-pointer"],
        ["flex"],
        ["rounded-full"],
        ["overflow-hidden"],
        ["bg-slate-400", "aria-checked:bg-green-400"],
        ["transition-colors", "duration-75"],
        ["relative"]
      )}
      tabIndex={0}
      role="checkbox"
      aria-checked={toggle}
      onClick={() => setToggle((prev) => !prev)}
    >
      <div
        style={{
          width: size,
          height: size,
          top: size * 0.125,
          left: size * 0.25,
        }}
        className={clsx(
          ["absolute"],
          ["rounded-full"],
          ["bg-white"],
          ["group-aria-checked/toggle:translate-x-full"],
          ["transition-transform", "duration-75"],
          ["shadow"]
        )}
      />
    </div>
  );
};
