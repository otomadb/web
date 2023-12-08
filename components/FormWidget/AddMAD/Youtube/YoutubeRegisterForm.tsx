"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormWrapper } from "../../FormWrapper";
import {
  RegisterFormButtonsPart,
  RegisterFormEditorablePart,
  RegisterFormRequestPart,
  RegisterFormTabPicker,
  useRegisterFormEditSemitaggings,
  useRegisterFormEditTaggings,
} from "../RegisterFormCommon";
import YoutubeOriginalSource from "./YoutubeOriginalSource";

export const YoutubeRegisterMutation = graphql(`
  mutation RegisterFromYoutubeForm_RegisterVideo(
    $input: RegisterVideoFromYoutubeInput!
  ) {
    registerVideoFromYoutube(input: $input) {
      __typename
      ... on RegisterVideoFromYoutubeSucceededPayload {
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
      ResultOf<typeof YoutubeRegisterMutation>["registerVideoFromYoutube"],
      { __typename: "RegisterVideoFromYoutubeSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(YoutubeRegisterMutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      tagIds,
      semitagNames,
      YoutubeRequestId,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
      YoutubeRequestId: string | undefined;
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnailUrl: thumbnailUrl,
          tagIds,
          semitagNames,
          sourceIds: [sourceId],
          requestId: YoutubeRequestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideoFromYoutube.__typename) {
        case "RegisterVideoFromYoutubeSucceededPayload":
          onSuccess(data.registerVideoFromYoutube);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};

export const YoutubeRegisterOriginalSourceFragment = graphql(`
  fragment YoutubeForm_OriginalSource2 on YoutubeOriginalSource {
    url
    sourceId
    thumbnailUrl
    ...YoutubeForm_OriginalSource
  }
`);
export const YoutubeRegisterFormRequestFragment = graphql(`
  fragment RegisterFromYoutubeForm_Request on YoutubeRegistrationRequest {
    id
    ...RegisterFormRequestPart
  }
`);
export default function YoutubeRegisterForm({
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
  sourceFragment: FragmentType<typeof YoutubeRegisterOriginalSourceFragment>;
  requestFragment?: FragmentType<typeof YoutubeRegisterFormRequestFragment>;
}) {
  const source = useFragment(
    YoutubeRegisterOriginalSourceFragment,
    sourceFragment
  );
  const request = useFragment(
    YoutubeRegisterFormRequestFragment,
    requestFragment
  );

  const [title, setTitle] = useState<string>("");
  const { appendTag, removeTag, tags, tagIds, isSelecting } =
    useRegisterFormEditTaggings();
  const {
    appendSemitag,
    isSelectingSemitag: isIncludeSemitag,
    removeSemitag,
    semitagNames,
    semitaggings,
  } = useRegisterFormEditSemitaggings();
  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

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
  const payload = useMemo(() => {
    if (title === "") return;

    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.thumbnailUrl,
      YoutubeRequestId: request?.id,
      tagIds,
      semitagNames,
    };
  }, [
    request?.id,
    semitagNames,
    source.sourceId,
    source.thumbnailUrl,
    tagIds,
    title,
  ]);

  return (
    <FormWrapper
      style={style}
      className={clsx(className)}
      Title={<>Youtubeから音MADを登録</>}
      Form={({ className, ...rest }) => (
        <form
          {...rest}
          className={clsx(className, "flex h-full flex-col gap-y-6")}
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
            isSelectingSemitag={isIncludeSemitag}
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
                REQUEST: false,
              }}
            />
            <YoutubeOriginalSource
              className={clsx({ hidden: tab !== "SOURCE" })}
              fragment={source}
            />
            {request && (
              <RegisterFormRequestPart
                className={clsx({ hidden: tab !== "REQUEST" })}
                fragment={request}
                isSelectingTag={isSelecting}
                appendTag={(tagId, fragment) => appendTag(tagId, fragment)}
                removeTag={(tagId) => removeTag(tagId)}
                isSelectingSemitag={isIncludeSemitag}
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
      )}
    />
  );
}
