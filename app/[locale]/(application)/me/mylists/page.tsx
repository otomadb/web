import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import type { Metadata } from "next";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import CreateMylistButton from "../likes/CreateMylistButton";
import YouMylistPageLink from "./[slug]/Link";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("page.meMylists");

  return {
    title: t("title"),
  };
}

export default withPageAuthRequired(
  async () => {
    const a = await (
      await makeGraphQLClient2({ auth: "required" })
    ).request(
      graphql(`
        query MyMylistsPage {
          viewer {
            ...UserPage_SideNav
            displayName
            mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
              nodes {
                ...YouMylistPageLink
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
      `)
    );

    const { viewer } = a;
    if (!viewer) throw new Error("viewer is null");

    return (
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <header className={clsx("flex w-full items-center px-2")}>
          <h1 className={clsx("px-2 text-xl font-bold text-snow-primary")}>
            あなたのマイリスト
          </h1>
          <CreateMylistButton className={clsx("ml-auto")} />
        </header>
        <div className={clsx("mt-4 flex flex-col gap-y-4")}>
          {viewer.mylists.nodes.length === 0 && (
            <p className={clsx("text-sm font-bold text-snow-darkest")}>
              マイリストを1件も作成していません
            </p>
          )}
          {viewer.mylists.nodes.map((mylist) => (
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
                <YouMylistPageLink fragment={mylist}>
                  {mylist.title}
                </YouMylistPageLink>
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
    );
  },
  { returnTo: "/" }
);
