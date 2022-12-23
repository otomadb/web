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

  selectThumbnail(url: string): void;
}> = ({
  className,
  source,
  isTagSelected,
  selectTag,
  deselectTag,
  selectThumbnail,
}) => {
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
        <div
          className={clsx(
            ["mt-1"],
            ["grid", ["grid-cols-2"], ["gap-x-2"], ["gap-y-3"]]
          )}
        >
          {source.thumbnails.map(({ type, url }) => (
            <div key={type}>
              <div className={clsx(["text-sm"])}>{type}</div>
              <div
                role="button"
                className={clsx(["block"], ["mt-2"])}
                onClick={() => selectThumbnail(url)}
              >
                <Image
                  className={clsx(["object-scale-down"], ["h-32"])}
                  src={url}
                  width={260}
                  height={200}
                  alt={`${source.id}の${type}のサムネイル`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
