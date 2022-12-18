"use client";
import clsx from "clsx";
import React from "react";
import { useMutation } from "urql";

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
        tags {
          id
          name
        }
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
  data: SendData | undefined;
}> = ({ className, data }) => {
  const [, trigger] = useMutation(RegisterNicovideoPage_RegisterVideoDocument);

  return (
    <input
      type="button"
      className={clsx(
        className,
        ["rounded"],
        ["px-6", "py-2"],
        ["disabled:bg-slate-300", "bg-blue-400", "hover:bg-blue-500"],
        ["disabled:text-slate-500", "text-blue-50", "hover:text-blue-100"],
        ["text-blue-50", "group-hover:text-blue-100"],
        ["group-disabled:text-slate-400"],
        ["text-sm"],
        ["cursor-pointer"]
      )}
      onClick={() => {
        if (!data) return;
        trigger({
          input: {
            primaryTitle: data.title,
            extraTitles: [],
            primaryThumbnail: data.thumbnail,
            tags: data.tags,
            sources: [
              {
                type: RegisterVideoInputSourceType.Nicovideo,
                sourceId: data.nicovideoId,
              },
            ],
          },
        });
      }}
      value="登録"
    />
  );
};
