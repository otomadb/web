import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { SourceData } from "../FetchSource";
import { SourceTag } from "./SourceTag";

export const SourceForm: React.FC<{
  className?: string;
  source: SourceData;

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
          {source.tags.map((tag, i) => (
            <SourceTag
              key={i}
              sourceTag={tag}
              isSelected={isTagSelected}
              select={selectTag}
              deselect={deselectTag}
            />
          ))}
        </div>
      </div>
      <div className={clsx()}>
        <p>サムネイル</p>
        <div className={clsx(["mt-1"])}>
          <Image
            className={clsx(["object-scale-down"], ["h-32"])}
            src={source.thumbnail}
            width={260}
            height={200}
            alt={`${source.sourceId}のサムネイル`}
          />
        </div>
      </div>
    </div>
  );
};
