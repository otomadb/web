"use client";

import clsx from "clsx";
import { useReducer } from "react";

import TimelineSegment from "./TimelineSegment";

export const useTimeline = ({ skip, take }: { skip: number; take: number }) =>
  useReducer(
    (prev: { skip: number; take: number }[]) => {
      const latest = prev[prev.length - 1];
      return [...prev, { skip: latest.skip + latest.take, take: latest.take }];
    },
    [{ skip, take }]
  );

export default function Timeline({ className }: { className?: string }) {
  const [segments, fetchMore] = useTimeline({ skip: 0, take: 20 });

  return (
    <div
      className={clsx(className, [
        "flex flex-col items-stretch gap-y-2 bg-background-deeper p-4",
      ])}
    >
      {segments.map(({ skip, take }, i, { length }) => (
        <TimelineSegment
          key={`${skip}-${take}`}
          skip={skip}
          take={take}
          fetchMore={i === length - 1 ? fetchMore : undefined}
        />
      ))}
    </div>
  );
}
