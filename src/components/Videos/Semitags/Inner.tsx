"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import { VideoPage_SemitagsFragment } from "~/gql/graphql";

graphql(`
  fragment VideoPage_Semitags on Video {
    id
    semitags(resolved: false) {
      id
      name
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  tags: VideoPage_SemitagsFragment;
}> = ({ className, tags }) => {
  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>仮タグ</h2>
      <div
        className={clsx(
          ["mt-2"],
          ["flex", "flex-col", "items-start"],
          ["gap-y-2"]
        )}
      >
        {tags.semitags.map(({ id, name }) => (
          <div
            key={id}
            className={clsx(
              ["flex"],
              ["items-center"],
              ["bg-white"],
              ["border", "border-gray-200"],
              ["shadow-sm"],
              ["rounded"],
              ["px-2", "py-0.5"],
              ["text-slate-600"],
              ["text-xs"]
            )}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
};
