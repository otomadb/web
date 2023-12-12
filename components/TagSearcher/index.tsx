"use client";

import clsx from "clsx";
import React, { ReactNode, useMemo, useState } from "react";
import { useQuery } from "urql";

import { FragmentType, graphql } from "~/gql";

import CommonTag, { CommonTagFragment } from "../CommonTag";
import SearchBox from "./SearchBox";

export type SimpleBehavior = {
  mode: "simple";
  handleSelect(
    id: string,
    fragment: FragmentType<typeof CommonTagFragment>
  ): void;
};

export type DisableIfSelectedBehavior = {
  mode: "if-selected-disable";
  isSelected: (id: string) => boolean;
  Selected: React.FC<{ Tag: ReactNode }>;
  NotSelected: React.FC<{ Tag: ReactNode }>;
  handleSelect(
    id: string,
    fragment: FragmentType<typeof CommonTagFragment>
  ): void;
};

export type AlwaysSelectableBehavior = {
  mode: "always-selectable";
  isSelected: (id: string) => boolean;
  Selected: React.FC<{ Tag: ReactNode }>;
  NotSelected: React.FC<{ Tag: ReactNode }>;
  handleSelect(
    id: string,
    selected: boolean,
    fragment: FragmentType<typeof CommonTagFragment>
  ): void;
};

export const Query = graphql(`
  query TagSearcher($query: String!, $limit: Int) {
    searchTags(input: { query: $query, limit: $limit }) {
      items {
        name {
          id
          name
          primary
        }
        tag {
          id
          ...CommonTag
        }
      }
    }
  }
`);

export default function TagSearcher({
  initQuery,
  className,
  style,
  size,
  limit,
  Additional,
  handleAdditionalClicked,
  showAdditional,
  behavior,
}: {
  className?: string;
  style?: React.CSSProperties;
  size: "small" | "medium" | "large";

  initQuery?: string;

  limit: number;
  disabled?: boolean;

  Additional?: React.FC<{ query: string }>;
  showAdditional?: (query: string) => boolean;
  handleAdditionalClicked?(query: string): void;

  behavior:
    | SimpleBehavior
    | DisableIfSelectedBehavior
    | AlwaysSelectableBehavior;
}) {
  const [q, setQuery] = useState<string>(initQuery ? initQuery : "");
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: q === "",
    variables: { query: q, limit },
  });
  const isShowAdditional = useMemo(() => {
    if (!data) return false;
    return showAdditional ? showAdditional(q) : true;
  }, [data, q, showAdditional]);

  return (
    <div className={clsx(className, ["group relative"])} style={style}>
      <SearchBox
        size={size}
        fetching={fetching}
        query={q}
        setQuery={(v) => setQuery(v)}
      />
      <div
        className={clsx(
          { hidden: q === "" },
          "invisible group-focus-within:visible",
          "border border-obsidian-primary bg-obsidian-darker",
          "absolute z-1 mt-[1px] w-full"
        )}
      >
        {data && (
          <>
            {0 === data.searchTags.items.length && (
              <div
                className={clsx(
                  {
                    small: ["py-1 px-2"],
                    medium: ["py-2 px-2"],
                    large: ["py-2 px-2"],
                  }[size],
                  "text-xs font-bold text-snow-darker"
                )}
              >
                該当候補はありません
              </div>
            )}
            {0 < data.searchTags.items.length && (
              <div
                role="listbox"
                className={clsx(
                  "flex flex-col items-stretch divide-y divide-obsidian-primary border border-obsidian-primary bg-obsidian-darker"
                )}
              >
                {data.searchTags.items.map((item, i) => (
                  <div
                    key={i}
                    tabIndex={0}
                    role="option"
                    aria-label={item.name.name}
                    aria-selected={
                      behavior.mode === "simple"
                        ? false
                        : behavior.mode === "if-selected-disable"
                          ? behavior.isSelected(item.tag.id)
                            ? undefined
                            : false
                          : behavior.isSelected(item.tag.id)
                            ? true
                            : false
                    }
                    onClick={(e) => {
                      const selected = e.currentTarget.ariaSelected;
                      if (selected === "undefined") return;

                      e.preventDefault();
                      e.currentTarget.blur();

                      switch (behavior.mode) {
                        case "always-selectable":
                          behavior.handleSelect(
                            item.tag.id,
                            selected === "true",
                            item.tag
                          );
                          break;
                        default:
                          behavior.handleSelect(item.tag.id, item.tag);
                      }
                    }}
                    className={clsx(
                      {
                        small: ["py-1 px-2 gap-y-0.5"],
                        medium: ["py-2 px-2 gap-y-1"],
                        large: ["py-2 px-2 gap-y-2"],
                      }[size],
                      "group/suggest flex flex-col items-start hover:bg-obsidian-primary"
                    )}
                  >
                    <div>
                      {behavior.mode === "simple" ? (
                        <CommonTag
                          className={clsx()}
                          size={size === "large" ? "small" : "xs"}
                          fragment={item.tag}
                        />
                      ) : (
                        <div
                          className={clsx(
                            "text-snow-primary",
                            {
                              small: "text-xs",
                              medium: "text-sm",
                              large: "text-sm",
                            }[size]
                          )}
                        >
                          {behavior.isSelected(item.tag.id) ? (
                            <behavior.Selected
                              Tag={
                                <CommonTag
                                  className={clsx()}
                                  size={size === "large" ? "small" : "xs"}
                                  fragment={item.tag}
                                />
                              }
                            />
                          ) : (
                            <behavior.NotSelected
                              Tag={
                                <CommonTag
                                  className={clsx()}
                                  size={size === "large" ? "small" : "xs"}
                                  fragment={item.tag}
                                />
                              }
                            />
                          )}
                        </div>
                      )}
                    </div>
                    {!item.name.primary && (
                      <div
                        className={clsx(
                          {
                            small: ["text-xxs"],
                            medium: ["text-xs"],
                            large: ["text-sm"],
                          }[size],
                          "italic text-slate-400"
                        )}
                      >
                        {item.name.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {Additional && isShowAdditional && (
          <div
            role="button"
            tabIndex={0}
            className={clsx(
              {
                small: ["py-1 px-2"],
                medium: ["py-2 px-2"],
                large: ["py-2 px-2"],
              }[size],
              "border-t border-obsidian-primary hover:bg-obsidian-primary",
              { "cursor-pointer": !!handleAdditionalClicked }
            )}
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
              if (handleAdditionalClicked) handleAdditionalClicked(q);
            }}
          >
            <Additional query={q} />
          </div>
        )}
      </div>
    </div>
  );
}
