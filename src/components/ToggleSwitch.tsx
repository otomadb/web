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
      className={clsx(className, [
        "group/toggle relative flex cursor-pointer overflow-hidden rounded-full bg-slate-400 duration-75 aria-checked:bg-green-400",
      ])}
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
        className={clsx([
          "absolute rounded-full bg-white shadow transition-transform duration-75 group-aria-checked/toggle:translate-x-full",
        ])}
      />
    </div>
  );
};
