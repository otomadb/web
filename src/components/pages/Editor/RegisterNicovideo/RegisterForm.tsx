"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import React, { ComponentProps, useCallback, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "urql";
import * as z from "zod";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { BlueButton } from "~/components/common/Button";
import { CommonTag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { getFragment, graphql } from "~/gql";
import {
  CommonTagFragmentDoc,
  Link_VideoFragmentDoc,
  RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
  RegisterNicovideoPage_RegisterForm_SuccessToastFragment,
  RegisterNicovideoPage_RegisterForm_SuccessToastFragmentDoc,
  RegisterNicovideoPage_RegisterForm_TagDocument,
  RegisterVideoInputSourceType,
} from "~/gql/graphql";

import { SourceChecker } from "./SourceChecker";

export const formSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.object({ tagId: z.string() })),
  semitags: z.array(z.object({ name: z.string() })),
});
export type FormSchema = z.infer<typeof formSchema>;

graphql(`
  mutation RegisterNicovideoPage_RegisterForm_RegisterVideo(
    $input: RegisterVideoInput!
  ) {
    registerVideo(input: $input) {
      __typename
      ... on RegisterVideoSucceededPayload {
        video {
          ...RegisterNicovideoPage_RegisterForm_SuccessToast
        }
      }
      ... on RegisterVideoFailedPayload {
        message
      }
    }
  }
`);
export const RegisterForm: React.FC<{
  className?: string;
  sourceId: string | undefined;
  clearSourceId(): void;
}> = ({ className, sourceId, clearSourceId }) => {
  const [notyet, setNotyet] = useState<boolean | undefined>(undefined);
  const [exists, setExists] = useState<boolean | undefined>(undefined);

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

  const [, mutateRegisterTag] = useMutation(
    RegisterNicovideoPage_RegisterForm_RegisterVideoDocument
  );
  const callSuccessToast = useCallSuccessToast();
  const registerVideo: SubmitHandler<FormSchema> = useCallback(
    async ({ sourceId, title, thumbnailUrl, tags, semitags }) => {
      const { data, error } = await mutateRegisterTag({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnail: thumbnailUrl,
          tags: tags.map(({ tagId }) => tagId),
          semitags: semitags.map(({ name }) => name),
          sources: [{ sourceId, type: RegisterVideoInputSourceType.Nicovideo }],
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      if (data.registerVideo.__typename === "RegisterVideoFailedPayload") {
        // TODO: 何かしら出す
        return;
      }

      callSuccessToast({
        fragment: getFragment(
          RegisterNicovideoPage_RegisterForm_SuccessToastFragmentDoc,
          data.registerVideo.video
        ),
      });
      reset({ title: "", thumbnailUrl: "", tags: [] });
      clearSourceId();
      setExists(undefined);
      setNotyet(undefined);
    },
    [callSuccessToast, clearSourceId, mutateRegisterTag, reset]
  );
  const setSource = useCallback(
    (
      source:
        | undefined
        | { sourceId: string; title: string; thumbnailUrl: string }
    ) => {
      if (!source) {
        setExists(false);
      } else {
        setExists(true);
        setValue("sourceId", source.sourceId);
        setValue("title", source.title);
        setValue("thumbnailUrl", source.thumbnailUrl);
      }
    },
    [setValue]
  );
  const toggleTag = useCallback(
    (id: string) => {
      const index = getValues("tags").findIndex(({ tagId }) => tagId === id);
      if (index === -1) appendTag({ tagId: id });
      else removeTag(index);
    },
    [appendTag, getValues, removeTag]
  );

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
      className={clsx(
        className,
        ["flex", "flex-col", "gap-y-4"],
        ["border"],
        ["rounded-md"],
        ["px-4", "py-4"]
      )}
      onSubmit={handleSubmit(registerVideo)}
    >
      <SourceChecker
        sourceId={sourceId}
        setNotyet={(notyet) => setNotyet(notyet)}
        setSource={(source) => setSource(source)}
        toggleTag={(id) => toggleTag(id)}
      />
      {notyet && exists && (
        <div
          className={clsx(
            ["flex", "flex-col"],
            ["border"],
            ["rounded-md"],
            ["px-4", "py-4"]
          )}
        >
          <div>追加フォーム</div>
          <div className={clsx(["mt-2"])}>
            <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
              <div>
                <label className={clsx(["flex", "flex-col", "gap-y-1"])}>
                  <div className={clsx(["text-xs"])}>タイトル</div>
                  <input
                    className={clsx(
                      ["px-2"],
                      ["py-1"],
                      ["text-sm"],
                      ["bg-white"],
                      ["border", "border-gray-300"],
                      ["rounded"]
                    )}
                    {...register("title")}
                  ></input>
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
                        {tags.map(({ id, tagId }, index) => (
                          <TagItem
                            key={id}
                            tagId={tagId}
                            remove={() => removeTag(index)}
                          />
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
                              ["text-sm"],
                              ["bg-white"],
                              ["border", "border-gray-200"],
                              ["rounded"],
                              ["px-2", "py-0.5"]
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
                          !getValues("tags").find(({ tagId: t }) => t === tagId)
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
                                <span>は既に仮タグとして追加されています</span>
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
            </div>
          </div>
          <div className={clsx("mt-4")}>
            <BlueButton type="submit" className={clsx(["px-4"], ["py-1"])}>
              登録
            </BlueButton>
          </div>
        </div>
      )}
    </form>
  );
};

graphql(`
  query RegisterNicovideoPage_RegisterForm_Tag($id: ID!) {
    tag(id: $id) {
      ...CommonTag
    }
  }
`);
const TagItem: React.FC<{
  className?: string;
  tagId: string;
  remove(): void;
}> = ({ className, tagId, remove }) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_RegisterForm_TagDocument,
    variables: { id: tagId },
  });

  return (
    <button className={clsx(className)} onClick={() => remove()}>
      {data && (
        <CommonTag fragment={getFragment(CommonTagFragmentDoc, data.tag)} />
      )}
    </button>
  );
};

graphql(`
  fragment RegisterNicovideoPage_RegisterForm_SuccessToast on Video {
    id
    title
    ...Link_Video
  }
`);
export const SuccessToast: React.FC<{
  fragment: RegisterNicovideoPage_RegisterForm_SuccessToastFragment;
}> = ({ fragment }) => {
  return (
    <div>
      <LinkVideo
        fragment={getFragment(Link_VideoFragmentDoc, fragment)}
        className={clsx(["font-bold"], ["text-blue-400"])}
      >
        {fragment.title}
      </LinkVideo>
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};
export const useCallSuccessToast =
  () => (props: Pick<ComponentProps<typeof SuccessToast>, "fragment">) =>
    toast(() => <SuccessToast {...props} />);
