"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import {
  RegisterFormButtonsPart,
  RegisterFormEditorablePart,
  RegisterFormRequestPart,
  RegisterFormTabPicker,
  useRegisterFormEditSemitaggings,
  useRegisterFormEditTaggings,
} from "../RegisterFormCommon";
import NicovideoOriginalSource from "./NicovideoOriginalSource";

export const NicovideoRegisterFormMutation = graphql(`
  mutation RegisterFromNicovideoForm_Register(
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
      ResultOf<
        typeof NicovideoRegisterFormMutation
      >["registerVideoFromNicovideo"],
      { __typename: "RegisterVideoFromNicovideoSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(NicovideoRegisterFormMutation);

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
  fragment NicovideoForm_OriginalSource2 on NicovideoOriginalSource {
    sourceId
    url
    info {
      title
      thumbnailUrl
    }
    ...NicovideoForm_OriginalSource
  }
`);
export const NicovideoRegisterFormRequestFragment = graphql(`
  fragment RegisterFromNicovideoForm_Request on NicovideoRegistrationRequest {
    id
    ...RegisterFormRequestPart
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
  handleSuccess(): void;
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

  const { appendTag, isSelecting, removeTag, taggingsPayload, tags } =
    useRegisterFormEditTaggings();
  const {
    appendSemitag,
    isIncludeSemitag,
    removeSemitag,
    semitaggings,
    semitaggingsPayload,
  } = useRegisterFormEditSemitaggings();

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const payload = useMemo(() => {
    /* タイトルなしを許容しない */
    if (title === "") return null;

    return {
      title,
      sourceId: source.sourceId,
      thumbnailUrl: source.info.thumbnailUrl,
      nicovideoRequestId: request?.id,
      tagIds: taggingsPayload,
      semitagNames: semitaggingsPayload,
    };
  }, [
    request?.id,
    semitaggingsPayload,
    source.info.thumbnailUrl,
    source.sourceId,
    taggingsPayload,
    title,
  ]);
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
      handleSuccess();
    },
  });

  return (
    <form
      style={style}
      className={clsx(className, "flex flex-col gap-y-6 p-2")}
      onSubmit={(e) => {
        e.preventDefault();
        if (!payload) return;
        registerVideo(payload);
      }}
    >
      <RegisterFormEditorablePart
        title={title}
        setTitle={setTitle}
        appendSemitag={appendSemitag}
        appendTag={appendTag}
        isIncludeSemitag={isIncludeSemitag}
        removeSemitag={removeSemitag}
        removeTag={removeTag}
        tags={tags}
        semitaggings={semitaggings}
      />
      <div className={clsx("flex grow flex-col gap-y-2")}>
        <RegisterFormTabPicker
          current={tab}
          setTab={setTab}
          choices={{
            SOURCE: true,
            REQUEST: !!request,
          }}
        />
        <NicovideoOriginalSource
          className={clsx({ hidden: tab !== "SOURCE" })}
          fragment={source}
          isSelectingTag={isSelecting}
          appendTag={({ tagId, fragment }) => appendTag(tagId, fragment)}
          removeTag={(tagId) => removeTag(tagId)}
          isSelectingSemitag={isSelecting}
          appendSemitag={(name) => appendSemitag(name)}
          removeSemitag={(name) => removeSemitag(name)}
        />
        {request && (
          <RegisterFormRequestPart
            className={clsx({ hidden: tab !== "REQUEST" })}
            fragment={request}
            isSelectingTag={isSelecting}
            appendTag={(tagId, fragment) => appendTag(tagId, fragment)}
            removeTag={(tagId) => removeTag(tagId)}
            isSelectingSemitag={isSelecting}
            appendSemitag={(name) => appendSemitag(name)}
            removeSemitag={(name) => removeSemitag(name)}
          />
        )}
      </div>
      <RegisterFormButtonsPart
        disabled={!payload}
        handleCancel={handleCancel}
      />
    </form>
  );
}
