"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import UserPageLink from "~/app/(v2)/users/[name]/Link";
import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import NicovideoOriginalSource from "./NicovideoOriginalSource";
import { SemitagButton } from "./SemitagButton";
import { Fragment as TagButtonFragment, TagButton } from "./TagButton";

const Mutation = graphql(`
  mutation RegisterFromNicovideoForm_RegisterVideo(
    $input: RegisterVideoFromNicovideoInput!
  ) {
    registerVideoFromNicovideo(input: $input) {
      __typename
      ... on RegisterVideoFromNicovideoSucceededPayload {
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
      ResultOf<typeof Mutation>["registerVideoFromNicovideo"],
      { __typename: "RegisterVideoFromNicovideoSucceededPayload" }
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
      nicovideoRequestId,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
      nicovideoRequestId: string | undefined;
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnailUrl: thumbnailUrl,
          tagIds,
          semitagNames,
          sourceIds: [sourceId],
          requestId: nicovideoRequestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideoFromNicovideo.__typename) {
        case "RegisterVideoFromNicovideoSucceededPayload":
          onSuccess(data.registerVideoFromNicovideo);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};

export const NicovideoRegisterOriginalSourceFragment = graphql(`
  fragment RegisterFromNicovideoForm_OriginalSource2 on NicovideoOriginalSource {
    sourceId
    url
    info {
      title
      thumbnailUrl
    }
    ...RegisterFromNicovideoForm_OriginalSource
  }
`);
export const NicovideoRegisterFormRequestFragment = graphql(`
  fragment RegisterFromNicovideoForm_Request on NicovideoRegistrationRequest {
    id
    title
    checked
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
    taggings {
      id
      tag {
        id
        ...CommonTag
      }
    }
    semitaggings {
      id
      name
    }
  }
`);
export default function NicovideoRegisterForm({
  className,
  style,
  handleSuccess,
  handleCancel,
  sourceFragment,
  requestFragment,
}: {
  className?: string;
  style?: React.CSSProperties;
  handleSuccess?(): void;
  handleCancel(): void;
  sourceFragment: FragmentType<typeof NicovideoRegisterOriginalSourceFragment>;
  requestFragment?: FragmentType<typeof NicovideoRegisterFormRequestFragment>;
}) {
  const source = useFragment(
    NicovideoRegisterOriginalSourceFragment,
    sourceFragment
  );
  const request = useFragment(
    NicovideoRegisterFormRequestFragment,
    requestFragment
  );

  const [title, setTitle] = useState<string>(source.info.title);
  const [tags, dispatchTags] = useReducer(
    (
      prev: { id: string; fragment: FragmentType<typeof TagButtonFragment> }[],
      action:
        | {
            type: "append";
            tagId: string;
            fragment: FragmentType<typeof TagButtonFragment>;
          }
        | { type: "remove"; tagId: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [
            ...new Set([
              ...prev,
              { id: action.tagId, fragment: action.fragment },
            ]),
          ];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );
  const tagIds = useMemo(() => tags.map(({ id }) => id), [tags]);
  const [semitagNames, dispatchSemitags] = useReducer(
    (
      prev: string[],
      action:
        | { type: "append"; name: string }
        | { type: "remove"; name: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, action.name])];
        case "remove":
          return prev.filter((id) => id !== action.name);
        case "clear":
          return [];
      }
    },
    []
  );

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const registerVideo = useRegisterVideo({
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
      if (handleSuccess) handleSuccess();
    },
  });
  const payload = useMemo(() => {
    return {
      title,
      sourceId: source.sourceId,
      thumbnailUrl: source.info.thumbnailUrl,
      nicovideoRequestId: request?.id,
      tagIds,
      semitagNames,
    };
  }, [request?.id, semitagNames, source, tagIds, title]);

  const handleSubmit = useCallback(() => {
    if (!payload) return;
    registerVideo(payload);
  }, [payload, registerVideo]);

  return (
    <div className={clsx(className, "flex flex-col gap-y-4 p-4")} style={style}>
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
                    "shrink-0 self-center text-xs text-slate-400"
                  )}
                >
                  なし
                </div>
              )}
              {tags.length > 0 && (
                <div className={clsx("flex flex-wrap gap-1")}>
                  {tags.map(({ id: tagId, fragment }) => (
                    <TagButton
                      key={tagId}
                      tagId={tagId}
                      fragment={fragment}
                      append={(f) =>
                        dispatchTags({ type: "append", tagId, fragment: f })
                      }
                      remove={() => dispatchTags({ type: "remove", tagId })}
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
              {semitagNames.length === 0 && (
                <div
                  className={clsx(
                    "shrink-0 self-center text-xs text-slate-400"
                  )}
                >
                  なし
                </div>
              )}
              {semitagNames.length > 0 && (
                <div className={clsx("flex flex-wrap gap-1")}>
                  {semitagNames.map((name) => (
                    <SemitagButton
                      key={name}
                      name={name}
                      append={() => dispatchSemitags({ type: "append", name })}
                      remove={() => dispatchSemitags({ type: "remove", name })}
                      selected={semitagNames.includes(name)}
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
                handleSelect={(tagId, fragment) => {
                  dispatchTags({ type: "append", tagId, fragment });
                }}
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
                showAdditional={(query) => !semitagNames.includes(query)}
                handleAdditionalClicked={(query) =>
                  dispatchSemitags({ type: "append", name: query })
                }
              />
            </div>
          </div>
        </div>
        <div className={clsx("flex flex-col gap-y-2")}>
          <div className={clsx("flex gap-x-2")}>
            <div
              className={clsx(
                "cursor-pointer select-none rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs font-bold text-slate-400 aria-checked:cursor-default aria-checked:border-slate-600 aria-checked:bg-slate-700 aria-checked:text-slate-400 aria-disabled:cursor-default aria-disabled:border-slate-800 aria-disabled:bg-slate-900 aria-disabled:text-slate-700 hover:bg-slate-800"
              )}
              onClick={() => setTab("SOURCE")}
              aria-checked={tab === "SOURCE"}
            >
              ソース情報
            </div>
            <div
              className={clsx(
                "cursor-pointer select-none rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs font-bold text-slate-400 aria-checked:cursor-default aria-checked:border-slate-600 aria-checked:bg-slate-700 aria-checked:text-slate-400 aria-disabled:cursor-default aria-disabled:border-slate-800 aria-disabled:bg-slate-900 aria-disabled:text-slate-700 hover:bg-slate-800"
              )}
              onClick={() => {
                if (request) setTab("REQUEST");
              }}
              aria-checked={tab === "REQUEST"}
              aria-disabled={!request}
            >
              リクエスト情報
            </div>
          </div>
          <div className={clsx({ hidden: tab !== "SOURCE" })}>
            <NicovideoOriginalSource
              fragment={source}
              selectingTagId={tagIds}
              appendTag={({ tagId, fragment }) =>
                dispatchTags({ type: "append", tagId, fragment })
              }
              removeTag={(tagId) => dispatchTags({ type: "remove", tagId })}
              selectingSemitagNames={semitagNames}
              appendSemitag={(name) =>
                dispatchSemitags({ type: "append", name })
              }
              removeSemitag={(name) =>
                dispatchSemitags({ type: "remove", name })
              }
            />
          </div>
          {request && (
            <div
              className={clsx(
                { hidden: tab !== "REQUEST" },
                "flex flex-col gap-y-2"
              )}
            >
              <div className={clsx("flex flex-col gap-y-2")}>
                <div className={clsx("flex items-center")}>
                  <p className={clsx("grow text-sm text-slate-500")}>
                    <span className={clsx("font-bold text-slate-400")}>
                      {request.title}
                    </span>
                    としてリクエストされています
                  </p>
                  <div className={clsx("shrink-0")}>
                    <UserPageLink fragment={request.requestedBy}>
                      <UserIcon size={24} fragment={request.requestedBy} />
                    </UserPageLink>
                  </div>
                </div>
                <div className={clsx("flex flex-col gap-y-2")}>
                  <div
                    className={clsx("shrink-0 py-0.5 text-xs text-slate-500")}
                  >
                    タグ
                  </div>
                  {request.taggings.length === 0 && (
                    <div className={clsx("shrink-0 text-xs text-slate-400")}>
                      なし
                    </div>
                  )}
                  {request.taggings.length > 0 && (
                    <div className={clsx("flex flex-wrap gap-1")}>
                      {request.taggings.map((tagging) => (
                        <TagButton
                          key={tagging.id}
                          fragment={tagging.tag}
                          tagId={tagging.tag.id}
                          append={(f) =>
                            dispatchTags({
                              type: "append",
                              tagId: tagging.tag.id,
                              fragment: f,
                            })
                          }
                          remove={() =>
                            dispatchTags({
                              type: "remove",
                              tagId: tagging.tag.id,
                            })
                          }
                          selected={tagIds.includes(tagging.tag.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className={clsx("flex flex-col gap-y-2")}>
                  <div
                    className={clsx("shrink-0 py-0.5 text-xs text-slate-500")}
                  >
                    仮タグ
                  </div>
                  {request.semitaggings.length === 0 && (
                    <div className={clsx("shrink-0 text-xs text-slate-400")}>
                      なし
                    </div>
                  )}
                  {request.semitaggings.length > 0 && (
                    <div className={clsx("flex flex-wrap gap-1")}>
                      {request.semitaggings.map((semitagging) => (
                        <SemitagButton
                          key={semitagging.id}
                          name={semitagging.name}
                          append={() =>
                            dispatchSemitags({
                              type: "append",
                              name: semitagging.name,
                            })
                          }
                          remove={() =>
                            dispatchSemitags({
                              type: "remove",
                              name: semitagging.name,
                            })
                          }
                          selected={semitagNames.includes(semitagging.name)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
