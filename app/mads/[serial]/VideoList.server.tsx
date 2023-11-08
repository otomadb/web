import "server-only";

import clsx from "clsx";
import React from "react";

export const VideoList = async function <T extends { id: string }>({
  fetchItems,
  Video,
}: {
  fetchItems: Promise<{ items: T[] }>;
  Video: React.FC<{ fragment: T }>;
}) {
  const { items } = await fetchItems;
  return (
    <div className={clsx(["@container/videolist"])}>
      {items.length === 0 && <span>動画が存在しません。</span>}
      <div
        className={clsx(
          ["w-full"],
          [
            "grid",
            [
              "grid-cols-1",
              "@[384px]/videolist:grid-cols-2",
              "@[512px]/videolist:grid-cols-3",
              "@[768px]/videolist:grid-cols-4",
              "@[1024px]/videolist:grid-cols-6",
              "@[1536px]/videolist:grid-cols-8",
            ],
          ],
          ["gap-x-2", "@[768px]/videolist:gap-x-4"],
          ["gap-y-2", "@[768px]/videolist:gap-x-4"]
        )}
      >
        {items.map((item) => (
          <Video key={item.id} fragment={item} />
        ))}
      </div>
    </div>
  );
};
