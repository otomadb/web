"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

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
  fragment?: FragmentType<typeof Fragment>;
  selectings: string[];
  append(p: { id: string; name: string }): void;
  remove(id: string): void;
}> = ({ className, style, selectings, append, remove, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const selecteds = useMemo(() => {
    return fragment?.findSemitags.nodes
      .filter(({ id }) => selectings.includes(id))
      .map((semitag) => ({
        id: semitag.id,
        name: semitag.name,
        video: semitag.video,
      }));
  }, [fragment?.findSemitags.nodes, selectings]);
  const semitags = useMemo(() => {
    return fragment?.findSemitags.nodes.map((semitag) => ({
      id: semitag.id,
      name: semitag.name,
      video: semitag.video,
      isSelected: selectings.includes(semitag.id),
    }));
  }, [fragment?.findSemitags.nodes, selectings]);

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
            ["bg-slate-950"]
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
                ["divide-y", "divide-slate-800"],
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
                    remove(id);
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
            ["bg-slate-950"]
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
                ["divide-y", "divide-slate-800"],
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
                      remove(id);
                    } else {
                      append({ id, name });
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
