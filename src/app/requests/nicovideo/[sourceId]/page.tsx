import clsx from "clsx";
import { notFound } from "next/navigation";

import { LinkUser } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/common/CoolImage";
import { UserIcon2 } from "~/components/common/UserIcon";
import {
  SemitagsList,
  TagsList,
} from "~/components/pages/Requests/Nicovideo/Tags.server";
import { getFragment, graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import {
  Component_UserIconFragmentDoc,
  Link_UserFragmentDoc,
  NicovideoRequestPage_SemitagsListFragmentDoc,
  NicovideoRequestPage_TagsListFragmentDoc,
} from "~/gql/graphql";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { sourceId: string };
}) {
  const { findNicovideoRegistrationRequest } = await fetchGql(
    graphql(`
      query NicovideoRegistrationRequestPage($sourceId: String!) {
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          id
          title
          sourceId
          thumbnailUrl
          checked
          requestedBy {
            id
            name
            ...Link_User
            ...Component_UserIcon
          }
          ...NicovideoRequestPage_TagsList
          ...NicovideoRequestPage_SemitagsList
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!findNicovideoRegistrationRequest) return notFound();

  const { title, sourceId, thumbnailUrl, requestedBy } =
    findNicovideoRegistrationRequest;

  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>
        ニコニコ動画
        <span className={clsx(["font-mono"])}>{sourceId}</span>
        の登録リクエスト
      </h1>
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
            <LinkUser fragment={getFragment(Link_UserFragmentDoc, requestedBy)}>
              <UserIcon2
                size={24}
                fragment={getFragment(
                  Component_UserIconFragmentDoc,
                  requestedBy
                )}
              />
            </LinkUser>
            <div className={clsx(["ml-1"])}>
              <LinkUser
                className={clsx(["text-xs"])}
                fragment={getFragment(Link_UserFragmentDoc, requestedBy)}
              >
                {requestedBy.name}
              </LinkUser>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(["mt-4"], ["grid", "grid-cols-2"])}>
        <section
          className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}
        >
          <h2>タグ</h2>
          <TagsList
            fragment={getFragment(
              NicovideoRequestPage_TagsListFragmentDoc,
              findNicovideoRegistrationRequest
            )}
          />
        </section>
        <section
          className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}
        >
          <h2>仮タグ</h2>
          <SemitagsList
            fragment={getFragment(
              NicovideoRequestPage_SemitagsListFragmentDoc,
              findNicovideoRegistrationRequest
            )}
          />
        </section>
      </div>
    </main>
  );
}
