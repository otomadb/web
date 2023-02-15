import "server-only";

import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_SemitagFragmentDoc,
  VideoPage_SemitagsSectionFragment,
} from "~/gql/graphql";

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

export const SemitagsSection: React.FC<{
  className?: string;
  fragment: VideoPage_SemitagsSectionFragment;
}> = ({ className, fragment }) => {
  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          仮タグ
        </h2>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {fragment.semitags.map((semitag) => (
          <Semitag
            key={semitag.id}
            fragment={getFragment(VideoPage_SemitagFragmentDoc, semitag)}
          />
        ))}
      </div>
    </section>
  );
};
