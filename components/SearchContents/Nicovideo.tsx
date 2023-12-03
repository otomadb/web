"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import { NicovideoRegistrationRequestLink } from "~/app/(v2)/requests/nicovideo/[sourceId]/Link";
import CommonTag from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import Pictogram from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";

import { useOpenRequestFromNicovideoWithID } from "../FormModal";

export const SearchNicovideoQuery = graphql(`
  query SearchContents_SearchNicovideo($sourceId: String!) {
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      sourceId
      video {
        id
        title
        ...VideoThumbnail
        ...Link_Video
        taggings(first: 3) {
          nodes {
            id
            tag {
              id
              ...Link_Tag
              ...CommonTag
            }
          }
        }
      }
    }
    findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
      ...Link_NicovideoRegistrationRequest
      id
      title
      sourceId
      thumbnailUrl
      requestedBy {
        id
        name
        ...Link_User
        ...UserIcon
      }
    }
  }
`);
const SearchNicovideo: React.FC<{
  className?: string;
  sourceId: string;
  size: "md";
  style?: React.CSSProperties;
}> = ({ className, sourceId, style, size }) => {
  const [{ data, fetching }] = useQuery({
    query: SearchNicovideoQuery,
    variables: { sourceId },
  });
  const openRequestFromNicovideo = useOpenRequestFromNicovideoWithID();

  return (
    <div
      style={style}
      className={clsx(className, "border-l-4 border-obsidian-lightest")}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "font-bold text-snow-darker",
            { md: "py-2 pl-4 text-sm" }[size]
          )}
        >
          ニコニコ動画の
          <span className={clsx("font-mono")}>{sourceId}</span>
          の検索
        </div>
        {fetching && (
          <div
            className={clsx("ml-2 flex items-center gap-x-2 text-snow-darkest")}
          >
            <Pictogram icon="loading" className={clsx("h-4")} />
            <div className={clsx("text-sm")}>検索中</div>
          </div>
        )}
      </div>
      <div>
        {data &&
          (data.findNicovideoVideoSource ? (
            <MadPageLink
              fragment={data.findNicovideoVideoSource.video}
              onClick={(e) => {
                e.currentTarget.blur();
              }}
              className={clsx(
                className,
                "group flex gap-x-4 p-2 hover:bg-vivid-primary"
              )}
            >
              <div className={clsx("shrink-0")}>
                <VideoThumbnail
                  className={clsx("h-18 w-36")}
                  imageSize="small"
                  fragment={data.findNicovideoVideoSource.video}
                />
              </div>
              <div className={clsx("flex grow flex-col justify-center")}>
                <div className={clsx("flex")}>
                  <p
                    className={clsx(
                      "text-xs text-snow-darkest group-hover:text-obsidian-primary"
                    )}
                  >
                    <span className={clsx("font-mono")}>
                      {data.findNicovideoVideoSource.sourceId}
                    </span>
                    は既に登録されています。
                  </p>
                </div>
                <div className={clsx("flex")}>
                  <p
                    className={clsx(
                      "text-sm font-bold text-snow-primary group-hover:text-obsidian-primary"
                    )}
                  >
                    {data.findNicovideoVideoSource.video.title}
                  </p>
                </div>
                <div className={clsx("mt-2 flex grow")}>
                  {data.findNicovideoVideoSource.video.taggings.nodes.length ===
                    0 && (
                    <p
                      className={clsx(
                        "text-xs text-snow-darkest group-hover:text-obsidian-primary"
                      )}
                    >
                      タグ付けがありません。
                    </p>
                  )}
                  <div className={clsx("flex flex-wrap gap-x-1")}>
                    {data.findNicovideoVideoSource.video.taggings.nodes.map(
                      (tagging) => (
                        <div key={tagging.id} className={clsx()}>
                          <CommonTag size="xs" fragment={tagging.tag} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </MadPageLink>
          ) : data.findNicovideoRegistrationRequest ? (
            <NicovideoRegistrationRequestLink
              className={clsx(
                className,
                "group flex gap-x-4 p-2 hover:bg-vivid-primary"
              )}
              fragment={data.findNicovideoRegistrationRequest}
              onClick={(e) => {
                e.currentTarget.blur();
              }}
            >
              <div className={clsx("shrink-0")}>
                <CoolImage
                  className={clsx("h-18 w-36")}
                  src={data.findNicovideoRegistrationRequest.thumbnailUrl}
                  alt={data.findNicovideoRegistrationRequest.sourceId}
                  width={196}
                  height={128}
                  unoptimized={true}
                />
              </div>
              <div className={clsx("flex grow flex-col justify-center")}>
                <div className={clsx("flex")}>
                  <p
                    className={clsx(
                      "text-xs text-snow-darkest group-hover:text-obsidian-primary"
                    )}
                  >
                    <span className={clsx("font-mono")}>
                      {data.findNicovideoRegistrationRequest.sourceId}
                    </span>
                    は既にリクエストされています。
                  </p>
                </div>
                <div className={clsx("flex")}>
                  <p
                    className={clsx(
                      "text-sm font-bold text-snow-primary group-hover:text-obsidian-primary"
                    )}
                  >
                    {data.findNicovideoRegistrationRequest.title}
                  </p>
                </div>
                <div className={clsx("mt-2 flex grow")}>
                  <UserIcon
                    size={24}
                    fragment={data.findNicovideoRegistrationRequest.requestedBy}
                  />
                  <div className={clsx("ml-1")}>
                    <span
                      className={clsx(
                        "text-xs text-snow-darker group-hover:text-obsidian-primary"
                      )}
                    >
                      {data.findNicovideoRegistrationRequest.requestedBy.name}
                    </span>
                  </div>
                </div>
              </div>
            </NicovideoRegistrationRequestLink>
          ) : (
            <div
              className={clsx(
                "group flex gap-x-4 p-2 px-4 hover:bg-vivid-primary"
              )}
              onClick={(e) => {
                e.currentTarget.blur();
                openRequestFromNicovideo(sourceId);
              }}
            >
              <div className={clsx("flex")}>
                <p
                  className={clsx(
                    "text-sm text-snow-darker group-hover:text-obsidian-primary"
                  )}
                >
                  <span className={clsx("font-mono")}>{sourceId}</span>
                  は登録もリクエストもされていません。
                  <span className="font-bold">リクエストしてみては？</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SearchNicovideo;
