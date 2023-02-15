import clsx from "clsx";
import Image from "next/image";
import React, { ReactNode } from "react";

import { LinkUser } from "~/app/users/[name]/Link";
import { Tag } from "~/components/common/Tag";
import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  Component_UserIconFragmentDoc,
  Link_UserFragmentDoc,
  VideoEventPage_EventFragment,
  VideoEventPage_EventTemplateFragment,
  VideoEventPage_EventTemplateFragmentDoc,
  VideoEventPage_NicovideoVideoSourceCreateEventFragment,
  VideoEventPage_NicovideoVideoSourceCreateEventFragmentDoc,
  VideoEventPage_SemitagAttachEventFragment,
  VideoEventPage_SemitagAttachEventFragmentDoc,
  VideoEventPage_SemitagRejectEventFragment,
  VideoEventPage_SemitagRejectEventFragmentDoc,
  VideoEventPage_SemitagResolveEventFragment,
  VideoEventPage_SemitagResolveEventFragmentDoc,
  VideoEventPage_VideoRegisterEventFragment,
  VideoEventPage_VideoRegisterEventFragmentDoc,
  VideoEventPage_VideoTagAttachEventFragment,
  VideoEventPage_VideoTagAttachEventFragmentDoc,
  VideoEventPage_VideoTagDetachEventFragment,
  VideoEventPage_VideoTagDetachEventFragmentDoc,
  VideoEventPage_VideoTagReattachEventFragment,
  VideoEventPage_VideoTagReattachEventFragmentDoc,
  VideoEventPage_VideoThumbnailCreateEventFragment,
  VideoEventPage_VideoThumbnailCreateEventFragmentDoc,
  VideoEventPage_VideoThumbnailSetPrimaryEventFragment,
  VideoEventPage_VideoThumbnailSetPrimaryEventFragmentDoc,
  VideoEventPage_VideoThumbnailUnsetPrimaryEventFragment,
  VideoEventPage_VideoThumbnailUnsetPrimaryEventFragmentDoc,
  VideoEventPage_VideoTitleCreateEventFragment,
  VideoEventPage_VideoTitleCreateEventFragmentDoc,
  VideoEventPage_VideoTitleSetPrimaryEventFragment,
  VideoEventPage_VideoTitleSetPrimaryEventFragmentDoc,
  VideoEventPage_VideoTitleUnsetPrimaryEventFragment,
  VideoEventPage_VideoTitleUnsetPrimaryEventFragmentDoc,
  VideoPage_SemitagFragmentDoc,
} from "~/gql/graphql";

import { Semitag } from "../Semitag";

graphql(`
  fragment VideoEventPage_EventTemplate on Event {
    id
    user {
      ...Component_UserIcon
      ...Link_User
      id
      name
      displayName
    }
    createdAt
  }
`);
export const EventTemplate: React.FC<{
  fragment: VideoEventPage_EventTemplateFragment;
  children: ReactNode;
}> = ({ fragment, children }) => {
  return (
    <div
      className={clsx(
        ["flex"],
        ["px-4"],
        ["py-1"],
        ["border", "border-slate-300"],
        ["rounded"]
      )}
    >
      <div className={clsx(["flex-grow"], ["flex", "items-center"])}>
        {children}
      </div>
      <div
        className={clsx(
          ["self-start"],
          ["flex-shrink-0"],
          ["flex", "items-center"]
        )}
      >
        <LinkUser
          fragment={getFragment(Link_UserFragmentDoc, fragment.user)}
          className={clsx(["flex", ["items-center"]])}
        >
          <UserIcon2
            fragment={getFragment(Component_UserIconFragmentDoc, fragment.user)}
            size={24}
          />
        </LinkUser>
        <div className={clsx(["ml-2"], ["flex", ["items-center"]])}>
          <time
            className={clsx(["text-[10px]", "font-mono", "text-slate-500"])}
            dateTime={fragment.createdAt}
          >
            {fragment.createdAt}
          </time>
        </div>
      </div>
    </div>
  );
};

