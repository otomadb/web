"use client";

import "client-only";

import clsx from "clsx";
import copy from "copy-to-clipboard";
import React, { useMemo } from "react";

import { CheckIcon, CopyIcon } from "~/components/Icons";
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
                <div
                  role="button"
                  key={id}
                  className={clsx(
                    ["px-8", "py-2"],
                    ["flex", "items-center", "gap-x-8"],
                    ["bg-slate-950", "hover:bg-sky-900"]
                  )}
                >
                  <div
                    role="button"
                    className={clsx(
                      ["flex", "justify-center", "items-center"],
                      ["px-1", "py-1"],
                      ["text-sm", ["text-sky-300", "hover:text-sky-200"]],
                      [
                        "rounded",
                        "border",
                        ["border-sky-800", "hover:border-sky-700"],
                      ],
                      ["text-sm", ["text-sky-300", "hover:text-sky-200"]],
                      ["bg-sky-900", "hover:bg-sky-800"]
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      remove(id);
                    }}
                  >
                    <CheckIcon className={clsx(["w-4", "h-4"])} />
                  </div>
                  <div className={clsx(["flex-grow"], ["flex"])}>
                    <div
                      className={clsx(
                        ["flex-grow"],
                        ["text-sm", "text-slate-300", "text-left"]
                      )}
                    >
                      {name}
                    </div>
                    <div
                      className={clsx([
                        "flex",
                        "justify-center",
                        "items-center",
                      ])}
                    >
                      <div
                        role="button"
                        onClick={() => {
                          copy(name);
                        }}
                        className={clsx(
                          ["px-1", "py-0.5"],
                          [
                            "rounded",
                            "border",
                            ["border-sky-800", "hover:border-sky-700"],
                          ],
                          ["text-sm", ["text-sky-300", "hover:text-sky-200"]],
                          ["bg-sky-900", "hover:bg-sky-800"]
                        )}
                      >
                        <CopyIcon className={clsx(["w-4", "h-4"])} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      ["w-2/5", "flex-shrink-0"],
                      ["text-sm", "text-slate-300", "text-left"]
                    )}
                  >
                    {video.title}
                  </div>
                </div>
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
                <div
                  key={id}
                  className={clsx(
                    ["px-8", "py-2"],
                    ["flex", "items-center", "gap-x-8"],
                    !selected && ["bg-slate-950", "hover:bg-sky-950"],
                    selected && ["bg-sky-950"]
                  )}
                >
                  <div
                    role="button"
                    className={clsx(
                      ["flex", "justify-center", "items-center"],
                      ["px-1", "py-1"],
                      [
                        "text-sm",
                        !selected && ["text-sky-300", "hover:text-sky-200"],
                        selected && ["text-sky-300", "hover:text-sky-200"],
                      ],
                      [
                        "rounded",
                        "border",
                        !selected && ["border-sky-900", "hover:border-sky-700"],
                        selected && ["border-sky-800", "hover:border-sky-700"],
                      ],
                      ["text-sm", ["text-sky-300", "hover:text-sky-200"]],
                      [
                        !selected && ["bg-transparent", "hover:bg-sky-900"],
                        selected && ["bg-sky-900", "hover:bg-sky-800"],
                      ]
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      if (selected) remove(id);
                      else append({ id, name });
                    }}
                  >
                    {selected && <CheckIcon className={clsx(["w-4", "h-4"])} />}
                    {!selected && <div className={clsx(["w-4", "h-4"])} />}
                  </div>
                  <div
                    className={clsx(
                      ["flex-grow"],
                      [
                        "text-sm",
                        {
                          "text-slate-300": !selected,
                          "text-sky-300": selected,
                        },
                        "text-left",
                        { "font-bold": selected },
                      ]
                    )}
                  >
                    {name}
                  </div>
                  <div
                    className={clsx(
                      ["w-2/5", "flex-shrink-0"],
                      [
                        "text-sm",
                        {
                          "text-slate-300": !selected,
                          "text-sky-300": selected,
                        },
                        "text-left",
                        { "font-bold": selected },
                      ]
                    )}
                  >
                    {video.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
