"use client";

import clsx from "clsx";
import {
  CSSProperties,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useQuery } from "urql";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import Button from "~/components/Button";
import AlreadyRegistered from "~/components/Form/AlreadyRegistered";
import AlreadyRequested from "~/components/Form/AlreadyRequested";
import OriginalSource from "~/components/Form/RegisterMAD/FromSoundcloud/OriginalSource";
import { SemitagButton } from "~/components/Form/SemitagButton";
import SourceNotExists from "~/components/Form/SourceNotExists";
import {
  Fragment as TagButtonFragment,
  TagButton,
} from "~/components/Form/TagButton";
import TagSearcher from "~/components/TagSearcher2";
import { TextInput2 } from "~/components/TextInput";
import { useToaster } from "~/components/Toaster";
import { FragmentType, graphql } from "~/gql";

import { SucceededToast } from "./SucceededToast";
import useRequestFromSoundcloud from "./useRequestFromSoundcloud";

export const Query = graphql(`
  query RequestMADFromSoundcloudForm_Check($url: String!) {
    findSoundcloudMADSource(input: { url: $url }) {
      id
      ...Form_VideoAlreadyRegistered
    }
    findSoundcloudRegistrationRequestByUrl(url: $url) {
      id
      sourceId
      ...Form_VideoAlreadyRequested
      ...SoundcloudRequestPageLink
    }
    fetchSoundcloud(input: { url: $url }) {
      source {
        ...RegisterFromSoundcloudForm_OriginalSource
        thumbnailUrl(scale: LARGE)
        sourceId
        originalThumbnailUrl
      }
    }
  }
`);
export default function RequestForm({
  className,
  style,
  url,
  handleSuccess,
  handleCancel,
}: {
  className?: string;
  style?: CSSProperties;
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
  const [taggings, dispatchTags] = useReducer(
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
          if (prev.map(({ id }) => id).includes(action.tagId)) return prev;
          return [...prev, { id: action.tagId, fragment: action.fragment }];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );

  const [semitaggings, dispatchSemitags] = useReducer(
    (
      prev: { name: string }[],
      action:
        | { type: "append"; name: string }
        | { type: "remove"; name: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, { name: action.name }])];
        case "remove":
          return prev.filter(({ name }) => name !== action.name);
        case "clear":
          return [];
      }
    },
    []
  );
  const semitaggingNames = useMemo(
    () => semitaggings.map(({ name }) => name),
    [semitaggings]
  );

  const callToast = useToaster();
  const requestVideo = useRequestFromSoundcloud({
    onSuccess(data) {
      callToast(<SucceededToast fragment={data} />);
      if (handleSuccess) handleSuccess();
    },
    onAlready({ source: { sourceId, video } }) {
      callToast(
        <p>
          <span>{sourceId}</span>は受理されて
          <LinkVideo fragment={video}>既に登録されています。</LinkVideo>
        </p>
      );
    },
    onFailure() {
      callToast(<p>登録に失敗しました。</p>);
    },
  });

  const [tab, setTab] = useState<"SOURCE">("SOURCE");

  const payload = useMemo(() => {
    if (!data || !data.fetchSoundcloud.source) return null;

    return {
      sourceId: data.fetchSoundcloud.source.sourceId,
      title,
      taggings: taggings.map(({ id }) => ({ tagId: id, note: null })),
      semitaggings: semitaggings.map(({ name }) => ({ name, note: null })),
      originalThumbnailUrl:
        data.fetchSoundcloud.source.originalThumbnailUrl || null,
    } satisfies Parameters<typeof requestVideo>[0];
  }, [data, title, taggings, semitaggings]);
  const handleSubmit = useCallback(() => {
    if (!payload) return;
    requestVideo(payload);
  }, [payload, requestVideo]);

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
          fragment={data.findSoundcloudMADSource}
          handleCancel={handleCancel}
        />
      ) : data.findSoundcloudRegistrationRequestByUrl ? (
        <AlreadyRequested
          fragment={data.findSoundcloudRegistrationRequestByUrl}
          RequestPageLink={
            ({ sourceId, ...props }) => <span /> // TODO: そのうち直す
          }
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
                {taggings.length === 0 && (
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
                {taggings.length > 0 && (
                  <div
                    className={clsx([
                      "flex",
                      "flex-wrap",
                      "gap-x-1",
                      "gap-y-1",
                    ])}
                  >
                    {taggings.map(({ id: tagId, fragment }) => (
                      <TagButton
                        key={tagId}
                        tagId={tagId}
                        fragment={fragment}
                        append={(f) =>
                          dispatchTags({ type: "append", tagId, fragment: f })
                        }
                        remove={() => dispatchTags({ type: "remove", tagId })}
                        selected={taggings.map(({ id }) => id).includes(tagId)}
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
                {semitaggings.length === 0 && (
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
                {semitaggings.length > 0 && (
                  <div
                    className={clsx([
                      "flex",
                      "flex-wrap",
                      "gap-x-1",
                      "gap-y-1",
                    ])}
                  >
                    {semitaggings.map(({ name }) => (
                      <SemitagButton
                        key={name}
                        name={name}
                        append={() =>
                          dispatchSemitags({ type: "append", name })
                        }
                        remove={() =>
                          dispatchSemitags({ type: "remove", name })
                        }
                        selected={semitaggingNames.includes(name)}
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
                  showAdditional={(query) => !semitaggingNames.includes(query)}
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
            <Button submit text="リクエストする" size="medium" color="blue" />
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
