import clsx from "clsx";
import { notFound } from "next/navigation";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import SideNav from "../SideNav";
import { UserMylistPageLink } from "./[slug]/Link";

export default async function Page({ params }: { params: { name: string } }) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistsPage2($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
          displayName
          mylists(range: [PUBLIC]) {
            nodes {
              ...UserMylistPageLink
              id
              title
              registrationsByOffset(input: { take: 12, offset: 0 }) {
                nodes {
                  id
                  video {
                    ...VideoThumbnail
                    ...CommonMadBlock
                  }
                }
              }
            }
          }
        }
      }
    `),
    { name: params.name }
  );

  if (!result.findUser) notFound();
  const { findUser } = result;

  return (
    <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
      <SideNav className={clsx("w-72")} primaryFragment={findUser} />
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <header className={clsx("flex w-full items-center px-2")}>
          <h1 className={clsx("px-2 text-xl font-bold text-snow-primary")}>
            {findUser.displayName}のマイリスト
          </h1>
        </header>
        <div className={clsx("mt-4 flex flex-col gap-y-4")}>
          {findUser.mylists.nodes.length === 0 && (
            <p className={clsx("text-sm font-bold text-snow-darkest")}>
              マイリストを1件も作成していません
            </p>
          )}
          {findUser.mylists.nodes.map((mylist) => (
            <div
              key={mylist.id}
              className={clsx(
                "flex flex-col rounded border border-obsidian-lighter bg-obsidian-primary p-4 @container/mylist"
              )}
            >
              <h2
                className={clsx(
                  "self-start px-2 text-lg font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                <UserMylistPageLink fragment={mylist}>
                  {mylist.title}
                </UserMylistPageLink>
              </h2>
              <div
                className={clsx(
                  "relative mt-2 flex h-[96px] overflow-x-hidden border border-obsidian-darker bg-obsidian-darkest px-4 py-2",
                  mylist.registrationsByOffset.nodes.length > 0 &&
                    "before:absolute before:inset-0 before:z-infinity before:bg-gradient-to-r before:from-transparent before:from-50% before:to-obsidian-darkest"
                )}
              >
                {mylist.registrationsByOffset.nodes.length === 0 && (
                  <div
                    className={clsx(
                      "self-center text-xs font-bold text-snow-darkest"
                    )}
                  >
                    まだ音MADを一つも登録していません
                  </div>
                )}
                {mylist.registrationsByOffset.nodes.map((node) => (
                  <VideoThumbnail
                    key={node.id}
                    fragment={node.video}
                    imageSize="small"
                    className={clsx("h-full w-[128px] shrink-0")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
