"use client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { TagSearcher } from "~/components/common/TagSearcher";

import { TagButton } from "./TagButton";

export const Confirm: React.FC<{
  className?: string;
  TitleInput: React.FC<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;

  thumbnailUrl: string;

  tags: { id: string; tagId: string }[];
  addTag(tagId: string): void;
  removeTag(index: number): void;

  semitags: { id: string; name: string }[];
  addSemitag(name: string): void;
  removeSemitag(index: number): void;
}> = ({
  className,
  TitleInput,
  thumbnailUrl,
  tags,
  addTag,
  semitags,
  addSemitag,
  removeSemitag,
}) => {
  return (
    <div className={clsx(className)}>
      <div>追加フォーム</div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "gap-y-4"])}>
        <div>
          <label className={clsx(["flex", "flex-col", "gap-y-1"])}>
            <div className={clsx(["text-xs"])}>タイトル</div>
            <TitleInput
              className={clsx(
                ["px-2"],
                ["py-1"],
                ["text-sm"],
                ["bg-white"],
                ["border", "border-gray-300"],
                ["rounded"]
              )}
            />
          </label>
        </div>
        <div className={clsx(["flex", "gap-x-4"])}>
          <label
            className={clsx(
              ["w-72"],
              ["flex-shrink-0"],
              ["flex", "flex-col", "gap-y-1"]
            )}
          >
            <div className={clsx(["text-xs"])}>サムネイル</div>
            {thumbnailUrl && (
              <Image
                className={clsx(["object-scale-down"], ["w-48"])}
                src={thumbnailUrl}
                width={260}
                height={200}
                alt={`サムネイル候補`}
              />
            )}
          </label>
          <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
            <div className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}>
              <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
                <div className={clsx(["text-xs"])}>追加されるタグ</div>
                <div
                  className={clsx(["flex", "flex-wrap", "gap-x-2", "gap-y-2"])}
                >
                  {tags.map(({ id, tagId }) => (
                    <TagButton key={id} tagId={tagId} />
                  ))}
                </div>
              </div>
              <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
                <div className={clsx(["text-xs"])}>追加される仮タグ</div>
                <div
                  className={clsx(["flex", "flex-wrap", "gap-x-2", "gap-y-2"])}
                >
                  {semitags.map(({ id, name }, index) => (
                    <button
                      key={id}
                      className={clsx(
                        ["flex"],
                        ["text-left"],
                        ["text-xs"],
                        ["px-1"],
                        ["py-0.5"],
                        ["border"]
                      )}
                      onClick={() => removeSemitag(index)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={clsx(["flex-shrink-0"])}>
              <TagSearcher
                handleSelect={(tagId) => addTag(tagId)}
                Optional={({ query, clearQuery }) => {
                  if (semitags.find(({ name }) => name === query))
                    return (
                      <div>
                        <div className={clsx(["text-xs"])}>
                          <span
                            className={clsx(
                              ["bg-white"],
                              ["border", "border-gray-200"],
                              ["rounded"],
                              ["px-2", "py-0.5"]
                            )}
                          >
                            {query}
                          </span>
                          <span>は既に仮タグとして追加されています</span>
                        </div>
                      </div>
                    );
                  return (
                    <div>
                      <button
                        className={clsx(
                          ["text-sm"],
                          ["border"],
                          ["rounded"],
                          ["px-2", "py-1"],
                          ["bg-white", "hover:bg-blue-200"]
                        )}
                        onClick={() => {
                          addSemitag(query);
                          clearQuery();
                        }}
                      >
                        <span
                          className={clsx(
                            ["bg-white"],
                            ["border", "border-gray-200"],
                            ["rounded"],
                            ["px-2", "py-0.5"]
                          )}
                        >
                          {query}
                        </span>
                        <span>を仮タグとして追加</span>
                      </button>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
