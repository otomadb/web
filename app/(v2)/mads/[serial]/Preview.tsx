"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const mkBilibiliAutoplayDisabled = (baseUrl: string) => {
  const url = new URL(baseUrl);
  url.searchParams.set("autoplay", "0");
  return url.toString();
};

export const Fragment = graphql(`
  fragment MadPageLayout_Preview on Video {
    ...VideoThumbnail
    nicovideoSources {
      id
      sourceId
      url
      embedUrl
    }
    youtubeSources {
      id
      sourceId
      url
      embedUrl
    }
    soundcloudSources {
      id
      sourceId
      url
      embedUrl
    }
    bilibiliSources {
      id
      sourceId
      url
      embedUrl
    }
  }
`);
export default function Preview({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const [thumbnail, setThumbnail] = useState<
    | "ORIGINAL"
    | ["NICOVIDEO", string]
    | ["YOUTUBE", string]
    | ["SOUNDCLOUD", string]
    | ["BILIBILI", string]
  >("ORIGINAL");

  return (
    <div className={clsx(className, ["flex"])}>
      <div className={clsx(["w-[256px]"], ["flex flex-col"])}>
        <button
          type="button"
          onClick={() => setThumbnail("ORIGINAL")}
          className={clsx(
            "group flex flex-col items-start px-2 py-3 hover:bg-vivid-primary"
          )}
        >
          <span
            className={clsx(
              "text-sm text-snow-darker group-hover:text-obsidian-primary"
            )}
          >
            オリジナル
          </span>
        </button>
        {fragment.nicovideoSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            onClick={(e) => {
              e.preventDefault();
              setThumbnail(["NICOVIDEO", source.id]);
            }}
            className={clsx(
              "group flex flex-col items-start p-2 hover:bg-vivid-primary"
            )}
          >
            <span
              className={clsx(
                "text-sm text-snow-darker group-hover:text-obsidian-primary"
              )}
            >
              ニコニコ動画
            </span>
            <span
              className={clsx(
                "font-mono text-xs text-snow-darkest group-hover:text-obsidian-primary"
              )}
            >
              {source.sourceId}
            </span>
          </a>
        ))}
        {fragment.youtubeSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            onClick={(e) => {
              e.preventDefault();
              setThumbnail(["YOUTUBE", source.id]);
            }}
            className={clsx(
              "group flex flex-col items-start p-1 hover:bg-vivid-primary"
            )}
          >
            <span
              className={clsx(
                "text-xs text-snow-darker group-hover:text-obsidian-primary"
              )}
            >
              Youtube
            </span>
            <span
              className={clsx(
                "font-mono text-xxs text-snow-darkest group-hover:text-obsidian-primary"
              )}
            >
              {source.sourceId}
            </span>
          </a>
        ))}
        {fragment.soundcloudSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            onClick={(e) => {
              e.preventDefault();
              setThumbnail(["SOUNDCLOUD", source.id]);
            }}
            className={clsx(
              "group flex flex-col items-start p-1 hover:bg-vivid-primary"
            )}
          >
            <span
              className={clsx(
                "text-xs text-snow-darker group-hover:text-obsidian-primary"
              )}
            >
              Soundcloud
            </span>
            <span
              className={clsx(
                "font-mono text-xxs text-snow-darkest group-hover:text-obsidian-primary"
              )}
            >
              {source.url}
            </span>
          </a>
        ))}
        {fragment.bilibiliSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            onClick={(e) => {
              e.preventDefault();
              setThumbnail(["BILIBILI", source.id]);
            }}
            className={clsx(
              "group flex flex-col items-start p-1 hover:bg-vivid-primary"
            )}
          >
            <span
              className={clsx(
                "text-xs text-snow-darker group-hover:text-obsidian-primary"
              )}
            >
              Bilibili
            </span>
            <span
              className={clsx(
                "font-mono text-xxs text-snow-darkest group-hover:text-obsidian-primary"
              )}
            >
              {source.sourceId}
            </span>
          </a>
        ))}
      </div>
      <div className={clsx(["flex"])}>
        <VideoThumbnail
          fragment={fragment}
          imageSize="large"
          className={clsx("h-[192px] w-[384px]", {
            hidden: thumbnail !== "ORIGINAL",
          })}
        />
        {fragment.nicovideoSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx("h-[192px] w-[384px]", {
              hidden: !(
                Array.isArray(thumbnail) &&
                thumbnail[0] === "NICOVIDEO" &&
                thumbnail[1] === source.id
              ),
            })}
            src={source.embedUrl}
          />
        ))}
        {fragment.youtubeSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx("h-[192px] w-[384px]", {
              hidden: !(
                Array.isArray(thumbnail) &&
                thumbnail[0] === "YOUTUBE" &&
                thumbnail[1] === source.id
              ),
            })}
            src={source.embedUrl}
          />
        ))}
        {fragment.soundcloudSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx("h-[192px] w-[384px]", {
              hidden: !(
                Array.isArray(thumbnail) &&
                thumbnail[0] === "SOUNDCLOUD" &&
                thumbnail[1] === source.id
              ),
            })}
            src={source.embedUrl}
          />
        ))}
        {fragment.bilibiliSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx("h-[192px] w-[384px]", {
              hidden: !(
                Array.isArray(thumbnail) &&
                thumbnail[0] === "BILIBILI" &&
                thumbnail[1] === source.id
              ),
            })}
            src={mkBilibiliAutoplayDisabled(source.embedUrl)}
          />
        ))}
      </div>
    </div>
  );
}
