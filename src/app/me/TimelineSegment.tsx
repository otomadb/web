"use client";
import clsx from "clsx";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import TimelineEvent from "./TimelineEvent";

export const Query = graphql(`
  query MyTopPage_TimelineSegment($skip: Int!, $take: Int!) {
    showTimeline(input: { skip: $skip, take: $take }) {
      ...MyTopPage_TimelineSegment_TimelineEvent
    }
  }
`);

export default function TimelineSegment({
  className,
  style,
  skip,
  take,
  fetchMore,
}: {
  className?: string;
  style?: React.CSSProperties;
  skip: number;
  take: number;
  fetchMore?(): void;
}) {
  const [{ data, fetching }] = useQuery({
    query: Query,
    variables: { skip, take },
  });

  return (
    <div
      className={clsx(className, "flex flex-col items-stretch")}
      style={style}
    >
      {fetching && (
        <div className={clsx("px-4 py-2 text-center text-text-muted")}>
          タイムラインを取得中です
        </div>
      )}
      <div className={clsx("flex flex-col gap-y-2")}>
        {data?.showTimeline.map((event, i) => (
          <TimelineEvent fragment={event} key={i} />
        ))}
      </div>
      {!fetching && fetchMore && data?.showTimeline.length === take && (
        <button
          className={clsx([
            "mt-2 w-full rounded bg-background-shallower px-4 py-2 text-center",
          ])}
          onClick={() => {
            fetchMore();
          }}
        >
          <span className={clsx("font-bold text-accent-primary")}>
            もっと見る
          </span>
        </button>
      )}
    </div>
  );
}
