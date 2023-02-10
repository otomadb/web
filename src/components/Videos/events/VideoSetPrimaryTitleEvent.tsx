import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoEventTemplateFragmentDoc,
  VideoPage_VideoSetPrimaryTitleEventFragment,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoSetPrimaryTitleEvent on VideoSetPrimaryTitleEvent {
    ...VideoPage_VideoEventTemplate
    title
  }
`);
export const VideoSetPrimaryTitleEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoSetPrimaryTitleEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"メインの動画タイトル設定"}
      Icon={({ className }) => (
        <ArrowPathRoundedSquareIcon
          className={clsx(className, ["w-4"], ["h-4"])}
        />
      )}
    >
      {/* TODO: もっとマシなの用意 */}
      <div>{fragment.title}</div>
    </VideoEventTemplate>
  );
};
