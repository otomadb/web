"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_SemitagsSectionFragment,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_UpstreamSemitagsSectionDocument,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_SemitagsSection on Video {
    id
    semitags(resolved: false) {
      id
      name
    }
  }

  query VideoPage_UpstreamSemitagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_SemitagsSection
    }
  }
`);

export const SemitagsSection: React.FC<{
  className?: string;
  fallback: VideoPage_SemitagsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamSemitagsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(
    VideoPage_SemitagsSectionFragmentDoc,
    data?.video
  );
  const a = useMemo(() => upstream || fallback, [fallback, upstream]);

  const { semitags } = a;

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
        {semitags.map(({ id, name }) => (
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
