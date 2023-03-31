import "server-only";

import clsx from "clsx";

import { SearchContents } from "~/components/common/SearchContents/SearchContents";
import { Logo } from "~/components/Logo";

import { SigninLinkPage } from "./auth/signin/Link";
import { SignupPageLink } from "./auth/signup/Link";
import RecentVideosSection from "./home/_components/RecentVideosSection";

export default async function Page() {
  return (
    <main className={clsx(["flex", "flex-col", "items-center"])}>
      <header
        className={clsx(
          ["max-w-screen-lg", "mx-auto"],
          ["w-full"],
          ["flex", "gap-x-4"],
          ["py-24"]
        )}
      >
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["w-[384px]"],
            ["flex", "flex-col"]
          )}
        >
          <div>
            <Logo className={clsx(["text-5xl"], ["text-slate-700"])} />
          </div>
          <div
            className={clsx(
              ["mt-4"],
              ["flex", "flex-col", "items-start", "gap-y-4"]
            )}
          >
            <SignupPageLink
              className={clsx(
                ["border"],
                ["rounded-md"],
                ["px-4"],
                ["py-2"],
                ["flex", "items-center"]
              )}
            >
              <span className={clsx(["text-sm"])}>ユーザー登録</span>
            </SignupPageLink>
            <SigninLinkPage
              className={clsx(
                ["border"],
                ["rounded-md"],
                ["px-4"],
                ["py-2"],
                ["flex", "items-center"]
              )}
            >
              <span className={clsx(["text-sm"])}>ログイン</span>
            </SigninLinkPage>
          </div>
        </div>
        <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
          <h1 className={clsx(["text-3xl", "font-semibold"])}>
            音MADのデータベースを作る
          </h1>
          <p className={clsx(["mt-6"], ["text-slate-700"], ["text-base"])}>
            おおよそ以下の目標を持って目下開発中です。
          </p>
          <ul
            className={clsx(
              ["mt-2"],
              ["list-decimal"],
              ["flex", "flex-col"],
              ["gap-y-2"]
            )}
          >
            <li>
              <p className={clsx(["text-sm"], ["text-slate-700"])}>
                ニコニコ動画、Youtube、bilibili、その他色々なプラットフォームに存在する音MADを統一的に登録してアクセス可能にする。
              </p>
            </li>
            <li>
              <p className={clsx(["text-sm"], ["text-slate-700"])}>
                あなたの好みの傾向を分析し、オススメの音MADを推薦する。
              </p>
            </li>
            <li>
              <p className={clsx(["text-sm"], ["text-slate-700"])}>
                頑強なタグシステムを作る。
              </p>
            </li>
          </ul>
          <div className={clsx(["mt-4"])}>
            <label className={clsx(["px-2"])}>
              <span className={clsx(["text-slate-700"], ["text-sm"])}>
                探してみる
              </span>
            </label>
            <SearchContents className={clsx(["mt-1"])} />
          </div>
        </div>
      </header>
      <div className={clsx(["w-full", "max-w-screen-xl"])}>
        <RecentVideosSection />
      </div>
    </main>
  );
}
