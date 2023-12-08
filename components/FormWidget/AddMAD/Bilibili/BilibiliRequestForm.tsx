"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import BilibiliRequestPageLink from "~/app/(v2)/requests/bilibili/[sourceId]/Link";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormWrapper } from "../../FormWrapper";
import {
  RequestsFormButtonsPart,
  RequestsFormEditorablePart,
  RequestsFormTabPicker,
} from "../RequestFormCommon";
import { useRequestFormEditTaggings } from "../RequestFormCommon";
import { useRequestFormEditSemitaggings } from "../RequestFormCommon";
import BilibiliOriginalSource from "./BilibiliOriginalSource";

export const BilibiliRequestMutation = graphql(`
  mutation RequestMADFromBilibiliForm_Request(
    $input: RequestBilibiliRegistrationInput!
  ) {
    requestBilibiliRegistration(input: $input) {
      __typename
      ... on RequestBilibiliRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestBilibiliRegistrationSucceededPayload {
        request {
          id
          sourceId
          ...BilibiliRequestPageLink
        }
      }
    }
  }
`);
const useRequestFromBilibili = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof BilibiliRequestMutation>["requestBilibiliRegistration"],
      { __typename: "RequestBilibiliRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof BilibiliRequestMutation>["requestBilibiliRegistration"],
      { __typename: "RequestBilibiliRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(BilibiliRequestMutation);

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

      switch (data.requestBilibiliRegistration.__typename) {
        case "RequestBilibiliRegistrationSucceededPayload":
          onSuccess(data.requestBilibiliRegistration);
          break;
        case "RequestBilibiliRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestBilibiliRegistration);
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

export const BilibiliRequestFormOriginalSourceFragment = graphql(`
  fragment BilibiliRequestForm_OriginalSource on BilibiliOriginalSource {
    sourceId
    title
    url
    thumbnailUrl(scale: LARGE)
    originalThumbnailUrl
    ...BilibiliForm_OriginalSource
  }
`);
export default function BilibiliRequestForm({
  className,
  style,
  handleSuccess,
  handleCancel,
  sourceFragment,
}: {
  className?: string;
  style?: CSSProperties;
  handleSuccess(): void;
  handleCancel(): void;
  sourceFragment: FragmentType<
    typeof BilibiliRequestFormOriginalSourceFragment
  >;
}) {
  const source = useFragment(
    BilibiliRequestFormOriginalSourceFragment,
    sourceFragment
  );
  const [title, setTitle] = useState<string>(source.title);

  const { appendTag, removeTag, taggings, taggingsPayload, isSelecting } =
    useRequestFormEditTaggings();
  const {
    semitaggings,
    semitaggingsPayload,
    isSelectingSemitag,
    appendSemitag,
    removeSemitag,
  } = useRequestFormEditSemitaggings();

  const callToast = useToaster();
  const requestVideo = useRequestFromBilibili({
    onSuccess({ request }) {
      callToast(
        <>
          <BilibiliRequestPageLink
            fragment={request}
            className={clsx("font-mono text-vivid-primary")}
          >
            {request.sourceId}
          </BilibiliRequestPageLink>
          をリクエストしました
        </>
      );
      handleSuccess();
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

  const payload = useMemo<Parameters<typeof requestVideo>[0] | null>(() => {
    /* タイトルなしを許容しない */
    if (title === "") return null;

    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.originalThumbnailUrl,
      taggings: taggingsPayload,
      semitaggings: semitaggingsPayload,
    };
  }, [
    semitaggingsPayload,
    source.originalThumbnailUrl,
    source.sourceId,
    taggingsPayload,
    title,
  ]);

  return (
    <FormWrapper
      style={style}
      className={clsx(className)}
      Title={<>Bilibiliから音MADをリクエスト</>}
      Form={({ className, ...rest }) => (
        <form
          {...rest}
          className={clsx(className, "flex flex-col gap-y-6")}
          onSubmit={(e) => {
            e.preventDefault();
            if (!payload) return;
            requestVideo(payload);
          }}
        >
          <RequestsFormEditorablePart
            title={title}
            setTitle={setTitle}
            appendSemitag={appendSemitag}
            appendTag={appendTag}
            isSelectingSemitag={isSelectingSemitag}
            removeSemitag={removeSemitag}
            removeTag={removeTag}
            taggings={taggings}
            semitaggings={semitaggings}
            className={clsx("w-full shrink-0")}
          />
          <div className={clsx("flex grow flex-col gap-y-2")}>
            <RequestsFormTabPicker
              choices={["SOURCE"]}
              current="SOURCE"
              setTab={(tab) => setTab(tab)}
            />
            <div className={clsx({ hidden: tab !== "SOURCE" })}>
              <BilibiliOriginalSource
                fragment={source}
                appendTag={({ tagId, fragment }) => appendTag(tagId, fragment)}
                removeTag={(tagId) => removeTag(tagId)}
                isSelectingTag={isSelecting}
                isSelectingSemitag={isSelectingSemitag}
                appendSemitag={(name) => appendSemitag(name)}
                removeSemitag={(name) => removeSemitag(name)}
              />
            </div>
          </div>
          <RequestsFormButtonsPart
            disabled={!payload}
            handleCancel={handleCancel}
            className={clsx("w-full shrink-0")}
          />
        </form>
      )}
    />
  );
}
