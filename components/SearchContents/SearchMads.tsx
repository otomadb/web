import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { MadPageLink } from "~/app/[locale]/(application)/mads/[serial]/Link";
import { LoadingPictogram } from "~/components/Pictogram";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";

export const SearchMadsQuery = graphql(`
  query SearchContents_SearchMads($query: String!) {
    searchVideos(input: { query: $query, limit: 3 }) {
      items {
        title {
          title
        }
        video {
          id
          title
          ...VideoThumbnail
          ...Link_Video
        }
      }
    }
  }
`);
const SearchMads: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  size: "md";
  query: string;
}> = ({ className, style, size, query }) => {
  const [{ data, fetching }] = useQuery({
    query: SearchMadsQuery,
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
          MAD
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
          data.searchVideos.items.length === 0 ? (
            <div className={clsx("px-4 py-2 text-sm text-snow-darkest")}>
              ヒットなし
            </div>
          ) : (
            <div className={clsx("divide-y divide-obsidian-lighter")}>
              {data.searchVideos.items.map((item, i) => (
                <MadPageLink
                  key={i}
                  onClick={(e) => {
                    e.currentTarget.blur();
                  }}
                  tabIndex={0}
                  fragment={item.video}
                  className={clsx(
                    className,
                    "group flex items-center gap-x-4 p-2 hover:bg-vivid-primary"
                  )}
                >
                  <VideoThumbnail
                    className={clsx("h-16 w-32 shrink-0")}
                    imageSize="small"
                    fragment={item.video}
                  />
                  <div
                    className={clsx(
                      "flex grow flex-col justify-center gap-y-1 border-l border-l-obsidian-lighter px-2 py-1 group-hover:border-l-obsidian-darker"
                    )}
                  >
                    <div
                      className={clsx(
                        "text-sm font-bold text-snow-primary group-hover:text-obsidian-primary"
                      )}
                    >
                      {item.title.title}
                    </div>
                    <div
                      className={clsx(
                        "text-xs text-snow-darker group-hover:text-obsidian-primary"
                      )}
                    >
                      {item.video.title}
                    </div>
                  </div>
                </MadPageLink>
              ))}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};
export default SearchMads;
