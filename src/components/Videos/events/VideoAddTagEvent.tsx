import { TagIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_VideoAddTagEventFragment,
  VideoPage_VideoEventTemplateFragmentDoc,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoAddTagEvent on VideoAddTagEvent {
    ...VideoPage_VideoEventTemplate
    tag {
      ...Component_Tag
    }
  }
`);
export const VideoAddTagEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoAddTagEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"タグの追加"}
      Icon={({ className }) => (
        <TagIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      <Tag tag={getFragment(Component_TagFragmentDoc, fragment.tag)} />
    </VideoEventTemplate>
  );
};
