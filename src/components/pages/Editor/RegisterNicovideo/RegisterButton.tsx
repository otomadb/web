"use client";
import clsx from "clsx";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";

import { LinkVideo } from "~/components/common/Link";
import { graphql } from "~/gql";
import {
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterVideoInputSourceType,
} from "~/gql/graphql";

graphql(`
  mutation RegisterNicovideoPage_RegisterVideo($input: RegisterVideoInput!) {
    registerVideo(input: $input) {
      __typename
      ... on RegisterVideoSuccessedPayload {
        video {
          id
          serial
          title
        }
      }
    }
  }
`);

export type RegisterData = {
  title: string;
  thumbnail: string;
  nicovideoId: string;

  tagIds: string[];
  semitagNames: string[];
};

export const RegisterButton: React.FC<{
  className?: string;
  registerData: RegisterData | undefined;
  onSuccess(): void;
}> = ({ className, registerData, onSuccess }) => {
  const [, trigger] = useMutation(RegisterNicovideoPage_RegisterVideoDocument);

  return (
    <input
      type="button"
      disabled={!registerData}
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
        if (!registerData) return;
        const { error, data: payload } = await trigger({
          input: {
            primaryTitle: registerData.title,
            extraTitles: [],
            primaryThumbnail: registerData.thumbnail,
            tags: registerData.tagIds,
            sources: [
              {
                type: RegisterVideoInputSourceType.Nicovideo,
                sourceId: registerData.nicovideoId,
              },
            ],
            semitags: registerData.semitagNames,
          },
        });

        if (error || !payload) {
          toast.error(() => (
            <span className={clsx(["text-slate-700"])}>
              登録時に問題が発生しました
            </span>
          ));
          return;
        }

        // TODO: Failedだったケース

        if (
          payload.registerVideo.__typename === "RegisterVideoSuccessedPayload"
        ) {
          const { serial, title } = payload.registerVideo.video;
          toast(() => (
            <span className={clsx(["text-slate-700"])}>
              <LinkVideo
                serial={serial}
                className={clsx(["font-bold"], ["text-blue-500"])}
              >
                {title}
              </LinkVideo>
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
