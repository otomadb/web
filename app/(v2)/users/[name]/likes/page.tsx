import clsx from "clsx";
import { notFound } from "next/navigation";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import Paginator from "~/components/Paginator";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import SideNav from "../SideNav";

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 36;
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserLikesPage2($name: String!, $offset: Int!, $take: Int!) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
          name
          displayName
          likes {
            id
            registrationsByOffset(input: { offset: $offset, take: $take }) {
              totalCount
              nodes {
                id
                note
                video {
                  ...Link_Video
                  ...VideoThumbnail
                  id
                  title
                  taggings(first: 3) {
                    nodes {
                      id
                      tag {
                        ...CommonTagLink
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `),
    {
      name: params.name,
      offset: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }
  );

  const { findUser } = result;
  if (!findUser || !findUser.likes) {
    notFound();
  }

  const pageMax = Math.ceil(
    findUser.likes.registrationsByOffset.totalCount / PER_PAGE
  );

  return (
    <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
      <SideNav className={clsx("w-72")} primaryFragment={findUser} />
      <div
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <div className={clsx("@container/mylist")}>
          <div className={clsx("flex w-full items-center px-4 py-2")}>
            <div className="shrink-0 grow">
              <h1 className="text-xl font-bold text-snow-primary">
                {findUser.displayName}が良いと思った音MAD
              </h1>
            </div>
            <Paginator
              size="sm"
              className={clsx()}
              pageMax={pageMax}
              currentPage={page}
              pathname={`/users/${findUser.name}/likes`}
            />
          </div>
          <div
            className={clsx(
              "grid w-full grid-cols-1 flex-col gap-2 @[512px]/mylist:grid-cols-2 @[768px]/mylist:grid-cols-3 @[1024px]/mylist:grid-cols-4"
            )}
          >
            {findUser.likes?.registrationsByOffset.nodes.map((node) => (
              <div
                key={node.id}
                className={clsx(
                  "group/registration flex flex-col rounded border border-obsidian-lighter bg-obsidian-primary @container/registration"
                )}
              >
                <MadPageLink fragment={node.video} className={clsx("block")}>
                  <VideoThumbnail
                    fragment={node.video}
                    className={clsx(
                      "h-[108px] w-full shrink-0 border border-obsidian-lighter"
                    )}
                    imageSize="medium"
                  />
                </MadPageLink>
                <div className={clsx("flex flex-col gap-y-2 px-4 py-2")}>
                  <div>
                    <MadPageLink
                      fragment={node.video}
                      className={clsx(
                        "line-clamp-1 text-sm font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                      )}
                    >
                      {node.video.title}
                    </MadPageLink>
                  </div>
                  <div className={clsx("")}>
                    {node.video.taggings.nodes.length === 0 && (
                      <div className={clsx("text-xxs text-slate-500")}>
                        タグ付けがありません
                      </div>
                    )}
                    <div className={clsx("flex flex-wrap gap-1")}>
                      {node.video.taggings.nodes.map((tagging) => (
                        <CommonTagLink
                          size="xs"
                          key={tagging.id}
                          fragment={tagging.tag}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={clsx("flex w-full items-center justify-end px-4 py-2")}
          >
            <Paginator
              size="sm"
              className={clsx()}
              pageMax={pageMax}
              currentPage={page}
              pathname={`/users/${findUser.name}/likes`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
