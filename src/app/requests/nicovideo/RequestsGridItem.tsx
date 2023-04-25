"use client";
import clsx from "clsx";
import { useQuery } from "urql";

import { NicovideoRegisterPageLink } from "~/app/editor/nicovideo/Link";
import { LinkUser as UserLink } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/CoolImage";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkNicovideoRegistrationRequest as NicovideoRegistrationRequestLink } from "./[sourceId]/Link";

const Fragment = graphql(`
  fragment AllNicovideoRequestsPage_RequestsGridItem on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    title
    thumbnailUrl
    sourceId
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
  }
`);
export default function RequestsGridItem({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const [{ data }] = useQuery({
    query: graphql(`
      query AllNicovideoRequestsPage_RequestsGridItemQuery {
        whoami {
          id
          isEditor: hasRole(role: EDITOR)
        }
      }
    `),
    requestPolicy: "cache-first",
  });

  return (
    <div
      className={clsx(
        className,
        ["relative"],
        ["flex", "gap-x-4", "items-center"],
        ["border", "rounded"],
        ["bg-slate-100"],
        ["px-2", "py-2"],
        ["h-20"]
      )}
    >
      <NicovideoRegistrationRequestLink
        className={clsx(["flex-shrink-0"], ["flex"])}
        fragment={fragment}
      >
        <CoolImage
          alt={fragment.title}
          src={fragment.thumbnailUrl}
          className={clsx(["w-[96px]"], ["h-[64px]"])}
          width={96}
          height={64}
        />
      </NicovideoRegistrationRequestLink>
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-1"])}>
        <NicovideoRegistrationRequestLink
          fragment={fragment}
          className={clsx(
            ["flex-grow"],
            ["text-xs", "font-bold", "text-slate-900", "line-clamp-2"]
          )}
        >
          {fragment.title}
        </NicovideoRegistrationRequestLink>
        <div className={clsx(["flex", "items-center"])}>
          <div
            className={clsx(["flex-grow"], ["flex", "gap-x-1", "items-center"])}
          >
            <UserLink fragment={fragment.requestedBy}>
              <UserIcon size={24} fragment={fragment.requestedBy} />
            </UserLink>
            <UserLink
              className={clsx(["text-xxs"], ["text-slate-700"])}
              fragment={fragment.requestedBy}
            >
              {fragment.requestedBy.displayName}
            </UserLink>
          </div>
          {data?.whoami?.isEditor && (
            <NicovideoRegisterPageLink
              sourceId={fragment.sourceId}
              className={clsx(
                ["text-xs"],
                ["px-1", "py-0.5"],
                ["border", "border-sky-500", "rounded"],
                ["bg-sky-100", "hover:bg-sky-200", "text-sky-700"]
              )}
            >
              登録する
            </NicovideoRegisterPageLink>
          )}
        </div>
      </div>
    </div>
  );
}
