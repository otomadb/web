import clsx from "clsx";
import React from "react";

import { LinkNicovideoRegistrationRequest as NicovideoRegistrationRequestPageLink } from "~/app/requests/nicovideo/[sourceId]/Link";
import { LinkUser as UserPageLink } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/CoolImage";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment HomePage_RecentNicovideoRequestsSection_RequestsListItem on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    title
    sourceId
    thumbnailUrl
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
  }
`);
export const ListItem: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, style, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", "flex-col"],
        ["bg-slate-50"],
        ["border", "border-slate-300"],
        ["rounded"]
      )}
      style={style}
    >
      <div>
        <NicovideoRegistrationRequestPageLink fragment={fragment}>
          <CoolImage
            className={clsx(["h-[128px]"])}
            src={fragment.thumbnailUrl}
            alt={fragment.sourceId}
            width={196}
            height={128}
          />
        </NicovideoRegistrationRequestPageLink>
      </div>
      <div className={clsx(["mt-1"], ["flex"])}>
        <NicovideoRegistrationRequestPageLink
          className={clsx([
            "text-sm",
            "font-bold",
            "text-slate-900",
            "line-clamp-2",
          ])}
          fragment={fragment}
        >
          {fragment.title}
        </NicovideoRegistrationRequestPageLink>
      </div>
      <div className={clsx(["mt-1"], ["flex"])}>
        <UserPageLink fragment={fragment.requestedBy}>
          <UserIcon size={24} fragment={fragment.requestedBy} />
        </UserPageLink>
        <div className={clsx(["ml-1"])}>
          <UserPageLink
            className={clsx(["text-xs", "text-slate-900"])}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.displayName}
          </UserPageLink>
        </div>
      </div>
    </div>
  );
};
