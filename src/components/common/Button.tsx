"use client";
import clsx from "clsx";
import React, { ReactNode } from "react";

const ButtonTemplate: React.FC<{
  className?: string;
  onClick?(): void;
  disabled?: boolean;
  children: ReactNode;
}> = ({ className, onClick, disabled, children }) => (
  <button
    type="button"
    onClick={() => onClick?.()}
    className={clsx(
      className,
      ["rounded"],
      ["group/button"],
      ["disabled:bg-slate-300"],
      ["disabled:text-slate-200"]
    )}
    disabled={disabled}
  >
    {children}
  </button>
);

export const BlueButton: React.FC<
  React.ComponentProps<typeof ButtonTemplate>
> = ({ className, ...props }) => (
  <ButtonTemplate
    className={clsx(
      className,
      ["bg-blue-400", "hover:bg-blue-500"],
      ["text-blue-50", "hover:text-blue-100"]
    )}
    {...props}
  />
);

export const RedButton: React.FC<
  React.ComponentProps<typeof ButtonTemplate>
> = ({ className, ...props }) => (
  <ButtonTemplate
    className={clsx(
      className,
      ["bg-red-400", "hover:bg-red-500"],
      ["text-red-50", "hover:text-red-100"]
    )}
    {...props}
  />
);
