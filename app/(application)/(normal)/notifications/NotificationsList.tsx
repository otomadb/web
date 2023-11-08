"use client";

import clsx from "clsx";
import React, { useCallback, useState } from "react";

import NotificationsListBlock from "./NotificationsListBlock";

export default function NotificationsList({
  style,
  className,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [cursors, setCursors] = useState<string[]>([]);

  const pushCursor = useCallback(
    (cursor: string) => setCursors((cursors) => [...cursors, cursor]),
    []
  );

  return (
    <div style={style} className={clsx(className, ["flex", "flex-col"])}>
      <NotificationsListBlock after={null} pushCursor={pushCursor} />
      {cursors.map((cursor) => (
        <NotificationsListBlock
          key={cursor}
          after={cursor}
          pushCursor={pushCursor}
        />
      ))}
    </div>
  );
}
