import clsx from "clsx";
import React from "react";

import { AboutPageLink } from "~/app/about/Link";
import { TopLink } from "~/app/Link";
import { Logo } from "~/components/Logo";

export const GlobalFooter: React.FC = () => {
  return (
    <footer className={clsx(["bg-slate-900"], ["py-24"])}>
      <div
        className={clsx(
          ["@container/footer"],
          ["container", "max-w-screen-xl", "mx-auto"],
          ["px-12"],
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
          className={clsx(
            ["flex-shrink-0"],
            ["w-full", "@[512px]/footer:w-[256px]"],
            ["flex", "flex-col", "items-start"],
            ["select-none"]
          )}
        >
          <TopLink>
            <Logo className={clsx(["text-3xl"], ["text-slate-100"])} />
          </TopLink>
          <p className={clsx(["mt-1"], ["text-slate-300"], ["text-xs"])}>
            音MADの体系的なデータベースを作る
          </p>
        </div>
        <div
          className={clsx(
            ["flex-grow"],
            [
              "grid",
              [
                "grid-cols-1",
                "@[384px]/footer:grid-cols-2",
                "@[512px]/footer:grid-cols-3",
              ],
              // ["grid-cols-1", "@[384px]/grid-cols-2", "@[512px]/grid-cols-3"],
              ["gap-x-4"],
              ["gap-y-4"],
            ]
          )}
        >
          <nav>
            <p className={clsx(["text-slate-500"], ["text-sm", "font-bold"])}>
              About
            </p>
            <ul className={clsx(["mt-1"], ["flex", "flex-col", "gap-y-2"])}>
              <li className={clsx(["flex"])}>
                <AboutPageLink
                  className={clsx(["text-slate-300"], ["text-sm"])}
                >
                  OtoMADBについて
                </AboutPageLink>
              </li>
              <li className={clsx(["flex"])}>
                <a
                  aria-disabled="true"
                  className={clsx(["text-slate-700"], ["text-sm"])}
                >
                  利用規約
                </a>
              </li>
              <li className={clsx(["flex"])}>
                <a
                  aria-disabled="true"
                  className={clsx(["text-slate-700"], ["text-sm"])}
                >
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx(["text-slate-500"], ["text-sm", "font-bold"])}>
              Guides
            </p>
            <ul className={clsx(["mt-1"], ["flex", "flex-col", "gap-y-2"])}>
              <li className={clsx(["flex"])}>
                <a className={clsx(["text-slate-700"], ["text-sm"])}>使い方</a>
              </li>
              <li className={clsx(["flex"])}>
                <a className={clsx(["text-slate-700"], ["text-sm"])}>
                  バグ報告や要望
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <p className={clsx(["text-slate-500"], ["text-sm", "font-bold"])}>
              Socials
            </p>
            <ul className={clsx(["mt-1"], ["flex", "flex-col", "gap-y-2"])}>
              <li className={clsx(["flex"])}>
                <a
                  href="https://github.com/otomadb"
                  className={clsx(["text-slate-300"], ["text-sm"])}
                >
                  GitHub
                </a>
              </li>
              <li className={clsx(["flex"])}>
                <a
                  href="https://twitter.com/SnO2WMaN"
                  className={clsx(["text-slate-300"], ["text-sm"])}
                >
                  Twitter
                  <span
                    className={clsx(
                      ["ml-1"],
                      ["text-slate-400"],
                      ["font-mono"]
                    )}
                  >
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
