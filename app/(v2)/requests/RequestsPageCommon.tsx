import clsx from "clsx";
import { ReactNode } from "react";

import UserPageLink from "~/app/(v2)/users/[name]/Link";
import CommonTag from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import Paginator from "~/components/Paginator";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const PER_PAGE = 12;

export const RequestsPageCommonFragment = graphql(`
  fragment RequestsPageCommon on FindUncheckedRequestsByOffsetPayload {
    totalCount
    nodes {
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
`);
export default function RequestsPageCommon({
  page,
  fragment,
  Link,
  Button,
  paginatorPathname,
  Title,
}: {
  page: number;
  fragment: FragmentType<typeof RequestsPageCommonFragment>;
  paginatorPathname: string;
  Title: ReactNode;
  Link: React.FC<{ className?: string; children: ReactNode; sourceId: string }>;
  Button: React.FC<{ className?: string; sourceId: string }>;
}) {
  const { totalCount, nodes } = useFragment(
    RequestsPageCommonFragment,
    fragment
  );
  const pageMax = Math.ceil(totalCount / PER_PAGE);

  return (
    <main
      className={clsx(
        "mx-auto flex max-w-full flex-col gap-y-4 px-8 py-4 @container/page"
      )}
    >
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">{Title}</h1>
        </div>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname={paginatorPathname}
        />
      </div>
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-2 @[1024px]:grid-cols-2 @[1536px]:grid-cols-3"
        )}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className={clsx(
              "overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
            )}
          >
            <div className={clsx("flex gap-x-4 p-2")}>
              <Link
                sourceId={node.sourceId}
                className={clsx("flex shrink-0 self-center")}
              >
                <CoolImage
                  alt={node.title}
                  src={node.thumbnailUrl}
                  width={160}
                  height={90}
                  unoptimized={true}
                  className={clsx("h-[96px] w-[128px]")}
                />
              </Link>
              <div className={clsx("flex grow flex-col gap-y-1")}>
                <div className={clsx("flex")}>
                  <Link
                    sourceId={node.sourceId}
                    className={clsx(
                      "line-clamp-1 text-base font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                    )}
                  >
                    {node.title}
                  </Link>
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
                    <div className={clsx("text-xs text-snow-darker")}>なし</div>
                  )}
                  {node.taggings.length > 0 && (
                    <div className={clsx("flex flex-wrap gap-1")}>
                      {node.taggings.map(({ id, tag }) => (
                        <CommonTag size="xs" fragment={tag} key={id} />
                      ))}
                    </div>
                  )}
                </div>
                <div className={clsx("text-xs text-snow-darkest")}>仮タグ</div>
                <div>
                  {node.semitaggings.length === 0 && (
                    <div className={clsx("text-xs text-snow-darker")}>なし</div>
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
                <Button className={clsx("h-6 w-6")} sourceId={node.sourceId} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={clsx("flex w-full justify-end px-4 py-2")}>
        <Paginator
          size="sm"
          pageMax={pageMax}
          currentPage={page}
          pathname={paginatorPathname}
        />
      </div>
    </main>
  );
}
