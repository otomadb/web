import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  EditorRegisterNicovideo_AlreadyFragment,
  Link_VideoFragmentDoc,
} from "~/gql/graphql";

graphql(`
  fragment EditorRegisterNicovideoPage_Already on NicovideoVideoSource {
    sourceId
    video {
      id
      title
      ...Link_Video
      ...Component_Thumbnail
    }
  }
`);
export const Already: React.FC<{
  className?: string;
  fragment: EditorRegisterNicovideo_AlreadyFragment;
}> = ({ className, fragment }) => (
  <div className={clsx(className, ["mt-4"], ["flex", "flex-col"])}>
    <Thumbnail
      width={260}
      height={200}
      fragment={getFragment(Component_ThumbnailFragmentDoc, fragment.video)}
    />
    <p className={clsx(["mt-2"], ["text-sm"], ["text-slate-700"])}>
      <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>は
      <LinkVideo
        className={clsx(["font-bold"], ["text-slate-900"])}
        fragment={getFragment(Link_VideoFragmentDoc, fragment.video)}
      >
        {fragment.video.title}
      </LinkVideo>
      として既に登録されています。
    </p>
  </div>
);
