"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import React, { CSSProperties } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { RegisterContext } from "~/app/editor/nicovideo/RegisterContext";
import { TagButton } from "~/app/editor/nicovideo/TagButton";
import { LinkVideo } from "~/app/videos/[serial]/Link";
import { BlueButton } from "~/components/Button";
import OptionalSemitagTagSearcher from "~/components/OptionalSemitagTagSearcher";
import { useToaster } from "~/components/Toaster";

import SourceChecker from "./SourceChecker";
import { SucceededToast } from "./SucceededToast";
import { useRequestVideo } from "./useRequestVideo";

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
});
export type FormSchema = z.infer<typeof formSchema>;

export default function RequestForm({
  className,
  style,
  sourceId,
  clearSourceId,
}: {
  className?: string;
  style?: CSSProperties;
  sourceId: string;
  clearSourceId(): void;
}) {
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

  const callToast = useToaster();
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
      callToast(<SucceededToast fragment={data} />);
    },
    onAlready({ source: { sourceId, video } }) {
      callToast(
        <p>
          <span>{sourceId}</span>は受理されて
          <LinkVideo fragment={video}>既に登録されています。</LinkVideo>
        </p>
      );
    },
    onFailure() {
      callToast(<p>登録に失敗しました。</p>);
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
      <SourceChecker sourceId={sourceId}>
        <form
          className={clsx(
            className,
            ["flex", "flex-col", "gap-y-4"],
            ["border"],
            ["rounded-md"],
            ["px-4", "py-4"]
          )}
          onSubmit={handleSubmit(requestVideo)}
          style={style}
        >
          <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
            <div>
              <label className={clsx(["flex", "flex-col", "gap-y-1"])}>
                <div className={clsx(["text-xs"])}>タイトル</div>
                <input
                  {...register("title")}
                  className={clsx(
                    ["px-2"],
                    ["py-1"],
                    ["text-sm"],
                    ["bg-white"],
                    ["border", "border-gray-300"],
                    ["rounded"]
                  )}
                />
              </label>
            </div>
            <div className={clsx(["flex", "gap-x-4"])}>
              <label
                className={clsx(
                  ["w-72"],
                  ["flex-shrink-0"],
                  ["flex", "flex-col", "gap-y-1"]
                )}
              >
                <div className={clsx(["text-xs"])}>サムネイル</div>
                {thumbnailUrl && (
                  <Image
                    className={clsx(["object-scale-down"], ["w-48"])}
                    src={thumbnailUrl}
                    width={260}
                    height={200}
                    alt={`サムネイル候補`}
                  />
                )}
              </label>
              <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
                <div className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}>
                  <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
                    <div className={clsx(["text-xs"])}>追加されるタグ</div>
                    <div
                      className={clsx([
                        "flex",
                        "flex-wrap",
                        "gap-x-2",
                        "gap-y-2",
                      ])}
                    >
                      {tags.map(({ id, tagId }) => (
                        <TagButton key={id} tagId={tagId} />
                      ))}
                    </div>
                  </div>
                  <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
                    <div className={clsx(["text-xs"])}>追加される仮タグ</div>
                    <div
                      className={clsx([
                        "flex",
                        "flex-wrap",
                        "gap-x-2",
                        "gap-y-2",
                      ])}
                    >
                      {semitags.map(({ id, name }, index) => (
                        <button
                          key={id}
                          className={clsx(
                            ["flex"],
                            ["text-left"],
                            ["text-xs"],
                            ["px-1"],
                            ["py-0.5"],
                            ["border"]
                          )}
                          onClick={() => removeSemitag(index)}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={clsx(["flex-shrink-0"])}>
                  <OptionalSemitagTagSearcher
                    handleSelectTag={(tagId) => {
                      if (!tags.find(({ tagId: t }) => t === tagId))
                        appendTag({ tagId });
                    }}
                    handleSelectSemitag={(name) => {
                      appendSemitag({ name });
                    }}
                    isExistsSemitag={(query) =>
                      semitags.some(({ name }) => name === query)
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <BlueButton type="submit" className={clsx(["px-4"], ["py-1"])}>
                リクエスト
              </BlueButton>
            </div>
          </div>
        </form>
      </SourceChecker>
    </RegisterContext.Provider>
  );
}
