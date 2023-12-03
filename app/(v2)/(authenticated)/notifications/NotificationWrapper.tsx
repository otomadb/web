"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import DateTime2 from "~/components/DateTime2";
import { FragmentType, graphql, useFragment } from "~/gql";

export const NotificationWrapperWrapper = graphql(`
  fragment NotificationsPage_NotificationWrapper on Notification {
    watched
    createdAt
  }
`);
export default function NotificationWrapper({
  className,
  style,
  Icon,
  Title,
  children,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof NotificationWrapperWrapper>;
  Icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  Title: React.FC<{ className?: string; style?: React.CSSProperties }>;
  children: ReactNode;
}) {
  const { createdAt } = useFragment(NotificationWrapperWrapper, props.fragment);

  return (
    <div
      style={style}
      className={clsx(
        className,
        "flex w-full flex-col gap-y-2 rounded border border-obsidian-lighter bg-obsidian-primary px-4 py-2"
      )}
    >
      <div className={clsx("flex items-center gap-x-2")}>
        <Icon className={clsx("h-4 w-4")} />
        <Title className={clsx("grow text-sm text-snow-primary")} />
        <DateTime2
          date={createdAt}
          className={clsx("shrink-0 font-mono text-xs text-snow-darkest")}
        />
      </div>
      {children}
    </div>
  );
}
