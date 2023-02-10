import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoAddTitleEventFragment,
  VideoPage_VideoEventTemplateFragmentDoc,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoAddTitleEvent on VideoAddTitleEvent {
    ...VideoPage_VideoEventTemplate
    title
  }
`);
export const VideoAddTitleEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoAddTitleEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"動画タイトルの追加"}
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
