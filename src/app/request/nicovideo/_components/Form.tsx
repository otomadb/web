"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Confirm } from "~/app/editor/nicovideo/_components/Confirm/Confirm";
import { RegisterContext } from "~/app/editor/nicovideo/_components/Original/Context";
import { BlueButton } from "~/components/common/Button";
import {
  useClearSourceId,
  useSourceId,
} from "~/components/NicovideoSourceIdForm/SourceIdProvider";

import { SourceChecker } from "./SourceChecker";
import { useCallSuccessedToast } from "./SuccessToast";
import { useRequestVideo } from "./useRequestVideo";

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
});
export type FormSchema = z.infer<typeof formSchema>;

export const RequestForm: React.FC<{
  className?: string;
}> = ({ className }) => {
  const sourceId = useSourceId();
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
  const {
    fields: semitags,
    append: appendSemitag,
    remove: removeSemitag,
  } = useFieldArray({ control, name: "semitags" });

  const clearSourceId = useClearSourceId();
  const callSuccededToast = useCallSuccessedToast();
  const requestVideo = useRequestVideo({
    onSuccess(data) {
      reset({
        title: undefined,
        thumbnailUrl: undefined,
        tags: [],
        semitags: [],
        sourceId: undefined,
      });
      clearSourceId();
      callSuccededToast(data);
    },
  });

  return (
    <RegisterContext.Provider
      value={{
        setTitle: (s) => setValue("title", s),
        setSourceId: (s) => setValue("sourceId", s),
        setThumbnailUrl: (s) => setValue("thumbnailUrl", s),
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
        onSubmit={handleSubmit(requestVideo)}
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
                  リクエスト
                </BlueButton>
              </div>
            </div>
          </SourceChecker>
        )}
      </form>
    </RegisterContext.Provider>
  );
};