graphql(`
  fragment VideoEventPage_VideoRegisterEvent on VideoRegisterEvent {
    ...VideoEventPage_EventTemplate
  }
`);
export const VideoRegisterEvent: React.FC<{
  fragment: VideoEventPage_VideoRegisterEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col", "justify-center"])}>
        <div
          className={clsx(["text-slate-700"], ["font-bold"], ["text-[10px]"])}
        >
          動画が登録されました。
        </div>
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTitleCreateEvent on VideoTitleCreateEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleCreateEvent: React.FC<{
  fragment: VideoEventPage_VideoTitleCreateEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "items-center"], ["text-[10px]"])}>
        <div
          className={clsx(
            ["text-[12px]"],
            [
              { "text-slate-800": !fragment.videoTitle.primary },
              { "text-sky-700": fragment.videoTitle.primary },
              { "font-bold": fragment.videoTitle.primary },
            ]
          )}
        >
          {fragment.videoTitle.title}
        </div>
        がタイトルとして追加されました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTitleSetPrimaryEvent on VideoTitleSetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleSetPrimaryEvent: React.FC<{
  fragment: VideoEventPage_VideoTitleSetPrimaryEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "items-center"], ["text-[10px]"])}>
        <div
          className={clsx(
            ["text-[12px]"],
            [
              { "text-slate-800": !fragment.videoTitle.primary },
              { "text-sky-700": fragment.videoTitle.primary },
              { "font-bold": fragment.videoTitle.primary },
            ]
          )}
        >
          {fragment.videoTitle.title}
        </div>
        はメインのタイトルに設定されました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTitleUnsetPrimaryEvent on VideoTitleUnsetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleUnsetPrimaryEvent: React.FC<{
  fragment: VideoEventPage_VideoTitleUnsetPrimaryEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col"])}>
        <div
          className={clsx(
            ["text-[12px]"],
            [
              { "text-slate-800": !fragment.videoTitle.primary },
              { "text-sky-700": fragment.videoTitle.primary },
              { "font-bold": fragment.videoTitle.primary },
            ]
          )}
        >
          {fragment.videoTitle.title}
        </div>
        はメインのタイトルではなくなりました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoThumbnailCreateEvent on VideoThumbnailCreateEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailCreateEvent: React.FC<{
  fragment: VideoEventPage_VideoThumbnailCreateEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col"], ["items-start"])}>
        <div
          className={clsx(
            ["flex", "items-center"],
            ["text-slate-800"],
            ["text-[10px]"]
          )}
        >
          サムネイルを追加しました。
        </div>
        <div className={clsx(["mt-2"])}>
          <Image
            width={196}
            height={128}
            src={fragment.videoThumbnail.imageUrl}
            alt={fragment.videoThumbnail.imageUrl}
          />
        </div>
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoThumbnailSetPrimaryEvent on VideoThumbnailSetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailSetPrimaryEvent: React.FC<{
  fragment: VideoEventPage_VideoThumbnailSetPrimaryEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col"], ["items-start"])}>
        <div
          className={clsx(
            ["flex", "items-center"],
            ["text-slate-800"],
            ["text-[10px]"]
          )}
        >
          メインのサムネイルを変更しました。
        </div>
        <div className={clsx(["mt-2"])}>
          <Image
            width={196}
            height={128}
            src={fragment.videoThumbnail.imageUrl}
            alt={fragment.videoThumbnail.imageUrl}
          />
        </div>
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoThumbnailUnsetPrimaryEvent on VideoThumbnailUnsetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailUnsetPrimaryEvent: React.FC<{
  fragment: VideoEventPage_VideoThumbnailUnsetPrimaryEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col"], ["items-start"])}>
        <div
          className={clsx(
            ["flex", "items-center"],
            ["text-slate-800"],
            ["text-[10px]"]
          )}
        >
          メインのサムネイルから解除しました。
        </div>
        <div className={clsx(["mt-2"])}>
          <Image
            width={196}
            height={128}
            src={fragment.videoThumbnail.imageUrl}
            alt={fragment.videoThumbnail.imageUrl}
          />
        </div>
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTagAttachEvent on VideoTagAttachEvent {
    ...VideoEventPage_EventTemplate
    videoTag {
      tag {
        ...Component_Tag
      }
    }
  }
`);
export const VideoTagAttachEvent: React.FC<{
  fragment: VideoEventPage_VideoTagAttachEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "items-center"], ["text-[10px]"])}>
        タグ
        <Tag
          tag={getFragment(Component_TagFragmentDoc, fragment.videoTag.tag)}
        />
        が追加されました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTagDetachEvent on VideoTagDetachEvent {
    ...VideoEventPage_EventTemplate
    videoTag {
      tag {
        ...Component_Tag
      }
    }
  }
`);
export const VideoTagDetachEvent: React.FC<{
  fragment: VideoEventPage_VideoTagDetachEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "items-center"], ["text-[10px]"])}>
        タグ
        <Tag
          tag={getFragment(Component_TagFragmentDoc, fragment.videoTag.tag)}
        />
        が外されました
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_VideoTagReattachEvent on VideoTagReattachEvent {
    ...VideoEventPage_EventTemplate
  }
`);
export const VideoTagReattachEvent: React.FC<{
  fragment: VideoEventPage_VideoTagReattachEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["text-slate-800"], ["text-[10px]"])}>
        タグの再追加
      </div>
    </EventTemplate>
  );
};
graphql(`
  fragment VideoEventPage_SemitagAttachEvent on SemitagAttachEvent {
    ...VideoEventPage_EventTemplate
    semitag {
      ...VideoPage_Semitag
    }
  }
`);
export const SemitagAttachEvent: React.FC<{
  fragment: VideoEventPage_SemitagAttachEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div
        className={clsx(
          ["flex", "items-center"],
          ["text-slate-800"],
          ["text-[10px]"]
        )}
      >
        仮タグ
        <Semitag
          fragment={getFragment(VideoPage_SemitagFragmentDoc, fragment.semitag)}
        />
        を追加しました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_SemitagResolveEvent on SemitagResolveEvent {
    ...VideoEventPage_EventTemplate
    resolving {
      semitag {
        ...VideoPage_Semitag
      }
      resolveTo {
        tag {
          ...Component_Tag
        }
      }
    }
  }
`);
export const SemitagResolveEvent: React.FC<{
  fragment: VideoEventPage_SemitagResolveEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div
        className={clsx(
          ["flex", "items-center"],
          ["text-slate-800"],
          ["text-[10px]"]
        )}
      >
        仮タグ
        <Semitag
          fragment={getFragment(
            VideoPage_SemitagFragmentDoc,
            fragment.resolving.semitag
          )}
        />
        は
        <Tag
          tag={getFragment(
            Component_TagFragmentDoc,
            fragment.resolving.resolveTo.tag
          )}
        />
        に解決しました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_SemitagRejectEvent on SemitagRejectEvent {
    ...VideoEventPage_EventTemplate
    rejecting {
      semitag {
        ...VideoPage_Semitag
      }
    }
  }
`);
export const SemitagRejectEvent: React.FC<{
  fragment: VideoEventPage_SemitagRejectEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div
        className={clsx(
          ["flex", "items-center"],
          ["text-slate-800"],
          ["text-[10px]"]
        )}
      >
        仮タグ
        <Semitag
          fragment={getFragment(
            VideoPage_SemitagFragmentDoc,
            fragment.rejecting.semitag
          )}
        />
        を棄却しました。
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_NicovideoVideoSourceCreateEvent on NicovideoVideoSourceCreateEvent {
    ...VideoEventPage_EventTemplate
    source {
      sourceId
    }
  }
`);
export const NicovideoVideoSourceCreateEvent: React.FC<{
  fragment: VideoEventPage_NicovideoVideoSourceCreateEventFragment;
}> = ({ fragment }) => {
  return (
    <EventTemplate
      fragment={getFragment(VideoEventPage_EventTemplateFragmentDoc, fragment)}
    >
      <div className={clsx(["flex", "flex-col"], ["items-start"])}>
        <div
          className={clsx(
            ["flex", "items-center"],
            ["text-slate-800"],
            ["text-[10px]"]
          )}
        >
          ニコニコ動画の動画元として
          <div className={clsx(["text-[12px]"], ["text-slate-800"])}>
            {fragment.source.sourceId}
          </div>
          を追加しました。
        </div>
        <iframe
          className={clsx(["mt-2"])}
          height="160"
          src={`http://embed.nicovideo.jp/watch/${fragment.source.sourceId}`}
        />
      </div>
    </EventTemplate>
  );
};

