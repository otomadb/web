import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { UserPageLink } from "~/app/(application)/users/[name]/Link";
import { NicovideoRegistrationRequestLink } from "~/app/(v2)/requests/nicovideo/[sourceId]/Link";
import CommonTag from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import { UserIcon } from "~/components/UserIcon";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import {
  AbstractPagenation,
  AbstractPaginateLink,
} from "../../tags/[serial]/Pagination";
import RegisterButton from "./RegisterButton";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: `リクエストされているニコニコ動画の音MAD(${page}ページ目) | OtoMADB`,
    openGraph: {
      title: `リクエストされているニコニコ動画の音MAD(${page}ページ目) | OtoMADB`,
      url: `https://otomadb.com/requests/nicovideo${
        page === 1 ? "" : `?page=${page}`
      }`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 12;

  const result = await makeGraphQLClient().request(
    graphql(`
      query NicovideoRequestsPage2($offset: Int!, $take: Int!) {
        findUncheckedNicovideoRegistrationRequestsByOffset(
          input: { skip: $offset, take: $take }
        ) {
          totalCount
          nodes {
            ...Link_NicovideoRegistrationRequest
            ...NicovideoRequestsPage_RegisterButton
            id
            title
            thumbnailUrl
            sourceId
            originalUrl
            taggings {
              id
              tag {
                ...CommonTag
              }
            }
            semitaggings {
              id
              name
            }
            requestedBy {
              ...Link_User
              ...UserIcon
              id
              displayName
            }
          }
        }
      }
    `),
    { offset: (page - 1) * PER_PAGE, take: PER_PAGE }
  );
  if (
    !result.findUncheckedNicovideoRegistrationRequestsByOffset ||
    result.findUncheckedNicovideoRegistrationRequestsByOffset.nodes.length === 0
  )
    notFound();

  const { findUncheckedNicovideoRegistrationRequestsByOffset } = result;
  const pageMax = Math.ceil(
    findUncheckedNicovideoRegistrationRequestsByOffset.totalCount / PER_PAGE
  );

  return (
    <main
      className={clsx(
        "mx-auto flex max-w-full flex-col gap-y-4 px-8 py-4 @container/page"
      )}
    >
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">
            リクエストされているニコニコ動画の音MAD一覧
          </h1>
        </div>
        <AbstractPagenation
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          PaginateLink={(props) => (
            <AbstractPaginateLink {...props} pathname="/requests/nicovideo" />
          )}
        />
      </div>
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-2 @[1024px]:grid-cols-2 @[1536px]:grid-cols-3"
        )}
      >
        {findUncheckedNicovideoRegistrationRequestsByOffset.nodes.map(
          (node) => (
            <div
              key={node.id}
              className={clsx(
                "overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
              )}
            >
              <div className={clsx("flex gap-x-4 p-2")}>
                <NicovideoRegistrationRequestLink
                  className={clsx("flex shrink-0 self-center")}
                  fragment={node}
                >
                  <CoolImage
                    alt={node.title}
                    src={node.thumbnailUrl}
                    width={160}
                    height={90}
                    unoptimized={true}
                    className={clsx("h-[96px] w-[128px]")}
                  />
                </NicovideoRegistrationRequestLink>
                <div className={clsx("flex grow flex-col gap-y-1")}>
                  <div className={clsx("flex")}>
                    <NicovideoRegistrationRequestLink
                      fragment={node}
                      className={clsx(
                        "line-clamp-1 text-base font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                      )}
                    >
                      {node.title}
                    </NicovideoRegistrationRequestLink>
                  </div>
                  <div>
                    <a
                      href={node.originalUrl}
                      target="_blank"
                      className={clsx(
                        "font-mono text-sm text-snow-darker hover:text-vivid-primary hover:underline"
                      )}
                    >
                      {node.sourceId}
                    </a>
                  </div>
                  <div className={clsx("flex items-center gap-x-2")}>
                    <UserPageLink
                      fragment={node.requestedBy}
                      className={clsx("block")}
                    >
                      <UserIcon size={24} fragment={node.requestedBy} />
                    </UserPageLink>
                    <p className={clsx("text-xs text-snow-darker")}>
                      <UserPageLink
                        className={clsx("font-bold")}
                        fragment={node.requestedBy}
                      >
                        {node.requestedBy.displayName}
                      </UserPageLink>
                      さんがリクエストしました
                    </p>
                  </div>
                </div>
              </div>
              <div className={clsx("flex px-4 py-2")}>
                <div
                  className={clsx(
                    "grid grow grid-cols-[auto_1fr] flex-col gap-2 "
                  )}
                >
                  <div className={clsx("text-xs text-snow-darkest")}>タグ</div>
                  <div>
                    {node.taggings.length === 0 && (
                      <div className={clsx("text-xs text-snow-darker")}>
                        なし
                      </div>
                    )}
                    {node.taggings.length > 0 && (
                      <div className={clsx("flex flex-wrap gap-1")}>
                        {node.taggings.map(({ id, tag }) => (
                          <CommonTag size="xs" fragment={tag} key={id} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={clsx("text-xs text-snow-darkest")}>
                    仮タグ
                  </div>
                  <div>
                    {node.semitaggings.length === 0 && (
                      <div className={clsx("text-xs text-snow-darker")}>
                        なし
                      </div>
                    )}
                    {node.semitaggings.length > 0 && (
                      <div className={clsx("flex flex-wrap gap-1")}>
                        {node.semitaggings.map(({ id, name }) => (
                          <div
                            key={id}
                            className={clsx(
                              "rounded-sm border border-obsidian-primary bg-obsidian-darker px-1 py-0.5 text-xxs text-snow-darker"
                            )}
                          >
                            <span>{name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={clsx("flex flex-col justify-end")}>
                  <RegisterButton fragment={node} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className={clsx("flex w-full justify-end px-4 py-2")}>
        <AbstractPagenation
          size="sm"
          pageMax={pageMax}
          currentPage={page}
          PaginateLink={(props) => (
            <AbstractPaginateLink {...props} pathname="/requests/nicovideo" />
          )}
        />
      </div>
    </main>
  );
}
