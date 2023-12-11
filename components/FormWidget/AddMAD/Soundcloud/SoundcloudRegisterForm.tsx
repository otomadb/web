"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import { SoundcloudPictogram } from "~/components/Pictogram";
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
import SoundcloudOriginalSource from "./SoundcloudOriginalSource";

export const SoundcloudRegisterMutation = graphql(`
  mutation RegisterSoundcloudMADForm_RegisterMAD(
    $input: RegisterSoundcloudMADInput!
  ) {
    registerSoundcloudMAD(input: $input) {
      __typename
      ... on RegisterSoundcloudMADSucceededPayload {
        mad {
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
      ResultOf<typeof SoundcloudRegisterMutation>["registerSoundcloudMAD"],
      { __typename: "RegisterSoundcloudMADSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(SoundcloudRegisterMutation);

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
      thumbnailUrl: string | null;
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

      switch (data.registerSoundcloudMAD.__typename) {
        case "RegisterSoundcloudMADSucceededPayload":
          onSuccess(data.registerSoundcloudMAD);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};

export const SoundcloudRegisterOriginalSourceFragment = graphql(`
  fragment SoundcloudForm_OriginalSource2 on SoundcloudOriginalSource {
    url
    sourceId
    title
    thumbnailUrl(scale: LARGE)
    originalThumbnailUrl
    ...SoundcloudForm_OriginalSource
  }
`);
export const SoundcloudRegisterFormRequestFragment = graphql(`
  fragment RegisterFromSoundcloudForm_Request on SoundcloudRegistrationRequest {
    id
    ...RegisterFormRequestPart
  }
`);
export default function SoundcloudRegisterForm({
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
  sourceFragment: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>;
  requestFragment?: FragmentType<typeof SoundcloudRegisterFormRequestFragment>;
}) {
  const source = useFragment(
    SoundcloudRegisterOriginalSourceFragment,
    sourceFragment
  );
  const request = useFragment(
    SoundcloudRegisterFormRequestFragment,
    requestFragment
  );

  const [title, setTitle] = useState<string>(source.title);
  const { appendTag, removeTag, tags, tagIds, isSelecting } =
    useRegisterFormEditTaggings();
  const {
    appendSemitag,
    isSelectingSemitag: isIncludeSemitag,
    removeSemitag,
    semitaggings,
    semitagNames,
  } = useRegisterFormEditSemitaggings();
  const [tab, setTab] = useState<"SOURCE" | "REQUEST">("SOURCE");

  const callToast = useToaster();
  const router = useRouter();

  const registerMAD = useRegisterVideo({
    onSuccess({ mad }) {
      callToast(
        <>
          <MadPageLink
            fragment={mad}
            className={clsx("font-bold text-vivid-primary")}
          >
            {mad.title}
          </MadPageLink>
          を登録しました．
        </>
      );
      router.refresh();
      handleSuccess();
    },
  });

  const payload = useMemo<null | Parameters<typeof registerMAD>[0]>(() => {
    if (title === "") return null;

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
      Title={<>SoundCloudから音MADをリクエスト</>}
      Icon={SoundcloudPictogram}
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
                REQUEST: !!request,
              }}
            />
            <SoundcloudOriginalSource
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
