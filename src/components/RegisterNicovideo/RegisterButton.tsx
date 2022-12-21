"use client";
import clsx from "clsx";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";

import { VideoLink } from "~/components/common/Link";
import { graphql } from "~/gql";
import {
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterVideoInputSourceType,
} from "~/gql/graphql";

graphql(`
  mutation RegisterNicovideoPage_RegisterVideo($input: RegisterVideoInput!) {
    registerVideo(input: $input) {
      video {
        id
        title
      }
    }
  }
`);

export type SendData = {
  title: string;
  tags: string[];
  thumbnail: string;
  nicovideoId: string;
};

export const RegisterButton: React.FC<{
  className?: string;
  senddata: SendData | undefined;
  onSuccess(): void;
}> = ({ className, senddata, onSuccess }) => {
  const [, trigger] = useMutation(RegisterNicovideoPage_RegisterVideoDocument);

  return (
    <input
      type="button"
      disabled={!senddata}
      className={clsx(
        className,
        ["rounded"],
        ["px-6", "py-2"],
        ["disabled:bg-slate-300", "bg-blue-400", "hover:bg-blue-500"],
        ["disabled:text-slate-100", "text-blue-50", "hover:text-blue-100"],
        ["text-sm"],
        ["cursor-pointer"]
      )}
      onClick={async () => {
        if (!senddata) return;
        const { error, data: payload } = await trigger({
          input: {
            primaryTitle: senddata.title,
            extraTitles: [],
            primaryThumbnail: senddata.thumbnail,
            tags: senddata.tags,
            sources: [
              {
                type: RegisterVideoInputSourceType.Nicovideo,
                sourceId: senddata.nicovideoId,
              },
            ],
          },
        });

        if (error) {
          toast.error(() => (
            <span className={clsx(["text-slate-700"])}>
              登録時に問題が発生しました
            </span>
          ));
          return;
        }

        if (payload) {
          const { id, title } = payload.registerVideo.video;
          toast(() => (
            <span className={clsx(["text-slate-700"])}>
              <VideoLink
                videoId={id}
                className={clsx(["font-bold"], ["text-blue-500"])}
              >
                {title}
              </VideoLink>
              を登録しました．
            </span>
          ));
          onSuccess();
        }
      }}
      value="登録"
    />
  );
};
