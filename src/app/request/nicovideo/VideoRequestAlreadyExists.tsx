"use client";

import clsx from "clsx";
import Image from "next/image";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { UserIcon } from "~/components/common/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment RequestNicovideoRegistrationPage_VideoRequestAlreadyExists on NicovideoRegistrationRequest {
    id
    sourceId
    checked
    thumbnailUrl
    ...Link_NicovideoRegistrationRequest
    requestedBy {
      id
      name
      ...Link_User
      ...UserIcon
    }
  }
`);
export const VideoRequestAlreadyExists: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className, ["flex", "gap-x-4"])}>
      <div className={clsx(["flex-shrink-0"])}>
        <Image
          width={260}
          height={200}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          priority
        />
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-1"])}>
        <div>
          <p className={clsx(["text-slate-900"])}>
            <LinkNicovideoRegistrationRequest fragment={fragment}>
              <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>
              は既にリクエストされています。
            </LinkNicovideoRegistrationRequest>
          </p>
        </div>
        <div className={clsx(["flex", "items-center"])}>
          <LinkUser fragment={fragment.requestedBy}>
            <UserIcon size={32} fragment={fragment.requestedBy} />
          </LinkUser>
          <div className={clsx(["ml-1"])}>
            <LinkUser
              className={clsx(["text-sm"])}
              fragment={fragment.requestedBy}
            >
              {fragment.requestedBy.name}
            </LinkUser>
          </div>
        </div>
      </div>
    </div>
  );
};
