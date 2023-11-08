"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import NicovideoRequestPageLink from "~/app/request/nicovideo/Link";
import { graphql } from "~/gql";

import { RequestsExists } from "./RequestsExists";
import { SourceExists } from "./SourceExists";

const NeitherExists: React.FC<{
  className?: string;
  sourceId: string;
}> = ({ className, sourceId }) => {
  return (
    <NicovideoRequestPageLink
      className={clsx(
        className,
        ["px-4"],
        ["py-2"],
        ["flex", ["gap-x-4"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
      sourceId={sourceId}
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
    </NicovideoRequestPageLink>
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
            <SourceExists fragment={data.findNicovideoVideoSource} />
          )}
          {!data.findNicovideoVideoSource &&
            data.findNicovideoRegistrationRequest && (
              <RequestsExists
                fragment={data.findNicovideoRegistrationRequest}
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
