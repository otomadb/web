import clsx from "clsx";
import { Suspense } from "react";

import { LoginLink } from "~/components/AuthLink";
import OtomadbLogo from "~/components/OtomadbLogo";
import { SignUpPictogram } from "~/components/Pictogram";
import SearchContents from "~/components/SearchContents";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { getCurrentLocale, getI18n } from "~/locales/server";

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
  const locale = getCurrentLocale();
  const t = await getI18n();

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
        <span className={clsx("text-sm")}>
          {t("page.landing.参加してみる")}
        </span>
      </LoginLink>
      <div
        className={clsx(
          "relative z-infinity mx-auto mt-[-96px] w-full max-w-screen-md md:-mt-32"
        )}
      >
        <div className={clsx("flex gap-x-8")}>
          <div className={clsx("flex flex-col items-start gap-y-2")}>
            <OtomadbLogo
              locale={locale}
              className={clsx("h-[64px] fill-vivid-primary")}
            />
            <div>
              <h1 className={clsx("grow text-snow-primary", "text-xl")}>
                {t("page.landing.音MADのデータベースを作る")}
              </h1>
            </div>
          </div>
          <div className={clsx("flex grow flex-col gap-y-2")}>
            <div className={clsx("flex items-center gap-x-2")}>
              <div className={clsx(["text-xs text-snow-darker"])}>
                {t("音MAD")}
              </div>
              <div
                className={clsx(
                  "font-mono text-xl leading-none text-vivid-primary md:text-2xl"
                )}
              >
                <Suspense fallback={"0"}>{await getMadsCount()}</Suspense>
              </div>
            </div>
            <div className={clsx("flex items-center gap-x-2")}>
              <div className={clsx("text-xs text-snow-darker")}>
                {t("タグ")}
              </div>
              <div
                className={clsx(
                  "font-mono text-xl leading-none text-vivid-primary md:text-2xl"
                )}
              >
                <Suspense fallback={"0"}>{await getTagsCount()}</Suspense>
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
