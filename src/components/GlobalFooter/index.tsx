import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { AboutPageLink } from "~/app/(landing)/about/Link";
import { TopLink } from "~/app/Link";
import { Logo } from "~/components/Logo";

export const GlobalFooter: React.FC = () => {
  return (
    <footer className={clsx("bg-slate-900 py-24")}>
      <div
        className={clsx(
          ["container mx-auto max-w-screen-xl px-12 @container/footer"],
          [
            "flex",
            "justify-between",
            "items-center",
            "flex-wrap",
            "gap-x-8",
            "gap-y-4",
          ]
        )}
      >
        <div
          className={clsx([
            "flex w-full shrink-0 select-none flex-col items-start @[512px]/footer:w-[256px]",
          ])}
        >
          <TopLink>
            <Logo className={clsx("w-[160px] fill-slate-100")} />
          </TopLink>
          <p className={clsx("mt-1 text-xs text-slate-300")}>
            音MADの体系的なデータベースを作る
          </p>
        </div>
        <div
          className={clsx(
            ["grow"],
            [
              "grid",
              [
                "grid-cols-1",
                "@[384px]/footer:grid-cols-2",
                "@[512px]/footer:grid-cols-3",
              ],
              // ["grid-cols-1 @[384px]/grid-cols-2 @[512px]/grid-cols-3 gap-x-4 gap-y-4"],
            ]
          )}
        >
          <nav>
            <p className={clsx("text-sm font-bold text-slate-500")}>About</p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <AboutPageLink className={clsx("text-sm text-slate-300")}>
                  OtoMADBについて
                </AboutPageLink>
              </li>
              <li className={clsx("flex")}>
                <a
                  aria-disabled="true"
                  className={clsx("text-sm text-slate-700")}
                >
                  利用規約
                </a>
              </li>
              <li className={clsx("flex")}>
                <a
                  aria-disabled="true"
                  className={clsx("text-sm text-slate-700")}
                >
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx("text-sm font-bold text-slate-500")}>Guides</p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <a className={clsx("text-sm text-slate-700")}>使い方</a>
              </li>
              <li className={clsx("flex")}>
                <Link
                  href={"/docs/faq"}
                  className={clsx("text-sm text-slate-300")}
                >
                  よくある質問
                </Link>
              </li>
              <li className={clsx("flex")}>
                <Link
                  href={"/docs/faq#要望やバグ報告について"}
                  className={clsx("text-sm text-slate-300")}
                >
                  要望やバグ報告
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx("text-sm font-bold text-slate-500")}>Socials</p>
            <ul className={clsx("mt-1 flex flex-col gap-y-2")}>
              <li className={clsx("flex")}>
                <a
                  href="https://github.com/otomadb"
                  className={clsx("text-sm text-slate-300")}
                >
                  GitHub
                </a>
              </li>
              <li className={clsx("flex")}>
                <a
                  href="https://twitter.com/SnO2WMaN"
                  className={clsx("text-sm text-slate-300")}
                >
                  Twitter
                  <span className={clsx(["ml-1 font-mono text-slate-400"])}>
                    (@SnO2WMaN)
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
