"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { LinkRequestNicovideo } from "~/app/request/nicovideo/Link";
import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { LinkVideo } from "~/app/videos/[serial]/Link";
import { getFragment, graphql } from "~/gql";
import {
  CommonTagFragmentDoc,
  Component_UserIconFragmentDoc,
  SearchContents_NicovideoRequestExistsFragment,
  SearchContents_NicovideoRequestExistsFragmentDoc,
  SearchContents_NicovideoVideoSourceExistsFragment,
  SearchContents_NicovideoVideoSourceExistsFragmentDoc,
  VideoThumbnailFragmentDoc,
} from "~/gql/graphql";

import { CoolImage } from "../CoolImage";
import { CommonTag } from "../Tag";
import { VideoThumbnail } from "../Thumbnail";
import { UserIcon2 } from "../UserIcon";

graphql(`
  fragment SearchContents_NicovideoVideoSourceExists on NicovideoVideoSource {
    id
    sourceId
    video {
      id
      title
      ...VideoThumbnail
      ...Link_Video
      taggings(input: { limit: 5 }) {
        nodes {
          id
          tag {
            ...Link_Tag
            ...CommonTag
          }
        }
      }
    }
  }
`);
const SourceExists: React.FC<{
  className?: string;
  fragment: SearchContents_NicovideoVideoSourceExistsFragment;
}> = ({ className, fragment }) => {
  return (
    <LinkVideo
      fragment={fragment.video}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", "gap-x-4"],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <VideoThumbnail
          className={clsx(["w-36"], ["h-18"])}
          fragment={getFragment(VideoThumbnailFragmentDoc, fragment.video)}
        />
      </div>
      <div
        className={clsx(["flex-grow"], ["flex", "flex-col", "justify-center"])}
      >
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-500"], ["text-xs"])}>
            <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>
            は既に登録されています。
          </p>
        </div>
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
            {fragment.video.title}
          </p>
        </div>
        <div className={clsx(["mt-2"], ["flex-grow"], ["flex"])}>
          {fragment.video.taggings.nodes.length === 0 && (
            <p className={clsx(["text-xs", "text-slate-400"])}>
              タグ付けがありません。
            </p>
          )}
          <div className={clsx(["flex", "flex-wrap", "gap-x-1"])}>
            {fragment.video.taggings.nodes.map((tagging) => (
              <div key={tagging.id} className={clsx()}>
                <CommonTag
                  fragment={getFragment(CommonTagFragmentDoc, tagging.tag)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LinkVideo>
  );
};

graphql(`
  fragment SearchContents_NicovideoRequestExists on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    id
    title
    sourceId
    thumbnailUrl
    requestedBy {
      id
      name
      ...Link_User
      ...Component_UserIcon
    }
  }
`);
const RequestsExists: React.FC<{
  className?: string;
  fragment: SearchContents_NicovideoRequestExistsFragment;
}> = ({ className, fragment }) => {
  return (
    <LinkNicovideoRegistrationRequest
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", ["gap-x-4"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
      fragment={fragment}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <CoolImage
          className={clsx(["w-36"], ["h-18"])}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          width={196}
          height={128}
        />
      </div>
      <div
        className={clsx(["flex-grow"], ["flex", "flex-col", "justify-center"])}
      >
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-500"], ["text-xs"])}>
            <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>
            は既にリクエストされています。
          </p>
        </div>
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
            {fragment.title}
          </p>
        </div>
        <div className={clsx(["mt-2"], ["flex-grow"], ["flex"])}>
          <UserIcon2
            size={24}
            fragment={getFragment(
              Component_UserIconFragmentDoc,
              fragment.requestedBy
            )}
          />
          <div className={clsx(["ml-1"])}>
            <span className={clsx(["text-xs"])}>
              {fragment.requestedBy.name}
            </span>
          </div>
        </div>
      </div>
    </LinkNicovideoRegistrationRequest>
  );
};

const NeitherExists: React.FC<{
  className?: string;
  sourceId: string;
}> = ({ className, sourceId }) => {
  return (
    <LinkRequestNicovideo
      className={clsx(
        className,
        ["px-4"],
        ["py-2"],
        ["flex", ["gap-x-4"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
      params={{ sourceId }}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      <div className={clsx(["flex"])}>
        <p className={clsx("text-slate-700", "text-sm")}>
          <span className={clsx(["font-mono"])}>{sourceId}</span>
          は登録もリクエストもされていません。
          <span className={clsx(["text-blue-500"])}>
            リクエストしてみては？
          </span>
        </p>
      </div>
    </LinkRequestNicovideo>
  );
};

export const SearchNicovideo: React.FC<{
  className?: string;
  sourceId: string;
}> = ({ className, sourceId }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query SearchContents_SearchNicovideo($sourceId: String!) {
        findNicovideoVideoSource(input: { sourceId: $sourceId }) {
          ...SearchContents_NicovideoVideoSourceExists
        }
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          ...SearchContents_NicovideoRequestExists
        }
      }
    `),
    variables: { sourceId },
  });

  return (
    <div className={clsx(className)}>
      {data && (
        <>
          {data.findNicovideoVideoSource && (
            <SourceExists
              fragment={getFragment(
                SearchContents_NicovideoVideoSourceExistsFragmentDoc,
                data.findNicovideoVideoSource
              )}
            />
          )}
          {!data.findNicovideoVideoSource &&
            data.findNicovideoRegistrationRequest && (
              <RequestsExists
                fragment={getFragment(
                  SearchContents_NicovideoRequestExistsFragmentDoc,
                  data.findNicovideoRegistrationRequest
                )}
              />
            )}
          {!data.findNicovideoVideoSource &&
            !data.findNicovideoRegistrationRequest && (
              <NeitherExists sourceId={sourceId} />
            )}
        </>
      )}
    </div>
  );
};
