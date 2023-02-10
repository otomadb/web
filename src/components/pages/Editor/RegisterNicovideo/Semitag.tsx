"use client";
import clsx from "clsx";
import React from "react";

export const Semitag: React.FC<{
  className?: string;
  name: string;
  onClick(): void;
}> = ({ className, name, onClick }) => {
  return (
    <div
      className={clsx(
        className,
        ["group"],
        ["rounded"],
        ["px-2"],
        ["py-0.5"],
        ["border", "border-slate-300"],
        ["aria-checked:bg-sky-100", ["bg-gray-50", "hover:bg-sky-50"]],
        ["cursor-pointer"],
        ["text-xs"]
      )}
      onClick={() => onClick()}
    >
      {name}
    </div>
  );
};
