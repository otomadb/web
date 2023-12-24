import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import { Metadata } from "next";
import { Suspense } from "react";

import { getScopedI18n } from "~/locales/server";

import MyLikesPageLink from "../me/likes/Link";
import LikesSectionInner from "./LikesSectionInner";
import { ModalOpener } from "./ModalOpener";
import Timeline from "./Timeline";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("page.home");

  return {
    title: t("title"),
  };
}

export default withPageAuthRequired(
  async () => {
    return (
      <>
        <ModalOpener />
        <main className={clsx("mx-auto max-w-screen-2xl p-8 @container/page")}>
          <div className={clsx("flex flex-col gap-4 @[1280px]/page:flex-row")}>
            <Timeline
              className={clsx(
                "order-2 w-full grow @[1280px]/page:order-1 @[1280px]/page:w-auto"
              )}
            />
            <div
              className={clsx(
                "order-1 flex w-full shrink-0 flex-col @[1280px]/page:order-2 @[1280px]/page:w-128"
              )}
            >
              <section
                className={clsx(
                  "rounded-lg border border-obsidian-primary bg-obsidian-darker p-4 @container/likes"
                )}
              >
                <div className={clsx("flex items-center px-4")}>
                  <p
                    className={clsx(
                      "grow text-base font-bold text-snow-primary"
                    )}
                  >
                    あなたがいいねした音MAD
                  </p>
                  <MyLikesPageLink
                    className={clsx(
                      "text-xs text-snow-darker hover:text-vivid-primary hover:underline"
                    )}
                  >
                    もっと見る
                  </MyLikesPageLink>
                </div>
                <div className={clsx("mt-2 flex flex-col items-stretch")}>
                  <Suspense fallback={<p>Loading</p>}>
                    <LikesSectionInner />
                  </Suspense>
                </div>
              </section>
            </div>
          </div>
        </main>
      </>
    );
  },
  { returnTo: "/" }
);
