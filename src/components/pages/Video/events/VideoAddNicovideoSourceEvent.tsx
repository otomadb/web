import { LinkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoAddNicovideoSourceEventFragment,
  VideoPage_VideoEventTemplateFragmentDoc,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoAddNicovideoSourceEvent on VideoAddNicovideoSourceEvent {
    ...VideoPage_VideoEventTemplate
    source {
      id
      sourceId
    }
  }
`);
export const VideoAddNicovideoSourceEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoAddNicovideoSourceEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"ニコニコ動画のソースの追加"}
      Icon={({ className }) => (
        <LinkIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      {/* TODO: もっとマシなの用意 */}
      <div>{fragment.source.sourceId}</div>
    </VideoEventTemplate>
  );
};
