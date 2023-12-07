"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import {
  useRegisterFormEditSemitaggings,
  useRegisterFormEditTaggings,
} from "../RegisterFormCommon";
import { SemitagButton } from "../SemitagButton";
import { TagButton } from "../TagButton";
import BilibiliOriginalSource from "./BilibiliOriginalSource";

const Mutation = graphql(`
  mutation RegisterBilibiliMADForm_RegisterMAD(
    $input: RegisterBilibiliMADInput!
  ) {
    registerBilibiliMAD(input: $input) {
      __typename
      ... on RegisterBilibiliMADSucceededPayload {
        video {
          ...Link_Video
          id
          title
        }
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerBilibiliMAD"],
      { __typename: "RegisterBilibiliMADSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(Mutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      tagIds,
      semitagNames,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          primaryThumbnailUrl: thumbnailUrl,
          tagIds,
          semitagNames,
          sourceIds: [sourceId],
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerBilibiliMAD.__typename) {
        case "RegisterBilibiliMADSucceededPayload":
          onSuccess(data.registerBilibiliMAD);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};

export const BilibiliRegisterOriginalSourceFragment = graphql(`
  fragment BilibiliForm_OriginalSource2 on BilibiliOriginalSource {
    url
    sourceId
    title
    thumbnailUrl(scale: LARGE)
    ...BilibiliForm_OriginalSource
  }
`);
export default function BilibiliRegisterForm({
  className,
  style,
  handleSuccess,
  handleCancel,
  sourceFragment,
}: {
  className?: string;
  style?: React.CSSProperties;
  handleSuccess(): void;
  handleCancel(): void;
  sourceFragment: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>;
}) {
  const source = useFragment(
    BilibiliRegisterOriginalSourceFragment,
    sourceFragment
  );

  const [title, setTitle] = useState<string>(source.title);
  const { appendTag, isSelecting, removeTag, taggingsPayload, tags } =
    useRegisterFormEditTaggings();
  const {
    appendSemitag,
    isIncludeSemitag,
    removeSemitag,
    semitaggings,
    semitaggingsPayload,
  } = useRegisterFormEditSemitaggings();

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const registerMAD = useRegisterVideo({
    onSuccess({ video }) {
      callToast(
        <>
          <MadPageLink
            fragment={video}
            className={clsx("font-bold text-vivid-primary")}
          >
            {video.title}
          </MadPageLink>
          を登録しました．
        </>
      );
      handleSuccess();
    },
  });
  const payload = useMemo(() => {
    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.thumbnailUrl,
      tagIds: taggingsPayload,
      semitagNames: semitaggingsPayload,
    };
  }, [
    semitaggingsPayload,
    source.sourceId,
    source.thumbnailUrl,
    taggingsPayload,
    title,
  ]);

  const handleSubmit = useCallback(() => {
    if (!payload) return;
    registerMAD(payload);
  }, [payload, registerMAD]);

  return (
    <div
      className={clsx(
        className,
        ["grow"],
        [["p-4"]],
        ["flex flex-col gap-y-4"]
      )}
      style={style}
    >
      <form
        className={clsx("flex h-full flex-col gap-y-6")}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={clsx("flex flex-col gap-y-4")}>
          <div className={clsx("w-full shrink-0")}>
            <label className={clsx("flex flex-col gap-y-1")}>
              <div className={clsx("text-xs font-bold text-slate-400")}>
                タイトル
              </div>
              <TextInput2
                size="small"
                placeholder={"動画タイトル"}
                value={title}
                onChange={(v) => setTitle(v)}
              />
            </label>
          </div>
          <div className={clsx("flex flex-col gap-y-2")}>
            <div className={clsx("flex gap-x-2")}>
              <div
                className={clsx(
                  "shrink-0 py-0.5 text-xs font-bold text-slate-400"
                )}
              >
                追加されるタグ
              </div>
              {tags.length === 0 && (
                <div
                  className={clsx(
                    "shrink-0 self-center text-xs",
                    "text-slate-400"
                  )}
                >
                  なし
                </div>
              )}
              {tags.length > 0 && (
                <div
                  className={clsx("flex", "flex-wrap", "gap-x-1", "gap-y-1")}
                >
                  {tags.map(({ id: tagId, fragment }) => (
                    <TagButton
                      key={tagId}
                      tagId={tagId}
                      fragment={fragment}
                      append={(f) => appendTag(tagId, f)}
                      remove={() => removeTag(tagId)}
                      selected={tags.map(({ id }) => id).includes(tagId)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={clsx("flex gap-x-2")}>
              <div
                className={clsx(
                  "shrink-0 py-0.5 text-xs font-bold text-slate-400"
                )}
              >
                追加される仮タグ
              </div>
              {semitaggings.length === 0 && (
                <div
                  className={clsx(
                    "shrink-0 self-center text-xs",
                    "text-slate-400"
                  )}
                >
                  なし
                </div>
              )}
              {semitaggings.length > 0 && (
                <div
                  className={clsx("flex", "flex-wrap", "gap-x-1", "gap-y-1")}
                >
                  {semitaggings.map(({ name }) => (
                    <SemitagButton
                      key={name}
                      name={name}
                      append={() => appendSemitag(name)}
                      remove={() => removeSemitag(name)}
                      selected={isIncludeSemitag(name)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={clsx("mt-auto shrink-0")}>
              <TagSearcher
                limit={5}
                size="small"
                className={clsx("z-10 w-full")}
                handleSelect={(tagId, fragment) => appendTag(tagId, fragment)}
                Additional={({ query }) => (
                  <div className={clsx("flex items-center")}>
                    <div
                      className={clsx(
                        "rounded-sm border border-slate-700 bg-slate-900 px-0.5 py-0.25 text-xs text-slate-300"
                      )}
                    >
                      {query}
                    </div>
                    <div className={clsx("shrink-0 text-sm text-slate-500")}>
                      を仮タグとして追加
                    </div>
                  </div>
                )}
                showAdditional={(query) => !isIncludeSemitag(query)}
                handleAdditionalClicked={(query) => appendSemitag(query)}
              />
            </div>
          </div>
        </div>
        <div className={clsx("flex flex-col gap-y-2")}>
          <div className={clsx("flex gap-x-2")}>
            <div
              className={clsx(
                ["select-none"],
                ["px-2 py-1"],
                [
                  "bg-slate-950 aria-checked:bg-slate-700 aria-disabled:bg-slate-900 hover:bg-slate-800",
                ],
                [
                  "text-xs font-bold text-slate-400 aria-checked:text-slate-400 aria-disabled:text-slate-700",
                ],
                [
                  "rounded border border-slate-700 aria-checked:border-slate-600 aria-disabled:border-slate-800",
                ],
                [
                  "cursor-pointer aria-checked:cursor-default aria-disabled:cursor-default",
                ],
                ["cursor-pointer aria-checked:cursor-default"]
              )}
              onClick={() => setTab("SOURCE")}
              aria-checked={tab === "SOURCE"}
            >
              ソース情報
            </div>
          </div>
          <div className={clsx({ hidden: tab !== "SOURCE" })}>
            <BilibiliOriginalSource
              fragment={source}
              isSelectingTag={isSelecting}
              appendTag={({ tagId, fragment }) => appendTag(tagId, fragment)}
              removeTag={(tagId) => removeTag(tagId)}
              isSelectingSemitag={isSelecting}
              appendSemitag={(name) => appendSemitag(name)}
              removeSemitag={(name) => removeSemitag(name)}
            />
          </div>
        </div>
        <div className={clsx("mt-auto flex w-full shrink-0")}>
          <Button submit text="登録する" size="medium" color="blue" />
          <Button
            className={clsx("ml-auto")}
            onClick={() => {
              handleCancel();
            }}
            text="戻る"
            size="medium"
            color="green"
          />
        </div>
      </form>
    </div>
  );
}
