"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import { BilibiliPictogram } from "~/components/Pictogram";
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
import BilibiliOriginalSource from "./BilibiliOriginalSource";

export const BilibiliRegisterFormMutation = graphql(`
  mutation RegisterBilibiliMADForm_RegisterMAD(
    $input: RegisterBilibiliMADInput!
  ) {
    registerBilibiliMAD(input: $input) {
      __typename
      ... on RegisterBilibiliMADSucceededPayload {
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
      ResultOf<typeof BilibiliRegisterFormMutation>["registerBilibiliMAD"],
      { __typename: "RegisterBilibiliMADSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(BilibiliRegisterFormMutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      tagIds,
      semitagNames,
      requestId,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
      requestId: string | null;
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          primaryThumbnailUrl: thumbnailUrl,
          tagIds,
          semitagNames,
          sourceIds: [sourceId],
          requestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerBilibiliMAD.__typename) {
        case "RegisterBilibiliMADSucceededPayload":
          onSuccess(data.registerBilibiliMAD);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};

export const BilibiliRegisterOriginalSourceFragment = graphql(`
  fragment BilibiliForm_OriginalSource2 on BilibiliOriginalSource {
    url
    sourceId
    title
    thumbnailUrl(scale: LARGE)
    originalThumbnailUrl
    ...BilibiliForm_OriginalSource
  }
`);
export const BilibiliRegisterFormRequestFragment = graphql(`
  fragment RegisterFromBilibiliForm_Request on BilibiliRegistrationRequest {
    id
    ...RegisterFormRequestPart
  }
`);
export default function BilibiliRegisterForm({
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
  sourceFragment: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>;
  requestFragment?: FragmentType<typeof BilibiliRegisterFormRequestFragment>;
}) {
  const source = useFragment(
    BilibiliRegisterOriginalSourceFragment,
    sourceFragment
  );
  const request = useFragment(
    BilibiliRegisterFormRequestFragment,
    requestFragment
  );

  const [title, setTitle] = useState<string>(source.title);
  const { appendTag, isSelecting, removeTag, tagIds, tags } =
    useRegisterFormEditTaggings();
  const {
    appendSemitag,
    isSelectingSemitag,
    removeSemitag,
    semitaggings,
    semitagNames,
  } = useRegisterFormEditSemitaggings();

  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const registerMAD = useRegisterVideo({
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
    if (title === "") return undefined;

    return {
      sourceId: source.sourceId,
      title,
      thumbnailUrl: source.originalThumbnailUrl,
      tagIds,
      semitagNames,
      requestId: request?.id || null,
    };
  }, [
    request?.id,
    semitagNames,
    source.originalThumbnailUrl,
    source.sourceId,
    tagIds,
    title,
  ]);

  return (
    <FormWrapper
      style={style}
      className={clsx(className)}
      Title={<>Bilibiliから音MADを登録</>}
      Icon={BilibiliPictogram}
      Form={({ className, ...rest }) => (
        <form
          {...rest}
          className={clsx(className, "flex flex-col gap-y-6")}
          onSubmit={(e) => {
            e.preventDefault();
            if (!payload) return;
            registerMAD(payload);
          }}
        >
          <RegisterFormEditorablePart
            title={title}
            setTitle={setTitle}
            appendSemitag={appendSemitag}
            appendTag={appendTag}
            isSelectingSemitag={isSelectingSemitag}
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
            <BilibiliOriginalSource
              className={clsx({ hidden: tab !== "SOURCE" })}
              fragment={source}
              isSelectingTag={isSelecting}
              appendTag={({ tagId, fragment }) => appendTag(tagId, fragment)}
              removeTag={(tagId) => removeTag(tagId)}
              isSelectingSemitag={isSelectingSemitag}
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
                isSelectingSemitag={isSelectingSemitag}
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
