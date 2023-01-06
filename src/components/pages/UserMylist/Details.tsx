"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import { UserMylistPage_DetailsFragment } from "~/gql/graphql";

graphql(`
  fragment UserMylistPage_Details on Mylist {
    id
    title
    isLikeList
    range
    holder {
      id
      displayName
    }
  }
`);

export const Details: React.FC<{
  className?: string;
  fallback: UserMylistPage_DetailsFragment;
}> = ({ className, fallback }) => {
  const { title, holder, isLikeList, range } = fallback;

  return (
    <section className={clsx(className, ["px-4"], ["py-4"])}>
      <h1 className={clsx(["text-slate-900"], ["text-xl"])}>
        {isLikeList ? `${holder.displayName}がいいねした動画` : title}
      </h1>
      <div className={clsx(["mt-1"], ["flex", "items-center", "gap-x-2"])}>
        <div className={clsx(["text-sm"], ["text-slate-600"])}>{range}</div>
      </div>
    </section>
  );
};
