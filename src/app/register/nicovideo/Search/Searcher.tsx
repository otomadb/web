/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import "client-only";

import clsx from "clsx";
import ky from "ky";
import React, { useContext, useMemo, useState } from "react";
import useSWR from "swr";

import { FormContext } from "../FormContext";
import { CandidateTag } from "./CandidateTag";

type Source = {
  id: string;
  title: string;
  tags: { value: string }[];
  watchUrl: string;
  uploadedAt: Date;
  thumbnailUrl: { original: string; large: string };
};

export const Searcher: React.FC<{
  className?: string;
}> = ({ className }) => {
  const {
    clearTags,
    changePrimaryTitle,
    changePrimaryThumbnail,
    changeNiconicoId,
  } = useContext(FormContext);
  const [source, setSource] = useState<Source | null>(null);

  const [nicovideoId, setNicovideoId] = useState("");
  const isValidId = useMemo(() => /(sm)\d+/.test(nicovideoId), [nicovideoId]);

  useSWR(
    isValidId ? nicovideoId : null,
    async (id) => {
      const res = await ky.get(`https://nicovideo-gti-proxy.deno.dev/${id}`);
      if (res.ok)
        return res.json<{
          id: string;
          title: string;
          tags: { value: string }[];
          watch_url: string;
          uploaded_at: string;
          thumbnail_url: { original: string; large: string };
        }>();
      else return null;
    },
    {
      dedupingInterval: 0,
      onSuccess(data) {
        if (!data) {
          setSource(null);
          return;
        }
        const { id, tags, title, uploaded_at, watch_url, thumbnail_url } = data;
        setSource({
          id,
          tags,
          thumbnailUrl: thumbnail_url,
          title,
          uploadedAt: new Date(uploaded_at),
          watchUrl: watch_url,
        });
        changeNiconicoId(id);
        changePrimaryTitle(title);
      },
      onError() {
        setSource(null);
      },
    }
  );

  return (
    <div className={clsx(className, [])}>
      <div className={clsx(className)}>
        <input
          className={clsx(
            ["font-mono"],
            [["px-1"], ["py-0.5"]],
            ["border"],
            ["bg-slate-50"],
            ["text-sm"]
          )}
          value={nicovideoId}
          onChange={(e) => {
            setNicovideoId(e.target.value);
            clearTags();
            changePrimaryTitle(null);
            changePrimaryThumbnail(null);
          }}
        ></input>
      </div>
      {source && <SourceDetails className={clsx(["mt-4"])} source={source} />}
      {isValidId && !source && (
        <div>
          <p className={clsx(["text-sm"], ["text-slate-700"])}>
            動画IDに対して動画が存在しない可能性
          </p>
        </div>
      )}
    </div>
  );
};

export const SourceDetails: React.FC<{
  className?: string;
  source: Source;
}> = ({ className, source }) => {
  const { changePrimaryThumbnail } = useContext(FormContext);

  return (
    <div className={clsx(className)}>
      <div>
        <div className={clsx(["text-slate-700"], ["text-sm"])}>Title</div>
        <div className={clsx(["mt-2"], ["px-2"], ["text-slate-900"])}>
          {source.title}
        </div>
      </div>
      <div className={clsx(["mt-4"])}>
        <div className={clsx(["text-slate-700"], ["text-sm"])}>Tags</div>
        <div className={clsx(["mt-2"], ["space-y-2"], ["flex"], ["flex-col"])}>
          {source.tags.map(({ value }, i) => (
            <CandidateTag key={value} tag={value} />
          ))}
        </div>
      </div>
      <div className={clsx(["mt-4"])}>
        <div className={clsx(["text-slate-700"], ["text-sm"])}>Thumbnails</div>
        <div className={clsx(["px-2"], ["mt-2"], ["grid"], ["grid-cols-3"])}>
          <div>
            <span className={clsx(["text-xs"])}>original</span>
            <button
              className={clsx(["block"], ["mt-2"])}
              onClick={() => {
                changePrimaryThumbnail(source.thumbnailUrl.original);
              }}
            >
              <img src={source.thumbnailUrl.original}></img>
            </button>
          </div>
          <div>
            <span className={clsx(["text-xs"])}>large</span>
            <button
              className={clsx(["block"], ["mt-2"])}
              onClick={() => {
                changePrimaryThumbnail(source.thumbnailUrl.large);
              }}
            >
              <img src={source.thumbnailUrl.large}></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
