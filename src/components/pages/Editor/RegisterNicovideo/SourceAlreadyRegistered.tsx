"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { Thumbnail2 } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import {
  Common_ThumbnailFragmentDoc,
  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragment,
} from "~/gql/graphql";

graphql(`
  fragment EditorRegisterNicovideoPage_SourceAlreadyRegistered on NicovideoVideoSource {
    sourceId
    video {
      id
      title
      ...Link_Video
      ...Common_Thumbnail
    }
  }
`);
export const SourceAlreadyExists: React.FC<{
  className?: string;
  fragment: EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragment;
}> = ({ className, fragment }) => (
  <div className={clsx(className, ["flex", "gap-x-4"])}>
    <LinkVideo className={clsx(["block"], ["w-64"])} fragment={fragment.video}>
      <Thumbnail2
        width={260}
        height={200}
        fragment={getFragment(Common_ThumbnailFragmentDoc, fragment.video)}
      />
    </LinkVideo>
    <div>
      <p className={clsx(["text-sm"], ["text-slate-900"])}>
        <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>は
        <LinkVideo className={clsx(["font-bold"])} fragment={fragment.video}>
          {fragment.video.title}
        </LinkVideo>
        として既に登録されています。
      </p>
    </div>
  </div>
);
