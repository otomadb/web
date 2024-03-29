"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/[locale]/(application)/mads/[serial]/Link";
import NicovideoRequestLink from "~/app/[locale]/(application)/requests/nicovideo/[sourceId]/Link";
import { NicovideoPictogram } from "~/components/Pictogram";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormWrapper } from "../../FormWrapper";
import {
  RequestsFormButtonsPart,
  RequestsFormEditorablePart,
  RequestsFormTabPicker,
  useRequestFormEditSemitaggings,
  useRequestFormEditTaggings,
} from "../RequestFormCommon";
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
          sourceId
          ...Link_NicovideoRegistrationRequest
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
  handleSuccess(): void;
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
    useRequestFormEditTaggings();
  const {
    semitaggings,
    semitaggingsPayload,
    isSelectingSemitag: isIncludeSemitag,
    appendSemitag,
    removeSemitag,
  } = useRequestFormEditSemitaggings();

  const callToast = useToaster();
  const router = useRouter();

  const requestVideo = useRequestFromNicovideo({
    onSuccess({ request }) {
      callToast(
        <>
          <NicovideoRequestLink
            fragment={request}
            className={clsx("font-mono text-vivid-primary")}
          >
            {request.sourceId}
          </NicovideoRequestLink>
          をリクエストしました
        </>
      );
      router.refresh();
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

  const payload = useMemo(() => {
    /* タイトルなしを許容しない */
    if (title === "") return null;

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

  return (
    <FormWrapper
      style={style}
      className={clsx(className)}
      Title={<>ニコニコ動画から音MADをリクエスト</>}
      Icon={NicovideoPictogram}
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
            isSelectingSemitag={isIncludeSemitag}
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
