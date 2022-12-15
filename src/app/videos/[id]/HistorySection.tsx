"use client";

import "client-only";

import clsx from "clsx";

import { useHistory } from "./context";
import { History } from "./HistoryItem";

export const HistorySection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const events = useHistory();
  if (!events) return <span>LOADING</span>;
  return (
    <div className={clsx(className, ["flex", "flex-col"], ["space-y-1"])}>
      {events.map((event) => (
        <History key={event.id} item={event} />
      ))}
    </div>
  );
};
