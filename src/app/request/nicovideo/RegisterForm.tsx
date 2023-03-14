"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "urql";
import * as z from "zod";

import { ConfirmForm } from "~/app/editor/nicovideo/ConfirmForm";
import { BlueButton } from "~/components/common/Button";
import { graphql } from "~/gql";

import { SourceChecker } from "./SourceChecker";
import { useCallSuccessToast } from "./SuccessToast";

export const useRequest = (reset: () => void) => {
  const [, mutateRegisterTag] = useMutation(
    graphql(`
      mutation RequestNicovideoRegistrationPage_Request(
        $input: RequestNicovideoRegistrationInput!
      ) {
        requestNicovideoRegistration(input: $input) {
          __typename
          ... on MutationAuthenticationError {
            requiredRole
          }
          ... on MutationTagNotFoundError {
            tagId
          }
          ... on RequestNicovideoRegistrationVideoAlreadyRegisteredError {
            source {
              id
            }
          }
          ... on RequestNicovideoRegistrationOtherErrorsFallback {
            message
          }
          ... on RequestNicovideoRegistrationSucceededPayload {
            ...RequestNicovideoRegistrationPage_SuccessToast
          }
        }
      }
    `)
  );

  const callSuccessToast = useCallSuccessToast();

  return useCallback(
    async ({ sourceId, title, thumbnailUrl, tags, semitags }) => {
      const { data, error } = await mutateRegisterTag({
        input: {
          sourceId,
          title,
          thumbnailUrl,
          taggings: tags.map(({ tagId }) => ({ tagId, note: null })),
          semitaggings: semitags.map(({ name }) => ({ name, note: null })),
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        reset();
        return;
      }

      switch (data.requestNicovideoRegistration.__typename) {
        case "RequestNicovideoRegistrationSucceededPayload":
          callSuccessToast(data.requestNicovideoRegistration);
          reset();
          break;
        case "RequestNicovideoRegistrationVideoAlreadyRegisteredError":
          reset();
          break;
        case "MutationAuthenticationError":
          reset();
          break;
        case "MutationInvalidTagIdError":
        case "MutationTagNotFoundError":
        case "RequestNicovideoRegistrationOtherErrorsFallback":
        default:
          // どうしようもない例外について
          reset();
          break;
      }
    },
    [callSuccessToast, mutateRegisterTag, reset]
  ) satisfies SubmitHandler<FormSchema>;
};

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
});
export type FormSchema = z.infer<typeof formSchema>;
export const RegisterForm: React.FC<{
  className?: string;
  sourceId: string | undefined;
  clearSourceId(): void;
}> = ({ className, sourceId, clearSourceId }) => {
  const { control, handleSubmit, register, setValue, watch, getValues, reset } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
    });
  const thumbnailUrl = watch("thumbnailUrl");
  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });
  const toggleTag = useCallback(
    (id: string) => {
      const index = getValues("tags").findIndex(({ tagId }) => tagId === id);
      if (index === -1) appendTag({ tagId: id });
      else removeTag(index);
    },
    [appendTag, getValues, removeTag]
  );

  const {
    fields: semitags,
    append: appendSemitag,
    remove: removeSemitag,
  } = useFieldArray({ control, name: "semitags" });

  const setSource = useCallback(
    (source: { sourceId: string; title: string; thumbnailUrl: string }) => {
      setValue("sourceId", source.sourceId);
      setValue("title", source.title);
      setValue("thumbnailUrl", source.thumbnailUrl);
    },
    [setValue]
  );

  const request = useRequest(() => {
    reset({ title: "", thumbnailUrl: "", tags: [] });
    clearSourceId();
  });

  if (!sourceId)
    return (
      <div
        className={clsx(
          className,
          ["flex", "flex-col", "gap-y-4"],
          ["border"],
          ["rounded-md"],
          ["px-4", "py-4"]
        )}
      >
        <p className={clsx(["text-sm"])}>動画IDを入力してください。</p>
      </div>
    );

  return (
    <form
      className={clsx(className, ["flex", "flex-col", "gap-y-4"])}
      onSubmit={handleSubmit(request)}
    >
      {/* TODO: 他のrequestの重複チェック */}
      <SourceChecker
        sourceId={sourceId}
        setSource={(source) => setSource(source)}
        toggleTag={(id) => toggleTag(id)}
      >
        <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
          <ConfirmForm
            TitleInput={function TitleInput(props) {
              return <input {...props} {...register("title")} />;
            }}
            thumbnailUrl={thumbnailUrl}
            tags={tags}
            addTag={(tagId) => {
              if (!getValues("tags").find(({ tagId: t }) => t === tagId))
                appendTag({ tagId });
            }}
            removeTag={removeTag}
            semitags={semitags}
            addSemitag={(name) => appendSemitag({ name })}
            removeSemitag={removeSemitag}
          />
          <div>
            <BlueButton type="submit" className={clsx(["px-4"], ["py-1"])}>
              リクエスト
            </BlueButton>
          </div>
        </div>
      </SourceChecker>
    </form>
  );
};
