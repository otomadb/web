import { TagIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_VideoEventTemplateFragmentDoc,
  VideoPage_VideoRemoveTagEventFragment,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoRemoveTagEvent on VideoRemoveTagEvent {
    ...VideoPage_VideoEventTemplate
    tag {
      ...Component_Tag
    }
  }
`);
export const VideoRemoveTagEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoRemoveTagEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"タグの削除"}
      Icon={({ className }) => (
        <TagIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    >
      <Tag tag={getFragment(Component_TagFragmentDoc, fragment.tag)} />
    </VideoEventTemplate>
  );
};
