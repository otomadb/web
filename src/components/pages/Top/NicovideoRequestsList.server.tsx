import "server-only";

import clsx from "clsx";
import Image from "next/image";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_UserIconFragmentDoc,
  Link_NicovideoRegistrationRequestFragmentDoc,
  Link_UserFragmentDoc,
} from "~/gql/graphql";
import { fetchGql } from "~/utils/fetchGql";

export async function NicovideoRequestsList() {
  const { findNicovideoRegistrationRequests } = await fetchGql(
    graphql(`
      query TopPage_RecendNicovideoRegistrationRequests {
        findNicovideoRegistrationRequests(input: { limit: 24 }) {
          nodes {
            id
            title
            sourceId
            thumbnailUrl
            ...Link_NicovideoRegistrationRequest
            requestedBy {
              id
              name
              ...Link_User
              ...Component_UserIcon
            }
          }
        }
      }
    `),
    {},
    { next: { revalidate: 0 } }
  );

  return (
    <div className={clsx(["flex", "flex-col"], ["gap-y-2"])}>
      {findNicovideoRegistrationRequests.nodes.map((node) => (
        <LinkNicovideoRegistrationRequest
          key={node.id}
          fragment={getFragment(
            Link_NicovideoRegistrationRequestFragmentDoc,
            node
          )}
          className={clsx(
            ["flex", "gap-x-4"],
            [["px-2"], ["py-1"]],
            ["rounded"],
            ["border", "border-slate-300"]
          )}
        >
          <div className={clsx(["flex-shrink-0"])}>
            <div className={clsx(["flex"], ["w-36"], ["h-24"])}>
              <Image
                style={{ height: "auto", objectFit: "scale-down" }}
                width={256}
                height={128}
                src={node.thumbnailUrl}
                alt={node.sourceId}
                priority
              />
            </div>
          </div>
          <div
            className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-0.5"])}
          >
            <div className={clsx()}>
              <span className={clsx(["text-sm"])}>{node.title}</span>
            </div>
            <div>
              <span className={clsx(["font-mono", "text-xs"])}>
                {node.sourceId}
              </span>
            </div>
            <div className={clsx(["flex", "items-center"])}>
              <LinkUser
                fragment={getFragment(Link_UserFragmentDoc, node.requestedBy)}
              >
                <UserIcon2
                  size={24}
                  fragment={getFragment(
                    Component_UserIconFragmentDoc,
                    node.requestedBy
                  )}
                />
              </LinkUser>
              <div className={clsx(["ml-1"])}>
                <LinkUser
                  className={clsx(["text-xs"])}
                  fragment={getFragment(Link_UserFragmentDoc, node.requestedBy)}
                >
                  {node.requestedBy.name}
                </LinkUser>
              </div>
            </div>
          </div>
        </LinkNicovideoRegistrationRequest>
      ))}
    </div>
  );
}
