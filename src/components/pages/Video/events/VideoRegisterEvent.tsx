import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoEventTemplateFragmentDoc,
  VideoPage_VideoRegisterEventFragment,
} from "~/gql/graphql";

import { VideoEventTemplate } from "./VideoEventTemplate";

graphql(`
  fragment VideoPage_VideoRegisterEvent on VideoRegisterEvent {
    ...VideoPage_VideoEventTemplate
  }
`);
export const VideoRegisterEvent: React.FC<{
  className?: string;
  fragment: VideoPage_VideoRegisterEventFragment;
}> = ({ fragment, ...props }) => {
  return (
    <VideoEventTemplate
      {...props}
      fragment={getFragment(VideoPage_VideoEventTemplateFragmentDoc, fragment)}
      description={"動画の登録"}
      Icon={({ className }) => (
        <DocumentPlusIcon className={clsx(className, ["w-4"], ["h-4"])} />
      )}
    />
  );
};
