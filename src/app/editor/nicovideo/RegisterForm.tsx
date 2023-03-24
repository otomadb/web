"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { ComponentProps, useCallback } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";
import * as z from "zod";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { BlueButton } from "~/components/common/Button";
import { FragmentType, graphql, useFragment } from "~/gql";
import { RegisterVideoInputSourceType } from "~/gql/graphql";

import { ConfirmForm } from "./ConfirmForm";
import { SourceChecker } from "./SourceChecker";
import { RegisterContext } from "./_components/Register/Context";

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
  sourceId: string | null;
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
  const {
    fields: semitags,
    append: appendSemitag,
    remove: removeSemitag,
  } = useFieldArray({ control, name: "semitags" });

  const [, mutateRegisterTag] = useMutation(
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
    `)
  );
  const callSuccessToast = useCallSuccessToast();
  const registerVideo: SubmitHandler<FormSchema> = useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      tags,
      semitags,
      nicovideoRequestId,
    }) => {
      const { data, error } = await mutateRegisterTag({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnail: thumbnailUrl,
          tags: tags.map(({ tagId }) => tagId),
          semitags: semitags.map(({ name }) => name),
          sources: [{ sourceId, type: RegisterVideoInputSourceType.Nicovideo }],
          nicovideoRequestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideo.__typename) {
        case "RegisterVideoSucceededPayload":
          callSuccessToast({ fragment: data.registerVideo.video });
          reset({ title: "", thumbnailUrl: "", tags: [] });
          clearSourceId();
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [callSuccessToast, clearSourceId, mutateRegisterTag, reset]
  );
  const setSource: ComponentProps<typeof SourceChecker>["setSource"] =
    useCallback(
      (source) => {
        setValue("sourceId", source.sourceId);
        setValue("title", source.title);
        setValue("thumbnailUrl", source.thumbnailUrl);
        setValue("nicovideoRequestId", source.nicovideoRequestId);
      },
      [setValue]
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
    <RegisterContext.Provider
      value={{
        toggleTag: (tagId: string) => {
          const i = getValues("tags").findIndex((t) => t.tagId === tagId);
          if (i === -1) appendTag({ tagId: tagId });
          else removeTag(i);
        },
        toggleSemitag: (name: string) => {
          const i = getValues("semitags").findIndex(
            (semitag) => semitag.name === name
          );
          if (i === -1) appendSemitag({ name: name });
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
        onSubmit={handleSubmit(registerVideo)}
      >
        <SourceChecker
          sourceId={sourceId}
          setSource={(source) => setSource(source)}
          toggleTag={(id) => toggleTag(id)}
          toggleSemitag={(name) => toggleSemitag(name)}
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
                登録
              </BlueButton>
            </div>
          </div>
        </SourceChecker>
      </form>
    </RegisterContext.Provider>
  );
};

const Fragment = graphql(`
  fragment RegisterNicovideoPage_RegisterForm_SuccessToast on Video {
    id
    title
    ...Link_Video
  }
`);
export const SuccessToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div>
      <LinkVideo
        fragment={fragment}
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
