import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { AboutPageLink } from "~/app/(landing)/about/Link";
import TopPageLink from "~/app/(landing)/Link";
import Logo from "~/components/Logo";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import Quote, { quotes } from "./Quote";

export const Presentation: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  madsCount: number;
  tagsCount: number;
  quote: number;
}> = ({ className, style, madsCount, tagsCount, quote }) => (
  <footer
    className={clsx(
      className,
      "flex flex-col gap-y-8 bg-obsidian-darker pb-16 pt-24"
    )}
    style={style}
  >
    <div
      className={clsx(
        "mx-auto flex w-full max-w-screen-xl flex-row flex-wrap items-center gap-8 px-12 @container/footer"
      )}
    >
      <div
        className={clsx(
          "flex w-full max-w-[256px] shrink-0 flex-col items-start gap-y-4 @container/info"
        )}
      >
        <div className={clsx("flex flex-col")}>
          <TopPageLink className={clsx("block")}>
            <Logo className={clsx("w-[160px] fill-vivid-primary")} />
          </TopPageLink>
          <p className={clsx("text-xs text-snow-primary")}>
            音MADの体系的なデータベースを作る
          </p>
        </div>
        <div className="flex grow gap-x-4">
          <div
            className={clsx("flex flex-col gap-y-2 text-sm text-snow-darker")}
          >
            <div className={clsx("text-xs")}>音MAD</div>
            <div
              className={clsx(
                "font-mono text-base leading-none text-vivid-primary"
              )}
            >
              {madsCount}
            </div>
          </div>
          <div
            className={clsx("flex flex-col gap-y-2 text-sm text-snow-darker")}
          >
            <div className={clsx("text-xs")}>タグ</div>
            <div
              className={clsx(
                "font-mono text-base leading-none text-vivid-primary"
              )}
            >
              {tagsCount}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "grow @container/sitemap @[384px]/footer:grid-cols-2 @[512px]/footer:grid-cols-3"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 gap-4 @[384px]/sitemap:grid-cols-2 @[512px]/sitemap:grid-cols-3"
          )}
        >
          <nav>
            <p className={clsx("text-sm font-bold text-vivid-primary")}>
              About
            </p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <AboutPageLink className={clsx("text-sm text-snow-primary")}>
                  OtoMADBについて
                </AboutPageLink>
              </li>
              <li className={clsx("flex")}>
                <a
                  aria-disabled="true"
                  className={clsx("text-sm text-snow-darkest")}
                >
                  利用規約
                </a>
              </li>
              <li className={clsx("flex")}>
                <a
                  aria-disabled="true"
                  className={clsx("text-sm text-snow-darkest")}
                >
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx("text-sm font-bold text-vivid-primary")}>
              Guides
            </p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <a className={clsx("text-sm text-snow-darkest")}>使い方</a>
              </li>
              <li className={clsx("flex")}>
                <Link
                  href={"/docs/faq"}
                  className={clsx("text-sm text-snow-primary")}
                >
                  よくある質問
                </Link>
              </li>
              <li className={clsx("flex")}>
                <Link
                  href={"/docs/faq#要望やバグ報告について"}
                  className={clsx("text-sm text-snow-primary")}
                >
                  要望やバグ報告
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx("text-sm font-bold text-vivid-primary")}>
              Socials
            </p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <a
                  href="https://github.com/otomadb"
                  className={clsx("text-sm text-snow-primary")}
                >
                  GitHub
                </a>
              </li>
              <li className={clsx("flex")}>
                <a
                  href="https://twitter.com/SnO2WMaN"
                  className={clsx("text-sm text-snow-primary")}
                >
                  Twitter
                  <span className={clsx("ml-1 font-mono text-snow-darker")}>
                    (@SnO2WMaN)
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div className={clsx("mx-auto flex w-full max-w-screen-xl px-12")}>
      <Quote index={quote} className={clsx("")} />
    </div>
  </footer>
);

export default async function GlobalFooter({
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const quote = Math.floor(Math.random() * quotes.length);
  const { countAllMads, countAllTags } = await makeGraphQLClient().request(
    graphql(`
      query GlobalFooter {
        countAllMads
        countAllTags
      }
    `)
  );

  return (
    <Presentation
      madsCount={countAllMads}
      tagsCount={countAllTags}
      quote={quote}
      {...props}
    />
  );
}
