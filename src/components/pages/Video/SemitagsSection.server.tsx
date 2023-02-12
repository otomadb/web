import "server-only";

import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_SemitagSection_SemitagFragment,
  VideoPage_SemitagSection_SemitagFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export async function SemitagsSection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage_SemitagsSection($id: ID!) {
        video(id: $id) {
          semitags {
            id
            ...VideoPage_SemitagSection_Semitag
          }
        }
      }
    `),
    { id: videoId }
  );

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          仮タグ
        </h2>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {video.semitags.map((semitag) => (
          <Semitag
            key={semitag.id}
            fragment={getFragment(
              VideoPage_SemitagSection_SemitagFragmentDoc,
              semitag
            )}
          />
        ))}
      </div>
    </section>
  );
}

graphql(`
  fragment VideoPage_SemitagSection_Semitag on Semitag {
    id
    name
  }
`);
export const Semitag: React.FC<{
  className?: string;
  fragment: VideoPage_SemitagSection_SemitagFragment;
}> = ({ className, fragment }) => {
  return (
    <div
      className={clsx(className, ["flex", "items-center", "justify-between"])}
    >
      <div
        className={clsx(
          ["bg-white"],
          ["border", "border-gray-200"],
          ["shadow-sm"],
          ["rounded"],
          ["px-2", "py-0.5"],
          ["text-slate-700"],
          ["text-xs"]
        )}
      >
        {fragment.name}
      </div>
    </div>
  );
};
