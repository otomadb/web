"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/[locale]/(application)/mads/[serial]/Link";
import SoundcloudRequestPageLink from "~/app/[locale]/(application)/requests/soundcloud/[sourceId]/Link";
import { SoundcloudPictogram } from "~/components/Pictogram";
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
import SoundcloudOriginalSource from "./SoundcloudOriginalSource";

export const SoundcloudRequestMutation = graphql(`
  mutation RequestMADFromSoundcloudForm_Request(
    $input: RequestSoundcloudRegistrationInput!
  ) {
    requestSoundcloudRegistration(input: $input) {
      __typename
      ... on RequestSoundcloudRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestSoundcloudRegistrationSucceededPayload {
        request {
          id
          sourceId
          ...SoundcloudRequestPageLink
        }
      }
    }
  }
`);
const useRequestFromSoundcloud = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<
        typeof SoundcloudRequestMutation
      >["requestSoundcloudRegistration"],
      { __typename: "RequestSoundcloudRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<
        typeof SoundcloudRequestMutation
      >["requestSoundcloudRegistration"],
      { __typename: "RequestSoundcloudRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(SoundcloudRequestMutation);

  return useCallback(
    async ({
      sourceId,
      title,
      originalThumbnailUrl,
      taggings,
      semitaggings,
    }: {
      sourceId: string;
      title: string;
      /**
       * Soundcloud側のサムネイル画像のURL
       */
      originalThumbnailUrl: string;
      taggings: { tagId: string; note: null }[];
      semitaggings: { name: string; note: null }[];
    }) => {
      const { data, error } = await register({
        input: {
          sourceId,
          title,
          thumbnailUrl: originalThumbnailUrl,
          taggings,
          semitaggings,
        },
      });
      if (error || !data) {
        onFailure();
        return;
      }

      switch (data.requestSoundcloudRegistration.__typename) {
        case "RequestSoundcloudRegistrationSucceededPayload":
          onSuccess(data.requestSoundcloudRegistration);
          break;
        case "RequestSoundcloudRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestSoundcloudRegistration);
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

export const SoundcloudRequestFormOriginalSourceFragment = graphql(`
  fragment SoundcloudRequestForm_OriginalSource on SoundcloudOriginalSource {
    sourceId
    title
    url
    thumbnailUrl(scale: LARGE)
    originalThumbnailUrl
    ...SoundcloudForm_OriginalSource
  }
`);
export default function SoundcloudRequestForm({
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
    typeof SoundcloudRequestFormOriginalSourceFragment
  >;
}) {
  const source = useFragment(
    SoundcloudRequestFormOriginalSourceFragment,
    sourceFragment
  );
  const [title, setTitle] = useState<string>(source.title);

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

  const requestVideo = useRequestFromSoundcloud({
    onSuccess({ request }) {
      callToast(
        <>
          <SoundcloudRequestPageLink
            fragment={request}
            className={clsx("font-mono text-vivid-primary")}
          >
            {request.sourceId}
          </SoundcloudRequestPageLink>
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
    if (!title) return null;

    return {
      sourceId: source.sourceId,
      title,
      originalThumbnailUrl: source.originalThumbnailUrl,
      taggings: taggingsPayload,
      semitaggings: semitaggingsPayload,
    } satisfies Parameters<typeof requestVideo>[0];
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
      Title={<>SoundCloudから音MADをリクエスト</>}
      Icon={SoundcloudPictogram}
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
              <SoundcloudOriginalSource fragment={source} />
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
