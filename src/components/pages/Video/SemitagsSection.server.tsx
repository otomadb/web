import "server-only";

import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_SemitagFragmentDoc,
  VideoPage_SemitagsSectionFragmentDoc,
} from "~/gql/graphql";
import { fetchGql } from "~/utils/fetchGql";

import { Semitag } from "./Semitag";

graphql(`
  fragment VideoPage_SemitagsSection on Video {
    id
    semitags(checked: false) {
      id
      ...VideoPage_Semitag
    }
  }
`);

export const SemitagsSection = async ({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) => {
  const { video } = await fetchGql(
    graphql(`
      query VideoPage_SemitagsSection($id: ID!) {
        video(id: $id) {
          ...VideoPage_SemitagsSection
        }
      }
    `),
    { id: videoId },
    { next: { revalidate: 0 } }
  );

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          仮タグ
        </h2>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {getFragment(VideoPage_SemitagsSectionFragmentDoc, video).semitags.map(
          (semitag) => (
            <Semitag
              key={semitag.id}
              fragment={getFragment(VideoPage_SemitagFragmentDoc, semitag)}
            />
          )
        )}
      </div>
    </section>
  );
};
