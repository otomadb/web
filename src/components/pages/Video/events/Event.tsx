import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoAddNicovideoSourceEventFragmentDoc,
  VideoPage_VideoAddSemitagEventFragmentDoc,
  VideoPage_VideoAddTagEventFragmentDoc,
  VideoPage_VideoAddThumbnailEventFragmentDoc,
  VideoPage_VideoAddTitleEventFragmentDoc,
  VideoPage_VideoEventFragment,
  VideoPage_VideoRegisterEventFragmentDoc,
  VideoPage_VideoRemoveTagEventFragmentDoc,
  VideoPage_VideoSetPrimaryThumbnailEventFragmentDoc,
  VideoPage_VideoSetPrimaryTitleEventFragmentDoc,
} from "~/gql/graphql";

import { VideoAddNicovideoSourceEvent } from "./VideoAddNicovideoSourceEvent";
import { VideoAddSemitagEvent } from "./VideoAddSemitagEvent";
import { VideoAddTagEvent } from "./VideoAddTagEvent";
import {
  VideoAddThumbnailEvent,
  VideoChangePrimaryThumbnailEvent,
} from "./VideoAddThumbnailEvent";
import { VideoAddTitleEvent } from "./VideoAddTitleEvent";
import { VideoRegisterEvent } from "./VideoRegisterEvent";
import { VideoRemoveTagEvent } from "./VideoRemoveTagEvent";
import { VideoSetPrimaryTitleEvent } from "./VideoSetPrimaryTitleEvent";

graphql(`
  fragment VideoPage_VideoEvent on VideoEvent {
    id
    __typename
    ... on VideoRegisterEvent {
      ...VideoPage_VideoRegisterEvent
    }
    ... on VideoAddTitleEvent {
      ...VideoPage_VideoAddTitleEvent
    }
    ... on VideoSetPrimaryTitleEvent {
      ...VideoPage_VideoSetPrimaryTitleEvent
    }
    ... on VideoAddThumbnailEvent {
      ...VideoPage_VideoAddThumbnailEvent
    }
    ... on VideoSetPrimaryThumbnailEvent {
      ...VideoPage_VideoSetPrimaryThumbnailEvent
    }
    ... on VideoAddTagEvent {
      ...VideoPage_VideoAddTagEvent
    }
    ... on VideoRemoveTagEvent {
      ...VideoPage_VideoRemoveTagEvent
    }
    ... on VideoAddSemitagEvent {
      ...VideoPage_VideoAddSemitagEvent
    }
    ... on VideoAddNicovideoSourceEvent {
      ...VideoPage_VideoAddNicovideoSourceEvent
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
    case "VideoAddTitleEvent":
      return (
        <VideoAddTitleEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoAddTitleEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoSetPrimaryTitleEvent":
      return (
        <VideoSetPrimaryTitleEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoSetPrimaryTitleEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoAddThumbnailEvent":
      return (
        <VideoAddThumbnailEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoAddThumbnailEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoSetPrimaryThumbnailEvent":
      return (
        <VideoChangePrimaryThumbnailEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoSetPrimaryThumbnailEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoAddTagEvent":
      return (
        <VideoAddTagEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoAddTagEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoRemoveTagEvent":
      return (
        <VideoRemoveTagEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoRemoveTagEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoAddSemitagEvent":
      return (
        <VideoAddSemitagEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoAddSemitagEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoAddNicovideoSourceEvent":
      return (
        <VideoAddNicovideoSourceEvent
          className={className}
          fragment={getFragment(
            VideoPage_VideoAddNicovideoSourceEventFragmentDoc,
            fragment
          )}
        />
      );
    default:
      return null;
  }
};
