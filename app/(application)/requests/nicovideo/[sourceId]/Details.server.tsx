import "server-only";

import clsx from "clsx";

import { UserPageLink } from "~/app/(application)/users/[name]/Link";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { Editor } from "./Editor";

const Fragment = graphql(`
  fragment NicovideoRequestPage_DetailsFragment on NicovideoRegistrationRequest {
    ...NicovideoRequestPage_EditorButtonFragment
    title
    sourceId
    embedUrl
    requestedBy {
      id
      name
      ...Link_User
      ...UserIcon
    }
  }
`);
export function Details(props: { fragment: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.fragment);
  const { title, sourceId, requestedBy, embedUrl } = fragment;

  return (
    <div className={clsx(["mt-4"], ["flex", "gap-x-4"])}>
      <div className={clsx(["shrink-0"])}>
        <iframe
          src={embedUrl}
          className={clsx(["w-[384px]"], ["h-[192px]"])}
          width={384}
          height={192}
        />
      </div>
      <div className={clsx(["grow"], ["flex", "flex-col", "gap-y-1"])}>
        <h1>{title}</h1>
        <div>
          <span className={clsx(["text-sm"], ["font-mono"])}>{sourceId}</span>
        </div>
        <div className={clsx(["flex", "items-center"])}>
          <UserPageLink fragment={requestedBy}>
            <UserIcon size={24} fragment={requestedBy} />
          </UserPageLink>
          <div className={clsx(["ml-1"])}>
            <UserPageLink className={clsx(["text-xs"])} fragment={requestedBy}>
              {requestedBy.name}
            </UserPageLink>
          </div>
        </div>
        <div>
          <Editor fragment={fragment} />
        </div>
      </div>
    </div>
  );
}
