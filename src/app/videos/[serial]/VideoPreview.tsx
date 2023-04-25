"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment VideoPageLayout_DetailsSection_VideoPreview on Video {
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
  }
`);
export const Image = ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);
  const [thumbnail, setThumbnail] = useState<
    "ORIGINAL" | ["NICOVIDEO", string] | ["YOUTUBE", string]
  >("ORIGINAL");

  return (
    <div className={clsx(className, ["flex"])}>
      <div className={clsx(["w-[256px]"], ["flex", "flex-col"])}>
        <button
          type="button"
          onClick={() => setThumbnail("ORIGINAL")}
          className={clsx(
            ["hover:bg-blue-200"],
            ["px-2", "py-3"],
            ["flex", "flex-col", "items-start"]
          )}
        >
          <span className={clsx(["text-sm", "text-slate-700", "font-mono"])}>
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
              ["hover:bg-blue-200"],
              ["px-2", "py-2"],
              ["flex", "flex-col", "items-start"]
            )}
          >
            <span className={clsx(["text-sm", "text-slate-700"])}>
              ニコニコ動画
            </span>
            <span className={clsx(["text-xs", "text-slate-500", "font-mono"])}>
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
              ["hover:bg-blue-200"],
              ["px-1", "py-1"],
              ["flex", "flex-col", "items-start"]
            )}
          >
            <span className={clsx(["text-xs", "text-slate-700"])}>Youtube</span>
            <span className={clsx(["text-xxs", "text-slate-500", "font-mono"])}>
              {source.sourceId}
            </span>
          </a>
        ))}
      </div>
      <div className={clsx(["flex"])}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx({ hidden: thumbnail !== "ORIGINAL" }, [
            "w-96",
            "h-48",
          ])}
          width={384}
          height={192}
        />
        {fragment.nicovideoSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx(
              {
                hidden: !(
                  Array.isArray(thumbnail) &&
                  thumbnail[0] === "NICOVIDEO" &&
                  thumbnail[1] === source.id
                ),
              },
              ["w-96", "h-48"]
            )}
            src={source.embedUrl}
          />
        ))}
        {fragment.youtubeSources.map((source) => (
          <iframe
            key={source.id}
            width="384"
            height="192"
            className={clsx(
              {
                hidden: !(
                  Array.isArray(thumbnail) &&
                  thumbnail[0] === "YOUTUBE" &&
                  thumbnail[1] === source.id
                ),
              },
              ["w-96", "h-48"]
            )}
            src={source.embedUrl}
          />
        ))}
      </div>
    </div>
  );
};
