"use client";
import clsx from "clsx";
import React from "react";

const ButtonTemplate: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ className, children, ...props }) => (
  <button
    className={clsx(
      className,
      ["rounded"],
      ["group/button"],
      ["disabled:bg-slate-300"],
      ["disabled:text-slate-200"]
    )}
    {...props}
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
