import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { CommonTag } from "~/components/common/Tag";
import { UserIcon } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { CommonTagFragmentDoc } from "~/gql/graphql";

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
            ...UserIcon
          }
          taggings {
            id
            tag {
              ...CommonTag
              ...Link_Tag
            }
            note
          }
          semitaggings {
            id
            name
            note
          }
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!findNicovideoRegistrationRequest) return notFound();

  const { title, sourceId, thumbnailUrl, requestedBy, taggings, semitaggings } =
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
          <div className={clsx(["w-64"], ["flex"])}>
            <Image
              src={thumbnailUrl}
              alt={title}
              width={196}
              height={128}
              style={{ height: "auto", objectFit: "scale-down" }}
            />
          </div>
        </div>
        <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-1"])}>
          <h1>{title}</h1>
          <div>
            <span className={clsx(["text-sm"], ["font-mono"])}>{sourceId}</span>
          </div>
          <div className={clsx(["flex", "items-center"])}>
            <LinkUser fragment={requestedBy}>
              <UserIcon size={24} fragment={requestedBy} />
            </LinkUser>
            <div className={clsx(["ml-1"])}>
              <LinkUser className={clsx(["text-xs"])} fragment={requestedBy}>
                {requestedBy.name}
              </LinkUser>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(["mt-4"], ["grid", "grid-cols-2"])}>
        <div className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}>
          <h2>タグ</h2>
          {taggings.map((tagging) => (
            <div key={tagging.id}>
              <div>
                <LinkTag className={clsx(["block"])} fragment={tagging.tag}>
                  <CommonTag
                    fragment={getFragment(CommonTagFragmentDoc, tagging.tag)}
                  />
                </LinkTag>
              </div>
              <div>{tagging.note && <span>{tagging.note}</span>}</div>
            </div>
          ))}
        </div>
        <div className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}>
          <h2>仮タグ</h2>
          {semitaggings.map((semitaggings) => (
            <div key={semitaggings.id}>
              <div>
                <span>{semitaggings.name}</span>
              </div>
              <div>{semitaggings.note && <span>{semitaggings.note}</span>}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
