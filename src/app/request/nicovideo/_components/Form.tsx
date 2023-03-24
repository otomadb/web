"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Confirm } from "~/app/editor/nicovideo/_components/Confirm/Confirm";
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
        <SourceChecker
          sourceId={sourceId}
          setSource={(source) => setSource(source)}
          toggleTag={(id) => toggleTag(id)}
        >
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
  );
};
