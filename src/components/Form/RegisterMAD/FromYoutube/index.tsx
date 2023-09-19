"use client";
import "client-only";

import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useQuery } from "urql";

import { BlueButton } from "~/components/Button";
import { SemitagButton } from "~/components/RegisterFromNicovideoForm/SemitagButton";
import {
  Fragment as TagButtonFragment,
  TagButton,
} from "~/components/RegisterFromNicovideoForm/TagButton";
import TagSearcher from "~/components/TagSearcher2";
import { TextInput2 } from "~/components/TextInput";
import { useToaster } from "~/components/Toaster";
import { FragmentType, graphql } from "~/gql";

import { AlreadyRegistered } from "./AlreadyRegistered";
import OriginalSource from "./OriginalSource";
import { RequestExists } from "./Request";
import { SucceededToast } from "./SucceededToast";
import { useRegisterVideo } from "./useRegisterVideo";

export const Loading: React.FC<{ fetching: boolean; data: unknown }> = ({
  fetching,
  data,
}) => {
  return (
    <>
      {(fetching || !data) && (
        <div className={clsx(["text-slate-400"])}>Loading</div>
      )}
      {!fetching && data && <></>}
    </>
  );
};

export const Query = graphql(`
  query RegisterFromYoutubeForm_Check($sourceId: String!) {
    fetchYoutube(input: { sourceId: $sourceId }) {
      source {
        thumbnailUrl
        ...RegisterFromYoutubeForm_OriginalSource
      }
    }
    findYoutubeRegistrationRequest(input: { sourceId: $sourceId }) {
      id
      ...RegisterFromYoutubeForm_Request
    }
    findYoutubeVideoSource(input: { sourceId: $sourceId }) {
      ...RegisterFromYoutubeForm_VideoSource
    }
  }
`);
export default function RegisterForm({
  className,
  style,
  sourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  handleSuccess?(): void;
}) {
  const [{ data, fetching }] = useQuery({
    query: Query,
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  const [title, setTitle] = useState<string>("");
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
    onSuccess(data) {
      callToast(<SucceededToast fragment={data} />);
      if (handleSuccess) handleSuccess();
    },
  });
  const payload = useMemo(() => {
    if (!data || !data.fetchYoutube.source) return null;

    return {
      sourceId,
      title,
      thumbnailUrl: data.fetchYoutube.source.thumbnailUrl,
      YoutubeRequestId: data.findYoutubeRegistrationRequest?.id,
      tagIds,
      semitagNames,
    };
  }, [data, semitagNames, sourceId, tagIds, title]);

  const handleSubmit = useCallback(() => {
    if (!payload) return;
    registerVideo(payload);
  }, [payload, registerVideo]);

  return (
    <div
      className={clsx(
        className,
        ["flex-grow"],
        [["px-4"], ["py-4"]],
        ["flex", "flex-col", "gap-y-4"]
      )}
      style={style}
    >
      {fetching || !data ? (
        <div className={clsx(["text-slate-400"])}>Loading</div>
      ) : data.findYoutubeVideoSource ? (
        <AlreadyRegistered
          className={clsx(["text-slate-400"])}
          fragment={data.findYoutubeVideoSource}
        />
      ) : !data.fetchYoutube.source ? (
        <div className={clsx(["text-slate-400"])}>動画は存在しません</div>
      ) : (
        <form
          className={clsx(["h-full"], ["flex", "flex-col", "gap-y-6"])}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
            <div className={clsx(["flex-shrink-0"], ["w-full"])}>
              <label className={clsx(["flex", "flex-col", "gap-y-1"])}>
                <div
                  className={clsx(["text-xs", "font-bold", "text-slate-400"])}
                >
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
            <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
              <div className={clsx(["flex", "gap-x-2"])}>
                <div
                  className={clsx(
                    ["py-0.5"],
                    ["flex-shrink-0"],
                    ["text-xs", "font-bold", "text-slate-400"]
                  )}
                >
                  追加されるタグ
                </div>
                {tags.length === 0 && (
                  <div
                    className={clsx(
                      ["self-center"],
                      ["flex-shrink-0"],
                      ["text-xs", "text-slate-400"]
                    )}
                  >
                    なし
                  </div>
                )}
                {tags.length > 0 && (
                  <div
                    className={clsx([
                      "flex",
                      "flex-wrap",
                      "gap-x-1",
                      "gap-y-1",
                    ])}
                  >
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
              <div className={clsx(["flex", "gap-x-2"])}>
                <div
                  className={clsx(
                    ["py-0.5"],
                    ["flex-shrink-0"],
                    ["text-xs", "font-bold", "text-slate-400"]
                  )}
                >
                  追加される仮タグ
                </div>
                {semitagNames.length === 0 && (
                  <div
                    className={clsx(
                      ["self-center"],
                      ["flex-shrink-0"],
                      ["text-xs", "text-slate-400"]
                    )}
                  >
                    なし
                  </div>
                )}
                {semitagNames.length > 0 && (
                  <div
                    className={clsx([
                      "flex",
                      "flex-wrap",
                      "gap-x-1",
                      "gap-y-1",
                    ])}
                  >
                    {semitagNames.map((name) => (
                      <SemitagButton
                        key={name}
                        name={name}
                        append={() =>
                          dispatchSemitags({ type: "append", name })
                        }
                        remove={() =>
                          dispatchSemitags({ type: "remove", name })
                        }
                        selected={semitagNames.includes(name)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className={clsx(["mt-auto"], ["flex-shrink-0"])}>
                <TagSearcher
                  limit={5}
                  size="small"
                  className={clsx(["w-full"], ["z-10"])}
                  handleSelect={(tagId, fragment) => {
                    dispatchTags({ type: "append", tagId, fragment });
                  }}
                  Additional={({ query }) => (
                    <div className={clsx(["flex", "items-center"])}>
                      <div
                        className={clsx(
                          ["px-0.5", "py-0.25"],
                          ["bg-slate-900"],
                          ["border", "border-slate-700", "rounded-sm"],
                          ["text-xs", "text-slate-300"]
                        )}
                      >
                        {query}
                      </div>
                      <div
                        className={clsx(
                          ["flex-shrink-0"],
                          ["text-sm"],
                          ["text-slate-500"]
                        )}
                      >
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
          <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
            <div className={clsx(["flex", "gap-x-2"])}>
              <div
                className={clsx(
                  ["select-none"],
                  ["px-2", "py-1"],
                  [
                    "bg-slate-950",
                    "hover:bg-slate-800",
                    "aria-checked:bg-slate-700",
                    "aria-disabled:bg-slate-900",
                  ],
                  [
                    "text-xs",
                    "font-bold",
                    "text-slate-400",
                    "aria-checked:text-slate-400",
                    "aria-disabled:text-slate-700",
                  ],
                  [
                    "border",
                    "border-slate-700",
                    "aria-checked:border-slate-600",
                    "aria-disabled:border-slate-800",
                    "rounded",
                  ],
                  [
                    "cursor-pointer",
                    "aria-checked:cursor-default",
                    "aria-disabled:cursor-default",
                  ],
                  ["cursor-pointer", "aria-checked:cursor-default"]
                )}
                onClick={() => setTab("SOURCE")}
                aria-checked={tab === "SOURCE"}
              >
                ソース情報
              </div>
              <div
                className={clsx(
                  ["select-none"],
                  ["px-2", "py-1"],
                  [
                    "bg-slate-950",
                    "hover:bg-slate-800",
                    "aria-checked:bg-slate-700",
                    "aria-disabled:bg-slate-900",
                  ],
                  [
                    "text-xs",
                    "font-bold",
                    "text-slate-400",
                    "aria-checked:text-slate-400",
                    "aria-disabled:text-slate-700",
                  ],
                  [
                    "border",
                    "border-slate-700",
                    "aria-checked:border-slate-600",
                    "aria-disabled:border-slate-800",
                    "rounded",
                  ],
                  [
                    "cursor-pointer",
                    "aria-checked:cursor-default",
                    "aria-disabled:cursor-default",
                  ]
                )}
                onClick={() => {
                  if (data.findYoutubeRegistrationRequest) setTab("REQUEST");
                }}
                aria-checked={tab === "REQUEST"}
                aria-disabled={!data.findYoutubeRegistrationRequest}
              >
                リクエスト情報
              </div>
            </div>
            <div className={clsx({ hidden: tab !== "SOURCE" })}>
              {data.fetchYoutube.source && (
                <OriginalSource fragment={data.fetchYoutube.source} />
              )}
            </div>
            <div
              className={clsx({ hidden: tab !== "REQUEST" }, [
                "flex",
                "flex-col",
                "gap-y-2",
              ])}
            >
              {data.findYoutubeRegistrationRequest && (
                <RequestExists
                  fragment={data.findYoutubeRegistrationRequest}
                  selectingTagId={tagIds}
                  appendTag={({ tagId, fragment }) => {
                    dispatchTags({ type: "append", tagId, fragment });
                  }}
                  removeTag={(tagId) => {
                    dispatchTags({ type: "remove", tagId });
                  }}
                  selectingSemitagNames={semitagNames}
                  appendSemitag={(name) => {
                    dispatchSemitags({ type: "append", name });
                  }}
                  removeSemitag={(name) => {
                    dispatchSemitags({ type: "remove", name });
                  }}
                />
              )}
            </div>
          </div>
          <div className={clsx(["mt-auto"], ["flex-shrink-0"], ["w-full"])}>
            <BlueButton
              type="submit"
              className={clsx(["px-4"], ["py-1"])}
              disabled={!payload}
            >
              登録
            </BlueButton>
          </div>
        </form>
      )}
    </div>
  );
}