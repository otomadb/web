"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import { YoutubeRequestPageLink } from "~/app/(v2)/requests/youtube/[sourceId]/Link";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { ButtonsPart, EditorablePart, Tab } from "../RequestFormCommon";
import useRequestFormEditSemitaggings from "../useRequestFormEditSemitaggings";
import useRequestEditTags from "../useRequestFormEditTaggings";
import YoutubeOriginalSource from "./YoutubeOriginalSource";

export const YoutubeRequestMutation = graphql(`
  mutation RequestMADFromYoutubeForm_Request(
    $input: RequestYoutubeRegistrationInput!
  ) {
    requestYoutubeRegistration(input: $input) {
      __typename
      ... on RequestYoutubeRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestYoutubeRegistrationSucceededPayload {
        request {
          id
          sourceId
          ...YoutubeRequestPageLink
        }
      }
    }
  }
`);
const useRequestFromYoutube = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof YoutubeRequestMutation>["requestYoutubeRegistration"],
      { __typename: "RequestYoutubeRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof YoutubeRequestMutation>["requestYoutubeRegistration"],
      { __typename: "RequestYoutubeRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(YoutubeRequestMutation);

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

      switch (data.requestYoutubeRegistration.__typename) {
        case "RequestYoutubeRegistrationSucceededPayload":
          onSuccess(data.requestYoutubeRegistration);
          break;
        case "RequestYoutubeRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestYoutubeRegistration);
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

export const YoutubeRequestFormOriginalSourceFragment = graphql(`
  fragment YoutubeRequestForm_OriginalSource on YoutubeOriginalSource {
    url
    sourceId
    thumbnailUrl
    ...YoutubeForm_OriginalSource
  }
`);
export default function YoutubeRequestForm({
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
  sourceFragment: FragmentType<typeof YoutubeRequestFormOriginalSourceFragment>;
}) {
  const source = useFragment(
    YoutubeRequestFormOriginalSourceFragment,
    sourceFragment
  );
  const [title, setTitle] = useState<string>("");

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
  const requestVideo = useRequestFromYoutube({
    onSuccess({ request }) {
      callToast(
        <>
          <YoutubeRequestPageLink
            fragment={request}
            className={clsx("font-mono text-vivid-primary")}
          >
            {request.sourceId}
          </YoutubeRequestPageLink>
          リクエストしました
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

  const payload = useMemo(() => {
    if (!title) return undefined;

    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.thumbnailUrl,
      taggings: taggingsPayload,
      semitaggings: semitaggingsPayload,
    } satisfies Parameters<typeof requestVideo>[0];
  }, [
    semitaggingsPayload,
    source.thumbnailUrl,
    source.sourceId,
    taggingsPayload,
    title,
  ]);

  return (
    <form
      style={style}
      className={clsx(className, "flex flex-col gap-y-6 p-2")}
      onSubmit={(e) => {
        e.preventDefault();
        if (!payload) return;
        requestVideo(payload);
      }}
    >
      <EditorablePart
        title={title}
        setTitle={setTitle}
        appendSemitag={appendSemitag}
        appendTag={appendTag}
        isIncludeSemitag={isIncludeSemitag}
        removeSemitag={removeSemitag}
        removeTag={removeTag}
        taggings={taggings}
        semitaggings={semitaggings}
      />
      <div className={clsx("flex grow flex-col gap-y-2")}>
        <Tab
          choices={["SOURCE"]}
          current="SOURCE"
          setTab={(tab) => setTab(tab)}
        />
        <div className={clsx({ hidden: tab !== "SOURCE" })}>
          <YoutubeOriginalSource fragment={source} />
        </div>
      </div>
      <ButtonsPart disabled={!payload} handleCancel={handleCancel} />
    </form>
  );
}
