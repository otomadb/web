import { PlusSmallIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoAddThumbnailEventFragment,
  VideoPage_VideoEventTemplateFragmentDoc,
  VideoPage_VideoSetPrimaryThumbnailEventFragment,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoAddThumbnailEvent on VideoAddThumbnailEvent {
    ...VideoPage_VideoEventTemplate
    thumbnailUrl
  }
`);
export const VideoAddThumbnailEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoAddThumbnailEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"サムネイルの追加"}
      Icon={({ className }) => (
        <PlusSmallIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      {/* TODO: もっとマシなの */}
      <div className={clsx(["text-xs", "font-mono"])}>
        {fragment.thumbnailUrl}
      </div>
    </VideoEventTemplate>
  );
};

graphql(`
  fragment VideoPage_VideoSetPrimaryThumbnailEvent on VideoSetPrimaryThumbnailEvent {
    ...VideoPage_VideoEventTemplate
    thumbnailUrl
  }
`);
export const VideoChangePrimaryThumbnailEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoSetPrimaryThumbnailEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"メインのサムネイル設定"}
      Icon={({ className }) => (
        <PlusSmallIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      {/* TODO: もっとマシなの */}
      <div className={clsx(["text-xs", "font-mono"])}>
        {fragment.thumbnailUrl}
      </div>
    </VideoEventTemplate>
  );
};
