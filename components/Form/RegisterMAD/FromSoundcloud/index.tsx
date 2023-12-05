"use client";
import "client-only";

import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import SourceNotExists from "~/components/Form/SourceNotExists";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql } from "~/gql";

import AlreadyRegistered from "../../AlreadyRegistered";
import { SemitagButton } from "../../SemitagButton";
import { Fragment as TagButtonFragment, TagButton } from "../../TagButton";
import OriginalSource from "./OriginalSource";
import { SucceededToast } from "./SucceededToast";
import { useRegisterVideo } from "./useRegisterVideo";

export const Query = graphql(`
  query RegisterFromSoundcloudForm_Check($url: String!) {
    fetchSoundcloud(input: { url: $url }) {
      source {
        sourceId
        title
        originalThumbnailUrl
        ...RegisterFromSoundcloudForm_OriginalSource
      }
    }
    findSoundcloudMADSource(input: { url: $url }) {
      id
      ...Form_VideoAlreadyRegistered
    }
  }
`);
export default function RegisterForm({
  className,
  style,
  url,
  handleSuccess,
  handleCancel,
}: {
  className?: string;
  style?: React.CSSProperties;
  url: string;
  handleSuccess?(): void;
  handleCancel(): void;
}) {
  const [{ data, fetching }] = useQuery({
    query: Query,
    variables: { url },
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

  // 自動的にタイトルを挿入
  useEffect(() => {
    if (title === "" && data?.fetchSoundcloud.source?.title) {
      setTitle(data.fetchSoundcloud.source.title);
    }
  }, [data?.fetchSoundcloud.source?.title, title]);

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const registerMAD = useRegisterVideo({
    onSuccess(data) {
      callToast(<SucceededToast fragment={data} />);
      if (handleSuccess) handleSuccess();
    },
  });
  const payload = useMemo<null | Parameters<typeof registerMAD>[0]>(() => {
    if (!data || !data.fetchSoundcloud.source) return null;

    return {
      sourceId: data.fetchSoundcloud.source.sourceId,
      title,
      thumbnailUrl: data.fetchSoundcloud.source.originalThumbnailUrl || null,
      tagIds,
      semitagNames,
    };
  }, [data, semitagNames, tagIds, title]);

  const handleSubmit = useCallback(() => {
    if (!payload) return;
    registerMAD(payload);
  }, [payload, registerMAD]);

  return (
    <div
      className={clsx(
        className,
        ["grow"],
        [["px-4"], ["py-4"]],
        ["flex", "flex-col", "gap-y-4"]
      )}
      style={style}
    >
      {fetching || !data ? (
        <div className={clsx(["text-slate-400"])}>Loading</div>
      ) : data.findSoundcloudMADSource ? (
        <AlreadyRegistered
          className={clsx(["text-slate-400"])}
          fragment={data.findSoundcloudMADSource}
          handleCancel={handleCancel}
        />
      ) : !data.fetchSoundcloud.source ? (
        <SourceNotExists handleCancel={handleCancel} />
      ) : (
        <form
          className={clsx(["h-full"], ["flex", "flex-col", "gap-y-6"])}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
            <div className={clsx(["shrink-0"], ["w-full"])}>
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
                    ["shrink-0"],
                    ["text-xs", "font-bold", "text-slate-400"]
                  )}
                >
                  追加されるタグ
                </div>
                {tags.length === 0 && (
                  <div
                    className={clsx(
                      ["self-center"],
                      ["shrink-0"],
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
                    ["shrink-0"],
                    ["text-xs", "font-bold", "text-slate-400"]
                  )}
                >
                  追加される仮タグ
                </div>
                {semitagNames.length === 0 && (
                  <div
                    className={clsx(
                      ["self-center"],
                      ["shrink-0"],
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
              <div className={clsx(["mt-auto"], ["shrink-0"])}>
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
                          ["shrink-0"],
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
            </div>
            <div className={clsx({ hidden: tab !== "SOURCE" })}>
              {data.fetchSoundcloud.source && (
                <OriginalSource fragment={data.fetchSoundcloud.source} />
              )}
            </div>
          </div>
          <div
            className={clsx(["flex"], ["mt-auto"], ["shrink-0"], ["w-full"])}
          >
            <Button submit text="登録する" size="medium" color="blue" />
            <Button
              className={clsx(["ml-auto"])}
              onClick={() => {
                handleCancel();
              }}
              text="戻る"
              size="medium"
              color="green"
            />
          </div>
        </form>
      )}
    </div>
  );
}
