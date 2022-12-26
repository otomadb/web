"use client";
import "client-only";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useId, useMemo } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import {
  RegisterTag_FindSemitagsDocument,
  RegisterTag_GetSemitagDocument,
} from "~/gql/graphql";

graphql(`
  query RegisterTag_GetSemitag($id: ID!) {
    semitag(id: $id) {
      id
      name
      video {
        id
        title
      }
    }
  }

  query RegisterTag_FindSemitags($except: [ID!]!) {
    findSemitags(input: { limit: 30, except: $except, resolved: false }) {
      nodes {
        id
        name
        video {
          id
          title
        }
      }
    }
  }
`);

export const SelectedRaw: React.FC<{
  className?: string;
  fetching: boolean;
  semitagId: string;
  remove(): void;
}> = ({ className, fetching, semitagId, remove }) => {
  const labelId = useId();
  const [{ data }] = useQuery({
    query: RegisterTag_GetSemitagDocument,
    variables: { id: semitagId },
  });

  return (
    <label
      className={clsx(className, ["group/raw"], ["flex"])}
      htmlFor={labelId}
    >
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex", "justify-center"],
          ["px-4"]
        )}
      >
        <input
          id={labelId}
          type={"checkbox"}
          disabled={fetching}
          checked={true}
          onChange={(e) => {
            if (!e.target.checked) remove();
          }}
        />
      </div>
      <div className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}>
        {data && (
          <>
            <label htmlFor={labelId} className={clsx(["px-2"], ["py-1"])}>
              <div className={clsx(["text-xs"])}>{data.semitag.name}</div>
            </label>
            <div className={clsx(["px-2"], ["py-1"])}>
              <div className={clsx(["text-xs"])}>
                {data.semitag.video.title}
              </div>
            </div>
          </>
        )}
      </div>
    </label>
  );
};

export const UnselectedRaw: React.FC<{
  className?: string;
  fetching: boolean;
  append(): void;
  semitag: {
    id: string;
    name: string;
    video: { id: string; title: string };
  };
}> = ({ className, fetching, semitag, append }) => {
  const labelId = useId();

  return (
    <label
      className={clsx(className, ["group/raw"], ["flex"])}
      htmlFor={labelId}
    >
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex", "justify-center"],
          ["px-4"]
        )}
      >
        <input
          id={labelId}
          type={"checkbox"}
          disabled={fetching}
          checked={false}
          onChange={(e) => {
            if (e.target.checked) append();
          }}
        />
      </div>
      <div className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}>
        <label htmlFor={labelId} className={clsx(["px-2"], ["py-1"])}>
          <div className={clsx(["text-xs"])}>{semitag.name}</div>
        </label>
        <div className={clsx(["px-2"], ["py-1"])}>
          <div className={clsx(["text-xs"])}>{semitag.video.title}</div>
        </div>
      </div>
    </label>
  );
};

export const Semitags: React.FC<{
  className?: string;
  fields: { id: string; semitagId: string }[];
  append(p: { semitagId: string; name: string }): void;
  remove(index: number): void;
}> = ({ className, fields, append, remove }) => {
  const selectedIds = useMemo(
    () => fields.map(({ semitagId }) => semitagId),
    [fields]
  );
  const [{ data, fetching }, refetch] = useQuery({
    query: RegisterTag_FindSemitagsDocument,
    variables: { except: selectedIds },
    requestPolicy: "network-only",
  });
  useEffect(() => refetch(), [fields, refetch]);

  return (
    <div className={clsx(className)}>
      <div className={clsx(["flex"], ["w-full"])}>
        <div className={clsx(["flex-grow"])}>既存の仮タグ</div>
        <div className={clsx(["flex-shrkink-0"], ["flex"], ["px-2"])}>
          <button type="button" onClick={() => refetch()}>
            <ArrowPathIcon className={clsx(["w-6"], ["h-6"])} />
          </button>
        </div>
      </div>
      <div className={clsx(["mt-2"], ["w-full"])}>
        <div
          className={clsx(
            ["divide-y", "divide-slate-300"],
            ["max-h-[18rem]"],
            ["overflow-y-scroll"]
          )}
        >
          {fields.map(({ id, semitagId }, index) => (
            <SelectedRaw
              className={clsx(["bg-teal-100", "hover:bg-blue-200"])}
              key={id}
              semitagId={semitagId}
              remove={() => remove(index)}
              fetching={fetching}
            />
          ))}
        </div>
        <div
          className={clsx(
            0 < fields.length && ["border-t-4", "border-t-slate-300"],
            ["divide-y", "divide-slate-300"],
            ["h-72"],
            ["overflow-y-scroll"],
            ["bg-slate-300"]
          )}
        >
          {data?.findSemitags.nodes.map((semitag) => (
            <UnselectedRaw
              className={clsx(["bg-white", "hover:bg-blue-200"])}
              key={semitag.id}
              semitag={semitag}
              append={() =>
                append({ semitagId: semitag.id, name: semitag.name })
              }
              fetching={fetching}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
