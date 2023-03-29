"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";
import { TagSearcher } from "~/components/common/TagSearcher";
import {
  useClearSourceId,
  useSourceId,
} from "~/components/NicovideoSourceIdForm/SourceIdProvider";
import { useToaster } from "~/components/Toaster";

import { RegisterContext } from "./Original/Context";
import { RequestContext } from "./Request/Context";
import { SourceChecker } from "./SourceChecker";
import { SucceededToast } from "./SucceededToast";
import { TagButton } from "./TagButton";
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
  const callToast = useToaster();
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
      callToast(<SucceededToast fragment={data} />);
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
      <RequestContext.Provider
        value={{
          setRequestId: (s) => setValue("nicovideoRequestId", s),
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
                    <div
                      className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}
                    >
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
                        <div className={clsx(["text-xs"])}>
                          追加される仮タグ
                        </div>
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
                      <TagSearcher
                        handleSelect={(tagId) => {
                          if (
                            !getValues("tags").find(
                              ({ tagId: t }) => t === tagId
                            )
                          )
                            appendTag({ tagId });
                        }}
                        Optional={({ query, clearQuery }) => {
                          if (semitags.find(({ name }) => name === query))
                            return (
                              <div>
                                <div className={clsx(["text-xs"])}>
                                  <span
                                    className={clsx(
                                      ["bg-white"],
                                      ["border", "border-gray-200"],
                                      ["rounded"],
                                      ["px-2", "py-0.5"]
                                    )}
                                  >
                                    {query}
                                  </span>
                                  <span>
                                    は既に仮タグとして追加されています
                                  </span>
                                </div>
                              </div>
                            );
                          return (
                            <div>
                              <button
                                className={clsx(
                                  ["text-sm"],
                                  ["border"],
                                  ["rounded"],
                                  ["px-2", "py-1"],
                                  ["bg-white", "hover:bg-blue-200"]
                                )}
                                onClick={() => {
                                  appendSemitag({ name: query });
                                  clearQuery();
                                }}
                              >
                                <span
                                  className={clsx(
                                    ["bg-white"],
                                    ["border", "border-gray-200"],
                                    ["rounded"],
                                    ["px-2", "py-0.5"]
                                  )}
                                >
                                  {query}
                                </span>
                                <span>を仮タグとして追加</span>
                              </button>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <BlueButton
                    type="submit"
                    className={clsx(["px-4"], ["py-1"])}
                  >
                    登録
                  </BlueButton>
                </div>
              </div>
            </SourceChecker>
          )}
        </form>
      </RequestContext.Provider>
    </RegisterContext.Provider>
  );
};
