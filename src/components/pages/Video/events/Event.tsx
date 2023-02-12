import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoEventFragment,
  VideoPage_VideoRegisterEventFragmentDoc,
} from "~/gql/graphql";

import { VideoRegisterEvent } from "./VideoRegisterEvent";
graphql(`
  fragment VideoPage_VideoEvent on VideoEvent {
    id
    __typename
    ... on VideoRegisterEvent {
      ...VideoPage_VideoRegisterEvent
    }
  }
`);
export const Event: React.FC<{
  className?: string;
  fragment: VideoPage_VideoEventFragment;
}> = ({ className, fragment }) => {
  switch (fragment.__typename) {
    case "VideoRegisterEvent":
      return (
        <VideoRegisterEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoRegisterEventFragmentDoc,
            fragment
          )}
        />
      );
    default:
      return null;
  }
};
