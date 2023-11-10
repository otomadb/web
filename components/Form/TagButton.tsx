"use client";
import clsx from "clsx";
import React from "react";

import { CommonTagFragment } from "~/components/CommonTag";
import CommonTag from "~/components/CommonTag";
import { FragmentType } from "~/gql";

export const Fragment = CommonTagFragment;
export const TagButton: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  tagId: string;
  selected: boolean;
  append(f: FragmentType<typeof Fragment>): void;
  remove(): void;
}> = ({ className, selected, remove, append, ...props }) => {
  return (
    <div
      className={clsx(className, ["select-none"])}
      role="button"
      onClick={() => {
        if (selected) remove();
        else append(props.fragment);
      }}
    >
      <CommonTag size="xs" fragment={props.fragment} disabled={!selected} />
    </div>
  );
};
