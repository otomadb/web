"use client";
import "client-only";

import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useQuery } from "urql";
import * as z from "zod";

import { SucceededToast } from "~/app/editor/nicovideo/SucceededToast";
import { BlueButton } from "~/components/Button";
import { TagSearcher } from "~/components/TagSearcher";
import { useToaster } from "~/components/Toaster";
import { FragmentType, graphql } from "~/gql";

import { TextInput2 } from "../TextInput";
import { RequestExists } from "./Request";
import { SemitagButton } from "./SemitagButton";
import Source from "./Source";
import { Fragment as TagButtonFragment, TagButton } from "./TagButton";
import { useRegisterVideo } from "./useRegisterVideo";

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
  nicovideoRequestId: z.nullable(z.string()),
});
export type FormSchema = z.infer<typeof formSchema>;

export const q = graphql(`
  query RegisterFromNicovideoForm_Check($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        ...RegisterFromNicovideoForm_OriginalSource
      }
    }
    findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
      id
      ...RegisterFromNicovideoForm_Request
    }
  }
`);
export default function RegisterForm({
  className,
  style,

  sourceId,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
}) {
  const [{ data, fetching }] = useQuery({
    query: q,
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  const [title, setTitle] = useState<string>("");
  const [nicovideoRequestId] = useState<string | undefined>(undefined);
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
  const requestId = useMemo(
    () => data?.findNicovideoRegistrationRequest?.id,
    [data?.findNicovideoRegistrationRequest?.id]
  );

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const registerVideo = useRegisterVideo({
    onSuccess(data) {
      dispatchTags({ type: "clear" });
      dispatchSemitags({ type: "clear" });
      callToast(<SucceededToast fragment={data} />);
    },
  });

  const handleSubmit = useCallback(() => {
    registerVideo({
      title,
      thumbnailUrl: "",
      nicovideoRequestId,
      sourceId,
      tagIds: tags.map(({ id }) => id),
      semitagNames,
    });
  }, [registerVideo, nicovideoRequestId, semitagNames, sourceId, tags, title]);

  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col"],
        ["border", "border-slate-700", "rounded"]
      )}
      style={style}
    >
      <div
        className={clsx(
          [["px-4"], ["py-2"]],
          ["bg-slate-800"],
          ["text-slate-500", "text-xs", "font-bold"],
          ["border-b", "border-slate-700"]
        )}
      >
        ニコニコ動画から登録
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          [["px-4"], ["py-4"]],
          ["flex", "flex-col", "gap-y-4"],
          ["bg-slate-900"]
        )}
      >
        {!data && <div className={clsx(["text-slate-400"])}>Loading</div>}
        {data && (
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
                    handleSelect={(tagId) => {
                      // dispatchTags({ type: "append", tagId });
                    }}
                    Optional={({ query }) => {
                      if (semitagNames.includes(query))
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
                            onClick={(e) => {
                              dispatchSemitags({ type: "append", name: query });
                              e.currentTarget.blur();
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
            <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
              <div className={clsx(["flex", "gap-x-2"])}>
                <div
                  className={clsx(
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
                  aria-disabled={!data.fetchNicovideo.source}
                >
                  ソース情報
                </div>
                <div
                  className={clsx(
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
                    if (data.findNicovideoRegistrationRequest)
                      setTab("REQUEST");
                  }}
                  aria-checked={tab === "REQUEST"}
                  aria-disabled={!data.findNicovideoRegistrationRequest}
                >
                  リクエスト情報
                </div>
              </div>
              <div className={clsx({ hidden: tab !== "SOURCE" })}>
                {data.fetchNicovideo.source && (
                  <Source
                    fragment={data.fetchNicovideo.source}
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
              <div
                className={clsx({ hidden: tab !== "REQUEST" }, [
                  "flex",
                  "flex-col",
                  "gap-y-2",
                ])}
              >
                {data.findNicovideoRegistrationRequest && (
                  <RequestExists
                    fragment={data.findNicovideoRegistrationRequest}
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
              <BlueButton type="submit" className={clsx(["px-4"], ["py-1"])}>
                登録
              </BlueButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
