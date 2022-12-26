"use client";
import "client-only";

import clsx from "clsx";
import React, { useId, useMemo } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { RegisterTag_FindSemitagsDocument } from "~/gql/graphql";

graphql(`
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

export const UnselectedRaw: React.FC<{
  className?: string;
  fetching: boolean;
  semitag: {
    id: string;
    name: string;
    video: { id: string; title: string };
  };
  selected: boolean;
  append?(): void;
  remove?(): void;
}> = ({ className, fetching, semitag, selected, append, remove }) => {
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
          checked={selected}
          onChange={(e) => {
            if (e.target.checked) append?.();
            else remove?.();
          }}
        />
      </div>
      <div className={clsx(["flex-grow"], ["grid", "grid-cols-2"])}>
        <label htmlFor={labelId} className={clsx(["px-2"], ["py-1"])}>
          <div className={clsx(["text-sm"])}>{semitag.name}</div>
        </label>
        <div className={clsx(["px-2"], ["py-1"])}>
          <div className={clsx(["text-sm"])}>{semitag.video.title}</div>
        </div>
      </div>
    </label>
  );
};

export const Semitags: React.FC<{
  className?: string;
  fields: {
    id: string;
    semitag: { id: string; name: string; video: { id: string; title: string } };
  }[];
  append(p: {
    semitag: { id: string; name: string; video: { id: string; title: string } };
  }): void;
  remove(index: number): void;
}> = ({ className, fields, append, remove }) => {
  const selectedIds = useMemo(
    () => fields.map(({ semitag }) => semitag.id),
    [fields]
  );
  const [{ data, fetching }] = useQuery({
    query: RegisterTag_FindSemitagsDocument,
    variables: { except: selectedIds },
    requestPolicy: "network-only",
  });

  return (
    <div className={clsx(className)}>
      <div className={clsx(["w-full"])}>
        <div className={clsx(["divide-y", "divide-slate-300"])}>
          {fields.map(({ id, semitag }, index) => (
            <UnselectedRaw
              className={clsx(["bg-teal-100", "hover:bg-blue-200"])}
              key={id}
              semitag={semitag}
              selected={true}
              remove={() => remove(index)}
              fetching={fetching}
            />
          ))}
        </div>
        <div
          className={clsx(
            0 < fields.length && ["border-t-2", "border-t-slate-300"],
            ["divide-y", "divide-slate-300"]
          )}
        >
          {data?.findSemitags.nodes.map((semitag) => (
            <UnselectedRaw
              className={clsx(["bg-white", "hover:bg-blue-200"])}
              key={semitag.id}
              semitag={semitag}
              selected={false}
              append={() => append({ semitag })}
              fetching={fetching}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
