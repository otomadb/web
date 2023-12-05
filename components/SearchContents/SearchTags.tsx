"use client";
import "client-only";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { TagPageLink } from "~/app/(v2)/tags/[serial]/Link";
import CommonTag from "~/components/CommonTag";
import { LoadingPictogram } from "~/components/Pictogram";
import { graphql } from "~/gql";

export const SearchTagsQuery = graphql(`
  query SearchContents_SearchTags($query: String!) {
    searchTags(input: { query: $query, limit: 6 }) {
      items {
        name {
          name
        }
        tag {
          ...Link_Tag
          ...CommonTag
        }
      }
    }
  }
`);
const SearchTags: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  size: "md";
  query: string;
}> = ({ className, style, size, query }) => {
  const [{ data, fetching }] = useQuery({
    query: SearchTagsQuery,
    variables: { query },
  });

  return (
    <div
      style={style}
      className={clsx(className, "border-l-4 border-obsidian-lightest")}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "font-bold text-snow-darker",
            { md: "py-2 pl-4 text-sm" }[size]
          )}
        >
          タグ
        </div>
        {fetching && (
          <div
            className={clsx("ml-2 flex items-center gap-x-2 text-snow-darkest")}
          >
            <LoadingPictogram className={clsx("h-4")} />
            <div className={clsx("text-sm")}>検索中</div>
          </div>
        )}
      </div>
      <div>
        {data ? (
          data.searchTags.items.length === 0 ? (
            <div className={clsx("px-4 py-2")}>
              <p className={clsx("text-sm text-snow-darkest")}>ヒットなし</p>
            </div>
          ) : (
            <div className={clsx("divide-y divide-obsidian-lighter")}>
              {data.searchTags.items.map(({ tag, name }, i) => (
                <TagPageLink
                  key={i}
                  fragment={tag}
                  tabIndex={0}
                  className={clsx(
                    "group flex items-center gap-x-4 p-2 hover:bg-vivid-primary"
                  )}
                  onClick={(e) => {
                    e.currentTarget.blur();
                  }}
                >
                  <div className={clsx("w-48 shrink-0 px-2")}>
                    <div
                      className={clsx(
                        "text-xs text-snow-darker  group-hover:text-obsidian-darker"
                      )}
                    >
                      {name.name}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "flex grow flex-col justify-start border-l border-l-obsidian-lighter px-2 py-1 group-hover:border-l-obsidian-darker"
                    )}
                  >
                    <CommonTag
                      className={clsx()}
                      fragment={tag}
                      size="small"
                      hoverable={false}
                    />
                  </div>
                </TagPageLink>
              ))}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};
export default SearchTags;
