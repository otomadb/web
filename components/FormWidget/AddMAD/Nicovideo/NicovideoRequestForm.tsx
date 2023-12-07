"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { SemitagButton } from "../SemitagButton";
import { TagButton } from "../TagButton";
import useRequestFormEditSemitaggings from "../useRequestFormEditSemitaggings";
import useRequestEditTags from "../useRequestFormEditTaggings";
import NicovideoOriginalSource from "./NicovideoOriginalSource";

export const Mutation = graphql(`
  mutation RequestMADFromNicovideoForm_Request(
    $input: RequestNicovideoRegistrationInput!
  ) {
    requestNicovideoRegistration(input: $input) {
      __typename
      ... on RequestNicovideoRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestNicovideoRegistrationSucceededPayload {
        request {
          id
        }
      }
    }
  }
`);
const useRequestFromNicovideo = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["requestNicovideoRegistration"],
      { __typename: "RequestNicovideoRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof Mutation>["requestNicovideoRegistration"],
      { __typename: "RequestNicovideoRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(Mutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      taggings,
      semitaggings,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      taggings: { tagId: string; note: null }[];
      semitaggings: { name: string; note: null }[];
    }) => {
      const { data, error } = await register({
        input: { sourceId, title, thumbnailUrl, taggings, semitaggings },
      });
      if (error || !data) {
        onFailure();
        return;
      }

      switch (data.requestNicovideoRegistration.__typename) {
        case "RequestNicovideoRegistrationSucceededPayload":
          onSuccess(data.requestNicovideoRegistration);
          break;
        case "RequestNicovideoRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestNicovideoRegistration);
          break;
        case "MutationInvalidTagIdError":
        case "MutationTagNotFoundError":
        default:
          onFailure();
          break;
      }
    },
    [onAlready, onFailure, onSuccess, register]
  );
};

export const NicovideoRequestFormOriginalSourceFragment = graphql(`
  fragment NicovideoRequestForm_OriginalSource on NicovideoOriginalSource {
    sourceId
    url
    info {
      title
      thumbnailUrl
    }
    ...NicovideoForm_OriginalSource
  }
`);
export default function NicovideoRequestForm({
  className,
  style,
  handleSuccess,
  handleCancel,
  sourceFragment,
}: {
  className?: string;
  style?: CSSProperties;
  handleSuccess?(): void;
  handleCancel(): void;
  sourceFragment: FragmentType<
    typeof NicovideoRequestFormOriginalSourceFragment
  >;
}) {
  const source = useFragment(
    NicovideoRequestFormOriginalSourceFragment,
    sourceFragment
  );
  const [title, setTitle] = useState<string>(source.info.title);

  const { appendTag, removeTag, taggings, taggingsPayload, isSelecting } =
    useRequestEditTags();
  const {
    semitaggings,
    semitaggingsPayload,
    isIncludeSemitag,
    appendSemitag,
    removeSemitag,
  } = useRequestFormEditSemitaggings();

  const callToast = useToaster();
  const requestVideo = useRequestFromNicovideo({
    onSuccess(data) {
      callToast(<>リクエストしました</>);
      if (handleSuccess) handleSuccess();
    },
    onAlready({ source: { sourceId, video } }) {
      callToast(
        <>
          <span>{sourceId}</span>は受理されて
          <MadPageLink fragment={video}>既に登録されています。</MadPageLink>
        </>
      );
    },
    onFailure() {
      callToast(<>登録に失敗しました。</>);
    },
  });

  const [tab, setTab] = useState<"SOURCE">("SOURCE");

  const payload = useMemo(() => {
    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.info.thumbnailUrl,
      taggings: taggingsPayload,
      semitaggings: semitaggingsPayload,
    } satisfies Parameters<typeof requestVideo>[0];
  }, [
    semitaggingsPayload,
    source.info.thumbnailUrl,
    source.sourceId,
    taggingsPayload,
    title,
  ]);

  const handleSubmit = useCallback(() => {
    if (!taggingsPayload) return;
    requestVideo(payload);
  }, [taggingsPayload, requestVideo, payload]);

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
            {taggings.length > 0 && (
              <div className={clsx("flex", "flex-wrap", "gap-x-1", "gap-y-1")}>
                {taggings.map(({ id: tagId, fragment }) => (
                  <TagButton
                    key={tagId}
                    tagId={tagId}
                    fragment={fragment}
                    append={(f) => appendTag(tagId, f)}
                    remove={() => removeTag(tagId)}
                    selected={taggings.map(({ id }) => id).includes(tagId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={clsx("flex gap-x-2")}>
          <div
            className={clsx("shrink-0 py-0.5 text-xs font-bold text-slate-400")}
          >
            追加される仮タグ
          </div>
          {semitaggings.length === 0 && (
            <div
              className={clsx("shrink-0 self-center text-xs", "text-slate-400")}
            >
              なし
            </div>
          )}
          {semitaggings.length > 0 && (
            <div className={clsx("flex", "flex-wrap", "gap-x-1", "gap-y-1")}>
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
            handleSelect={(tagId, fragment) => {
              appendTag(tagId, fragment);
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
            showAdditional={(query) => !isIncludeSemitag(query)}
            handleAdditionalClicked={(query) => appendSemitag(query)}
          />
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
          </div>
          <div className={clsx({ hidden: tab !== "SOURCE" })}>
            <NicovideoOriginalSource
              fragment={source}
              appendTag={({ tagId, fragment }) => appendTag(tagId, fragment)}
              removeTag={(tagId) => removeTag(tagId)}
              isSelectingTag={isSelecting}
              isSelectingSemitag={isIncludeSemitag}
              appendSemitag={(name) => appendSemitag(name)}
              removeSemitag={(name) => removeSemitag(name)}
            />
          </div>
        </div>
        <div className={clsx("mt-auto flex w-full shrink-0 justify-between")}>
          <Button submit text="リクエストする" size="medium" color="blue" />
          <Button
            className={clsx()}
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
