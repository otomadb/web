"use client";

import "client-only";

import clsx from "clsx";
import { useContext } from "react";

import { UpdateableContext } from "./context";
import { History } from "./HistoryItem";

export const HistorySection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { history } = useContext(UpdateableContext);
  return (
    <div className={clsx(className, ["flex", "flex-col"], ["space-y-2"])}>
      {history.map((item) => (
        <History key={item.id} item={item} />
      ))}
    </div>
  );
};
