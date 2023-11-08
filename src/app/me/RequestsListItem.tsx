import clsx from "clsx";
import React, { ReactNode } from "react";

import { CoolImage2 } from "~/components/CoolImage";
import UserDisplayNameLink from "~/components/UserLink/UserDisplayNameLink";
import UserIconLink from "~/components/UserLink/UserIconLink";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment MyTopPage_RequestsListItem on RegistrationRequest {
    title
    thumbnailUrl
    requestedBy {
      ...UserIconLink
      ...UserDisplayNameLink
    }
  }
`);
export default function ListItem({
  className,
  style,
  PageLink,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
  PageLink: React.FC<{ children: ReactNode; className?: string }>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, [
        "flex flex-col rounded border border-slate-800 bg-slate-900 p-2",
      ])}
      style={style}
    >
      <PageLink>
        <CoolImage2
          className={clsx("h-[128px]")}
          alt={fragment.title}
          src={fragment.thumbnailUrl}
          width={196}
          height={128}
          unoptimized={true}
        />
      </PageLink>
      <div className={clsx("mt-1 flex")}>
        <PageLink
          className={clsx([
            "text-sm",
            "font-bold",
            "text-slate-300",
            "line-clamp-2",
          ])}
        >
          {fragment.title}
        </PageLink>
      </div>
      <div className={clsx("mt-1 flex items-center")}>
        <UserIconLink size="small" fragment={fragment.requestedBy} />
        <UserDisplayNameLink
          className={clsx("ml-1 text-xxs text-slate-400")}
          fragment={fragment.requestedBy}
        />
      </div>
    </div>
  );
}
