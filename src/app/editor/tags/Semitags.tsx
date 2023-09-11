"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

import { FragmentType, graphql, useFragment } from "~/gql";

import { FormSchema } from "./FormSchema";

export const Fragment = graphql(`
  fragment EditorTagsPage_Form_Semitags on Query {
    findSemitags(checked: false) {
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
export const Semitags: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fields: FieldArrayWithId<FormSchema, "resolveSemitags", "id">[];
  append: UseFieldArrayAppend<FormSchema, "resolveSemitags">;
  remove: UseFieldArrayRemove;
  setTemporaryPrimaryTitle(name: string): void;
  fragment?: FragmentType<typeof Fragment>;
}> = ({
  className,
  style,
  fields,
  append,
  remove,
  setTemporaryPrimaryTitle,
  ...props
}) => {
  const fragment = useFragment(Fragment, props.fragment);
  const removeById = useCallback(
    (id: string) => {
      console.dir(fields);
      remove(fields.findIndex((field) => field.semitagId === id));
    },
    [fields, remove]
  );
  const selectedIds = useMemo(
    () => fields.map(({ semitagId }) => semitagId),
    [fields]
  );
  const selecteds = useMemo(() => {
    return fragment?.findSemitags.nodes
      .filter(({ id }) => selectedIds.includes(id))
      .map((semitag) => ({
        id: semitag.id,
        name: semitag.name,
        video: semitag.video,
      }));
  }, [fragment?.findSemitags.nodes, selectedIds]);
  const semitags = useMemo(() => {
    return fragment?.findSemitags.nodes.map((semitag) => ({
      id: semitag.id,
      name: semitag.name,
      video: semitag.video,
      isSelected: selectedIds.includes(semitag.id),
    }));
  }, [fragment?.findSemitags.nodes, selectedIds]);

  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col", "gap-y-4"],
        [["px-4"], ["py-4"]],
        ["border", "border-slate-700", "rounded"],
        ["bg-slate-900"]
      )}
      style={style}
    >
      <div className={clsx(["flex-shrink-0"], ["flex", "flex-col"])}>
        <div className={clsx(["px-2"])}>
          <div className={clsx(["text-xs", "text-slate-400"])}>
            選択中の仮タグ
          </div>
        </div>
        <div
          className={clsx(
            ["mt-2"],
            ["h-[196px]"],
            ["overflow-y-scroll"],
            ["border", "border-slate-700"],
            ["bg-slate-800"]
          )}
        >
          {!selecteds && (
            // TODO: Loading animation
            <div className={clsx(["px-4", "py-4"])}>
              <div className={clsx(["text-sm", "text-slate-400"])}>
                Fetching
              </div>
            </div>
          )}
          {selecteds && (
            <div
              className={clsx(
                ["divide-y", "divide-slate-700"],
                ["flex", "flex-col"]
              )}
            >
              {selecteds.map(({ id, name, video }) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    ["px-4", "py-2"],
                    ["grid", "grid-cols-2", "gap-x-2"],
                    ["bg-slate-950", "hover:bg-sky-900"]
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    removeById(id);
                  }}
                >
                  <div
                    className={clsx(["text-sm", "text-slate-300", "text-left"])}
                  >
                    {name}
                  </div>
                  <div
                    className={clsx(["text-sm", "text-slate-300", "text-left"])}
                  >
                    {video.title}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          ["flex", "flex-col"],
          ["overflow-y-hidden"]
        )}
      >
        <div className={clsx(["px-2"])}>
          <div className={clsx(["text-xs", "text-slate-400"])}>
            仮タグを選択
          </div>
        </div>
        <div
          className={clsx(
            ["mt-2"],
            ["h-full"],
            ["overflow-y-scroll"],
            ["border", "border-slate-700"],
            ["bg-slate-800"]
          )}
        >
          {!semitags && (
            // TODO: Loading animation
            <div className={clsx(["px-4", "py-4"])}>
              <div className={clsx(["text-sm", "text-slate-400"])}>
                Fetching
              </div>
            </div>
          )}
          {semitags && (
            <div
              className={clsx(
                ["divide-y", "divide-slate-700"],
                ["flex", "flex-col"]
              )}
            >
              {semitags.map(({ id, name, video, isSelected: selected }) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    ["px-4", "py-2"],
                    ["grid", "grid-cols-2", "gap-x-2"],
                    !selected && ["bg-slate-950", "hover:bg-sky-900"],
                    selected && ["bg-sky-700"]
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (selected) {
                      removeById(id);
                    } else {
                      append({ semitagId: id });
                      setTemporaryPrimaryTitle(name);
                    }
                  }}
                >
                  <div
                    className={clsx([
                      "text-sm",
                      {
                        "text-slate-300": !selected,
                        "text-sky-300": selected,
                      },
                      "text-left",
                      { "font-bold": selected },
                    ])}
                  >
                    {name}
                  </div>
                  <div
                    className={clsx([
                      "text-sm",
                      {
                        "text-slate-300": !selected,
                        "text-sky-300": selected,
                      },
                      "text-left",
                      { "font-bold": selected },
                    ])}
                  >
                    {video.title}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
