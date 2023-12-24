import clsx from "clsx";
import { Suspense } from "react";

import { LoginLink } from "~/components/AuthLink";
import Logo from "~/components/Logo";
import { SignUpPictogram } from "~/components/Pictogram";
import SearchContents from "~/components/SearchContents";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import AndesRespect from "./AndesRespect";

const getMadsCount = () =>
  makeGraphQLClient({ next: { revalidate: 120 } })
    .request(
      graphql(`
        query AboutPage_MadsCount {
          countAllMads
        }
      `)
    )
    .then((result) => result.countAllMads);

const getTagsCount = () =>
  makeGraphQLClient({ next: { revalidate: 120 } })
    .request(
      graphql(`
        query AboutPage_TagsCount {
          countAllTags
        }
      `)
    )
    .then((result) => result.countAllTags);

export default async function Top({ className }: { className?: string }) {
  const widget = Math.floor(Math.random() * 1);

  return (
    <section
      className={clsx(
        className,
        "relative flex items-center gap-x-8 bg-black px-8 py-16"
      )}
    >
      {widget === 0 && <AndesRespect className={clsx("absolute inset-0")} />}
      <LoginLink
        className={clsx(
          "absolute right-8 top-4 flex items-center gap-x-2 rounded-sm border border-vivid-primary bg-transparent px-4 py-2 text-vivid-primary duration-50 hover:bg-vivid-primary hover/button:text-obsidian-darker"
        )}
      >
        <SignUpPictogram className={clsx("h-4")} />
        <span className={clsx("text-sm")}>参加してみる</span>
      </LoginLink>
      <div
        className={clsx(
          "relative z-infinity mx-auto mt-[-96px] w-full max-w-screen-md md:-mt-32"
        )}
      >
        <div className={clsx("flex flex-col items-center gap-x-8 md:flex-row")}>
          <div className={clsx("w-[196px] shrink-0")}>
            <Logo className={clsx("w-full fill-vivid-primary")} />
          </div>
          <div className={clsx("grow")}>
            <h1
              className={clsx(
                "grow text-xl font-light text-snow-primary md:text-2xl"
              )}
            >
              <strong className={clsx("text-vivid-primary")}>音MAD</strong>
              のデータベースを作る
            </h1>
            <div className={clsx(["mt-4 grid grid-cols-4 gap-x-8"])}>
              <div className={clsx(["flex flex-col"])}>
                <span className={clsx(["text-xs text-snow-darker"])}>
                  音MAD
                </span>
                <span
                  className={clsx([
                    "font-mono text-xl font-thin text-vivid-primary md:text-2xl",
                  ])}
                >
                  <Suspense fallback={"0"}>{await getMadsCount()}</Suspense>
                </span>
              </div>
              <div className={clsx(["flex flex-col"])}>
                <span className={clsx(["text-xs text-snow-darker"])}>タグ</span>
                <span
                  className={clsx([
                    "font-mono text-xl font-thin text-vivid-primary md:text-2xl",
                  ])}
                >
                  <Suspense fallback={"0"}>{await getTagsCount()}</Suspense>
                </span>
              </div>
            </div>
          </div>
        </div>
        <SearchContents
          className={clsx("mt-4 w-full")}
          opacity={true}
          searchMads={true}
          searchNicovideo={false}
          searchTags={false}
        />
      </div>
    </section>
  );
}