graphql(`
  fragment VideoEventPage_Event on Event {
    __typename
    ... on VideoRegisterEvent {
      ...VideoEventPage_VideoRegisterEvent
    }
    ... on VideoTitleCreateEvent {
      ...VideoEventPage_VideoTitleCreateEvent
    }
    ... on VideoTitleSetPrimaryEvent {
      ...VideoEventPage_VideoTitleSetPrimaryEvent
    }
    ... on VideoTitleUnsetPrimaryEvent {
      ...VideoEventPage_VideoTitleUnsetPrimaryEvent
    }
    ... on VideoThumbnailCreateEvent {
      ...VideoEventPage_VideoThumbnailCreateEvent
    }
    ... on VideoThumbnailSetPrimaryEvent {
      ...VideoEventPage_VideoThumbnailSetPrimaryEvent
    }
    ... on VideoThumbnailUnsetPrimaryEvent {
      ...VideoEventPage_VideoThumbnailUnsetPrimaryEvent
    }
    ... on VideoTagAttachEvent {
      ...VideoEventPage_VideoTagAttachEvent
    }
    ... on VideoTagDetachEvent {
      ...VideoEventPage_VideoTagDetachEvent
    }
    ... on VideoTagReattachEvent {
      ...VideoEventPage_VideoTagReattachEvent
    }
    ... on SemitagAttachEvent {
      ...VideoEventPage_SemitagAttachEvent
    }
    ... on SemitagResolveEvent {
      ...VideoEventPage_SemitagResolveEvent
    }
    ... on SemitagRejectEvent {
      ...VideoEventPage_SemitagRejectEvent
    }
    ... on NicovideoVideoSourceCreateEvent {
      ...VideoEventPage_NicovideoVideoSourceCreateEvent
    }
  }
`);
export const EventSwitch: React.FC<{
  className?: string;
  fragment: VideoEventPage_EventFragment;
}> = ({ fragment, ...props }) => {
  switch (fragment.__typename) {
    case "VideoRegisterEvent":
      return (
        <VideoRegisterEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoRegisterEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoTitleCreateEvent":
      return (
        <VideoTitleCreateEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTitleCreateEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoTitleSetPrimaryEvent":
      return (
        <VideoTitleSetPrimaryEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTitleSetPrimaryEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoTitleUnsetPrimaryEvent":
      return (
        <VideoTitleUnsetPrimaryEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTitleUnsetPrimaryEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoThumbnailCreateEvent":
      return (
        <VideoThumbnailCreateEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoThumbnailCreateEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoThumbnailSetPrimaryEvent":
      return (
        <VideoThumbnailSetPrimaryEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoThumbnailSetPrimaryEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoThumbnailUnsetPrimaryEvent":
      return (
        <VideoThumbnailUnsetPrimaryEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoThumbnailUnsetPrimaryEventFragmentDoc,
            fragment
          )}
        />
      );

    case "VideoTagAttachEvent":
      return (
        <VideoTagAttachEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTagAttachEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoTagDetachEvent":
      return (
        <VideoTagDetachEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTagDetachEventFragmentDoc,
            fragment
          )}
        />
      );
    case "VideoTagReattachEvent":
      return (
        <VideoTagReattachEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_VideoTagReattachEventFragmentDoc,
            fragment
          )}
        />
      );
    case "SemitagAttachEvent":
      return (
        <SemitagAttachEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_SemitagAttachEventFragmentDoc,
            fragment
          )}
        />
      );
    case "SemitagResolveEvent":
      return (
        <SemitagResolveEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_SemitagResolveEventFragmentDoc,
            fragment
          )}
        />
      );
    case "SemitagRejectEvent":
      return (
        <SemitagRejectEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_SemitagRejectEventFragmentDoc,
            fragment
          )}
        />
      );
    case "NicovideoVideoSourceCreateEvent":
      return (
        <NicovideoVideoSourceCreateEvent
          {...props}
          fragment={getFragment(
            VideoEventPage_NicovideoVideoSourceCreateEventFragmentDoc,
            fragment
          )}
        />
      );
    default:
      return null;
  }
};
