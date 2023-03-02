import "server-only";

import clsx from "clsx";

import { LinkUser } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/common/CoolImage";
import { UserIcon2 } from "~/components/common/UserIcon";
import { FragmentType, getFragment, graphql } from "~/gql";
import { Component_UserIconFragmentDoc } from "~/gql/graphql";

import { Editor } from "./Editor";

const Fragment = graphql(`
  fragment NicovideoRequestPage_DetailsFragment on NicovideoRegistrationRequest {
    ...NicovideoRequestPage_EditorButtonFragment
    title
    sourceId
    thumbnailUrl
    requestedBy {
      id
      name
      ...Link_User
      ...Component_UserIcon
    }
  }
`);
export function Details(props: { fragment: FragmentType<typeof Fragment> }) {
  const fragment = getFragment(Fragment, props.fragment);
  const { title, sourceId, thumbnailUrl, requestedBy } = fragment;

  return (
    <div className={clsx(["mt-4"], ["flex", "gap-x-4"])}>
      <div className={clsx(["flex-shrink-0"])}>
        <CoolImage
          className={clsx(["w-64"], ["h-32"])}
          src={thumbnailUrl}
          alt={title}
          width={196}
          height={128}
        />
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-1"])}>
        <h1>{title}</h1>
        <div>
          <span className={clsx(["text-sm"], ["font-mono"])}>{sourceId}</span>
        </div>
        <div className={clsx(["flex", "items-center"])}>
          <LinkUser fragment={requestedBy}>
            <UserIcon2
              size={24}
              fragment={getFragment(Component_UserIconFragmentDoc, requestedBy)}
            />
          </LinkUser>
          <div className={clsx(["ml-1"])}>
            <LinkUser className={clsx(["text-xs"])} fragment={requestedBy}>
              {requestedBy.name}
            </LinkUser>
          </div>
        </div>
        <div>
          <Editor fragment={fragment} />
        </div>
      </div>
    </div>
  );
}
