"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";

import { useClearSourceId, useSourceId } from "../SourceIdProvider";
import { Confirm } from "./Confirm/Confirm";
import { RegisterContext } from "./Context";
import { SourceChecker } from "./SourceChecker";
import { useCallSuccessededToast } from "./SuccessedToast";
import { useRegisterVideo } from "./useRegisterVideo";

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
  nicovideoRequestId: z.nullable(z.string()),
});
export type FormSchema = z.infer<typeof formSchema>;

export const RegisterForm: React.FC<{
  className?: string;
}> = ({ className }) => {
  const sourceId = useSourceId();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    reset: resetForm,
  } = useForm<FormSchema>({
    defaultValues: { nicovideoRequestId: null },
    resolver: zodResolver(formSchema),
  });

  const thumbnailUrl = watch("thumbnailUrl");
  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });
  const {
    fields: semitags,
    append: appendSemitag,
    remove: removeSemitag,
  } = useFieldArray({ control, name: "semitags" });

  const clearSourceId = useClearSourceId();
  const callSuccededToast = useCallSuccessededToast();
  const registerVideo = useRegisterVideo({
    onSuccess(data) {
      resetForm({
        title: undefined,
        thumbnailUrl: undefined,
        sourceId: undefined,
        tags: [],
        semitags: [],
        nicovideoRequestId: undefined,
      });
      clearSourceId();
      callSuccededToast({ fragment: data.video });
    },
  });

  return (
    <RegisterContext.Provider
      value={{
        setTitle: (s) => setValue("title", s),
        setSourceId: (s) => setValue("sourceId", s),
        setThumbnailUrl: (s) => setValue("thumbnailUrl", s),
        setRequestId: (s) => setValue("nicovideoRequestId", s),
        toggleTag: (tagId: string) => {
          const i = getValues("tags").findIndex((t) => t.tagId === tagId);
          if (i === -1) appendTag({ tagId });
          else removeTag(i);
        },
        toggleSemitag: (name: string) => {
          const i = getValues("semitags").findIndex(
            (semitag) => semitag.name === name
          );
          if (i === -1) appendSemitag({ name });
          else removeSemitag(i);
        },
      }}
    >
      <form
        className={clsx(
          className,
          ["flex", "flex-col", "gap-y-4"],
          ["border"],
          ["rounded-md"],
          ["px-4", "py-4"]
        )}
        onSubmit={handleSubmit(
          (props) => registerVideo(props),
          (error) => {
            console.dir(error);
          }
        )}
      >
        {!sourceId && (
          <div>
            <p className={clsx(["text-sm"])}>動画IDを入力してください。</p>
          </div>
        )}
        {sourceId && (
          <SourceChecker sourceId={sourceId}>
            <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
              <Confirm
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
                  登録
                </BlueButton>
              </div>
            </div>
          </SourceChecker>
        )}
      </form>
    </RegisterContext.Provider>
  );
};
