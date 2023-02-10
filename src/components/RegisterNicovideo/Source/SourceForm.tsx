import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_FetchNicovideoSourceFragment,
  RegisterNicovideoPage_FetchNicovideoTagCandidatesFragmentDoc,
} from "~/gql/graphql";

import { Candidates } from "./SourceTag";

graphql(`
  fragment RegisterNicovideoPage_FetchNicovideoSource on NicovideoOriginalSource {
    sourceId
    title
    thumbnailUrl
    tags {
      name
      searchTags(input: { limit: 3 }) {
        ...RegisterNicovideoPage_FetchNicovideoTagCandidates
      }
    }
  }
`);
export const SourceForm: React.FC<{
  className?: string;
  source: RegisterNicovideoPage_FetchNicovideoSourceFragment;

  isTagSelected(id: string): boolean;
  selectTag(id: string): void;
  deselectTag(id: string): void;
}> = ({ className, source, isTagSelected, selectTag, deselectTag }) => {
  return (
    <div className={clsx(className, ["flex", ["flex-col"]], ["gap-y-4"])}>
      <div>
        <p className={clsx()}>タイトル</p>
        <p className={clsx(["mt-1"], ["text-sm"], ["font-bold"])}>
          {source.title}
        </p>
      </div>
      <div className={clsx()}>
        <p>タグ</p>
        <div
          className={clsx(
            ["mt-1"],
            ["grid", ["grid-cols-2"], ["gap-x-2"], ["gap-y-3"]]
          )}
        >
          {source.tags.map((tag) => (
            <div key={tag.name}>
              <div>{tag.name}</div>
              <Candidates
                className={clsx(["mt-1"])}
                candidates={getFragment(
                  RegisterNicovideoPage_FetchNicovideoTagCandidatesFragmentDoc,
                  tag.searchTags
                )}
                isSelected={isTagSelected}
                select={selectTag}
                deselect={deselectTag}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={clsx()}>
        <p>サムネイル</p>
        <div className={clsx(["mt-1"])}>
          <Image
            className={clsx(["object-scale-down"], ["h-32"])}
            src={source.thumbnailUrl}
            width={260}
            height={200}
            alt={`${source.sourceId}のサムネイル`}
          />
        </div>
      </div>
    </div>
  );
};
