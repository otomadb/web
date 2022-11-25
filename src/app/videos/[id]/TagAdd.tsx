"use client";

import "client-only";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { DelayedInput } from "~/components/DelayedInput";
import { useLoggedIn } from "~/hooks/useLoggedIn";

export const TagAdd: React.FC<{ className?: string }> = ({ className }) => {
  const isLoggedIn = useLoggedIn();

  if (!isLoggedIn)
    return (
      <div className={clsx(className)}>
        <p className={clsx(["text-xm"])}>
          you need <Link href={"/login"}>login</Link> to edit tags
        </p>
      </div>
    );

  return (
    <div className={clsx(className)}>
      <DelayedInput
        className={clsx(["w-full"], ["border"])}
        onUpdateQuery={() => {}}
      />
    </div>
  );
};
