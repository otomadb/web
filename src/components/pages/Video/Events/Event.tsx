import clsx from "clsx";
import Image from "next/image";
import React, { ReactNode } from "react";

import { LinkUser } from "~/app/users/[name]/Link";
import { Tag } from "~/components/common/Tag";
import { UserIcon2 } from "~/components/common/UserIcon";
import { FragmentType, getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  Component_UserIconFragmentDoc,
  VideoPage_SemitagFragmentDoc,
} from "~/gql/graphql";

import { Semitag } from "../Semitag";

const EventTemplateFragment = graphql(`
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
  fragment: FragmentType<typeof EventTemplateFragment>;
  children: ReactNode;
}> = ({ children, ...props }) => {
  const fragment = getFragment(EventTemplateFragment, props.fragment);
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
          fragment={fragment.user}
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

const VideoRegisterEventFragment = graphql(`
  fragment VideoEventPage_VideoRegisterEvent on VideoRegisterEvent {
    ...VideoEventPage_EventTemplate
  }
`);
export const VideoRegisterEvent: React.FC<{
  fragment: FragmentType<typeof VideoRegisterEventFragment>;
}> = (props) => {
  const fragment = getFragment(VideoRegisterEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTitleCreateEventFragment = graphql(`
  fragment VideoEventPage_VideoTitleCreateEvent on VideoTitleCreateEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleCreateEvent: React.FC<{
  fragment: FragmentType<typeof VideoTitleCreateEventFragment>;
}> = (props) => {
  const fragment = getFragment(VideoTitleCreateEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTitleSetPrimaryEventFragment = graphql(`
  fragment VideoEventPage_VideoTitleSetPrimaryEvent on VideoTitleSetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleSetPrimaryEvent: React.FC<{
  fragment: FragmentType<typeof VideoTitleSetPrimaryEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    VideoTitleSetPrimaryEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTitleUnsetPrimaryEventFragment = graphql(`
  fragment VideoEventPage_VideoTitleUnsetPrimaryEvent on VideoTitleUnsetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoTitle {
      title
      primary
    }
  }
`);
export const VideoTitleUnsetPrimaryEvent: React.FC<{
  fragment: FragmentType<typeof VideoTitleUnsetPrimaryEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    VideoTitleUnsetPrimaryEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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

const VideoThumbnailCreateEventFragment = graphql(`
  fragment VideoEventPage_VideoThumbnailCreateEvent on VideoThumbnailCreateEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailCreateEvent: React.FC<{
  fragment: FragmentType<typeof VideoThumbnailCreateEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    VideoThumbnailCreateEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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

const VideoThumbnailSetPrimaryEventFragment = graphql(`
  fragment VideoEventPage_VideoThumbnailSetPrimaryEvent on VideoThumbnailSetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailSetPrimaryEvent: React.FC<{
  fragment: FragmentType<typeof VideoThumbnailSetPrimaryEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    VideoThumbnailSetPrimaryEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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

const VideoThumbnailUnsetPrimaryEventFragment = graphql(`
  fragment VideoEventPage_VideoThumbnailUnsetPrimaryEvent on VideoThumbnailUnsetPrimaryEvent {
    ...VideoEventPage_EventTemplate
    videoThumbnail {
      imageUrl
    }
  }
`);
export const VideoThumbnailUnsetPrimaryEvent: React.FC<{
  fragment: FragmentType<typeof VideoThumbnailUnsetPrimaryEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    VideoThumbnailUnsetPrimaryEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTagAttachEventFragment = graphql(`
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
  fragment: FragmentType<typeof VideoTagAttachEventFragment>;
}> = (props) => {
  const fragment = getFragment(VideoTagAttachEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTagDetachEventFragment = graphql(`
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
  fragment: FragmentType<typeof VideoTagDetachEventFragment>;
}> = (props) => {
  const fragment = getFragment(VideoTagDetachEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const VideoTagReattachEventFragment = graphql(`
  fragment VideoEventPage_VideoTagReattachEvent on VideoTagReattachEvent {
    ...VideoEventPage_EventTemplate
  }
`);
export const VideoTagReattachEvent: React.FC<{
  fragment: FragmentType<typeof VideoTagReattachEventFragment>;
}> = (props) => {
  const fragment = getFragment(VideoTagReattachEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
      <div className={clsx(["text-slate-800"], ["text-[10px]"])}>
        タグの再追加
      </div>
    </EventTemplate>
  );
};

const SemitagAttachEventFragment = graphql(`
  fragment VideoEventPage_SemitagAttachEvent on SemitagAttachEvent {
    ...VideoEventPage_EventTemplate
    semitag {
      ...VideoPage_Semitag
    }
  }
`);
export const SemitagAttachEvent: React.FC<{
  fragment: FragmentType<typeof SemitagAttachEventFragment>;
}> = (props) => {
  const fragment = getFragment(SemitagAttachEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const SemitagResolveEventFragment = graphql(`
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
  fragment: FragmentType<typeof SemitagResolveEventFragment>;
}> = (props) => {
  const fragment = getFragment(SemitagResolveEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const SemitagRejectEventFragment = graphql(`
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
  fragment: FragmentType<typeof SemitagRejectEventFragment>;
}> = (props) => {
  const fragment = getFragment(SemitagRejectEventFragment, props.fragment);
  return (
    <EventTemplate fragment={fragment}>
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

const NicovideoVideoSourceCreateEventFragment = graphql(`
  fragment VideoEventPage_NicovideoVideoSourceCreateEvent on NicovideoVideoSourceCreateEvent {
    ...VideoEventPage_EventTemplate
    source {
      sourceId
      embedUrl
    }
  }
`);
export const NicovideoVideoSourceCreateEvent: React.FC<{
  fragment: FragmentType<typeof NicovideoVideoSourceCreateEventFragment>;
}> = (props) => {
  const fragment = getFragment(
    NicovideoVideoSourceCreateEventFragment,
    props.fragment
  );
  return (
    <EventTemplate fragment={fragment}>
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
          src={fragment.source.embedUrl}
        />
      </div>
    </EventTemplate>
  );
};

const EventSwitchFragment = graphql(`
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
  fragment: FragmentType<typeof EventSwitchFragment>;
}> = (props) => {
  const fragment = getFragment(EventSwitchFragment, props.fragment);
  switch (fragment.__typename) {
    case "VideoRegisterEvent":
      return <VideoRegisterEvent {...props} fragment={fragment} />;
    case "VideoTitleCreateEvent":
      return <VideoTitleCreateEvent {...props} fragment={fragment} />;
    case "VideoTitleSetPrimaryEvent":
      return <VideoTitleSetPrimaryEvent {...props} fragment={fragment} />;
    case "VideoTitleUnsetPrimaryEvent":
      return <VideoTitleUnsetPrimaryEvent {...props} fragment={fragment} />;
    case "VideoThumbnailCreateEvent":
      return <VideoThumbnailCreateEvent {...props} fragment={fragment} />;
    case "VideoThumbnailSetPrimaryEvent":
      return <VideoThumbnailSetPrimaryEvent {...props} fragment={fragment} />;
    case "VideoThumbnailUnsetPrimaryEvent":
      return <VideoThumbnailUnsetPrimaryEvent {...props} fragment={fragment} />;
    case "VideoTagAttachEvent":
      return <VideoTagAttachEvent {...props} fragment={fragment} />;
    case "VideoTagDetachEvent":
      return <VideoTagDetachEvent {...props} fragment={fragment} />;
    case "VideoTagReattachEvent":
      return <VideoTagReattachEvent {...props} fragment={fragment} />;
    case "SemitagAttachEvent":
      return <SemitagAttachEvent {...props} fragment={fragment} />;
    case "SemitagResolveEvent":
      return <SemitagResolveEvent {...props} fragment={fragment} />;
    case "SemitagRejectEvent":
      return <SemitagRejectEvent {...props} fragment={fragment} />;
    case "NicovideoVideoSourceCreateEvent":
      return <NicovideoVideoSourceCreateEvent {...props} fragment={fragment} />;
    default:
      return null;
  }
};
