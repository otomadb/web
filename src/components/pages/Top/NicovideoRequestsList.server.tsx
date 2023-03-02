import "server-only";

import clsx from "clsx";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/common/CoolImage";
import { UserIcon } from "~/components/common/UserIcon";
import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

export async function NicovideoRequestsList() {
  const { findNicovideoRegistrationRequests } = await fetchGql(
    graphql(`
      query TopPage_RecendNicovideoRegistrationRequests {
        findNicovideoRegistrationRequests(
          input: { limit: 8, order: { createdAt: DESC }, checked: false }
        ) {
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
              ...UserIcon
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
        <div
          key={node.id}
          className={clsx(
            ["flex", "gap-x-4"],
            [["px-2"], ["py-1"]],
            ["rounded"],
            ["border", "border-slate-300"]
          )}
        >
          <div className={clsx(["flex-shrink-0"])}>
            <LinkNicovideoRegistrationRequest key={node.id} fragment={node}>
              <CoolImage
                className={clsx(["w-32"], ["h-16"])}
                src={node.thumbnailUrl}
                alt={node.sourceId}
                width={196}
                height={128}
              />
            </LinkNicovideoRegistrationRequest>
          </div>
          <div
            className={clsx(
              ["flex-grow"],
              ["py-1"],
              ["flex", "flex-col", "gap-y-0.5"]
            )}
          >
            <div className={clsx(["flex", "flex-grow"])}>
              <LinkNicovideoRegistrationRequest
                key={node.id}
                className={clsx(["text-xs"])}
                fragment={node}
              >
                {node.title}
              </LinkNicovideoRegistrationRequest>
            </div>
            <div className={clsx(["flex", "items-center"])}>
              <LinkUser fragment={node.requestedBy}>
                <UserIcon size={24} fragment={node.requestedBy} />
              </LinkUser>
              <div className={clsx(["ml-1"])}>
                <LinkUser
                  className={clsx(["text-xs"])}
                  fragment={node.requestedBy}
                >
                  {node.requestedBy.name}
                </LinkUser>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
