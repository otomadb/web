"use client";

import "client-only";

import clsx from "clsx";

import { useHistory } from "../../context";
import { History } from "./Item";

export const HistorySection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const events = useHistory();
  if (!events) return <span>LOADING</span>;
  return (
    <section className={clsx(["flex-shrink-0"], ["flex-grow"], ["max-w-lg"])}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画情報の変移</h2>
      <div className={clsx(className, ["flex", "flex-col"], ["space-y-1"])}>
        {events.map((event) => (
          <History key={event.id} item={event} />
        ))}
      </div>
    </section>
  );
};
