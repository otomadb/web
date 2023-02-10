import { TagIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoAddSemitagEventFragment,
  VideoPage_VideoEventTemplateFragmentDoc,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoAddSemitagEvent on VideoAddSemitagEvent {
    ...VideoPage_VideoEventTemplate
    semitag {
      id
      name
    }
  }
`);
export const VideoAddSemitagEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoAddSemitagEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"仮タグの追加"}
      Icon={({ className }) => (
        <TagIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      {/* TODO: もっとマシなものを用意する */}
      <div>{fragment.semitag.name}</div>
    </VideoEventTemplate>
  );
};
