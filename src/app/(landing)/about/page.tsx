import "server-only";

import clsx from "clsx";
import { Suspense } from "react";

import { AllVideosPageLink } from "~/app/mads/Link";
import { Logo } from "~/components/Logo";
import { SearchContents } from "~/components/SearchContents/SearchContents";

import RecentVideos from "./RecentVideos.server";
import { SignupButton } from "./SignUpButton";

export default function Page() {
  return (
    <main className={clsx("flex w-full flex-col")}>
      <header
        className={clsx(["w-full"], "min-h-[calc(100vh-192px)]", [
          "flex items-center gap-x-8 bg-black px-8 py-16",
        ])}
      >
        <div
          className={clsx("-mt-48 md:-mt-32", [
            "w-full",
            "max-w-screen-md",
            "mx-auto",
          ])}
        >
          <div
            className={clsx("flex flex-col items-center gap-x-8 md:flex-row")}
          >
            <div className={clsx("w-[196px]")}>
              <Logo className={clsx("w-full fill-text-primary")} />
            </div>
            <div>
              <h1
                className={clsx([
                  "grow text-xl font-light text-text-primary md:text-2xl",
                ])}
              >
                <strong className={clsx("text-accent-primary")}>音MAD</strong>
                のデータベースを作る
              </h1>
              <div
                className={clsx([
                  "mt-4 flex justify-center gap-x-8 md:justify-start",
                ])}
              >
                <div className={clsx("flex flex-col")}>
                  <span className={clsx("text-xs text-text-muted")}>音MAD</span>
                  <span
                    className={clsx([
                      "font-mono text-xl text-cyan-400 md:text-2xl",
                    ])}
                  >
                    1000
                  </span>
                </div>
                <div className={clsx("flex flex-col")}>
                  <span className={clsx("text-xs text-text-muted")}>タグ</span>
                  <span
                    className={clsx([
                      "font-mono text-xl text-cyan-400 md:text-2xl",
                    ])}
                  >
                    1000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <SearchContents className={clsx("mt-4 w-full")} />
        </div>
      </header>
      <section className={clsx("bg-background-primary py-28")}>
        <div className={clsx("mx-auto max-w-screen-md px-8 md:px-4")}>
          <h2 className={clsx("text-2xl font-light text-text-primary")}>
            <strong className={clsx("text-accent-primary")}>OtoMADB</strong>
            とは何か、そして何であるべきか
          </h2>
          <p className={clsx("mt-2 text-sm text-text-muted")}>
            ここに記載する内容は、一部実装中の内容を含むことが有ります。
          </p>
        </div>
        <div
          className={clsx(
            "px-8",
            "md:px-4",
            "mx-auto",
            "max-w-screen-lg",
            "divide-y",
            "divide-background-shallower"
          )}
        >
          <section className={clsx("py-16")}>
            <div>
              <h3 className={clsx("text-xl font-light text-text-primary")}>
                プラットフォームを跨いで音MADを記録する
              </h3>
            </div>
            <p
              className={clsx("mt-4 text-sm leading-relaxed text-text-primary")}
            >
              ニコニコ動画、YouTube、Bilibili、SoundCloudなど、音MADは様々な動画/音声投稿プラットフォームに投稿されています。
              それらを統一的に管理し、タグ情報などの適切なメタデータを与えることで、より様々な音MADを探しやすくします。
              もし、ある音MADがOtoMADBで登録されていなかった場合には、ユーザーは登録をリクエストすることが出来ます。
            </p>
          </section>
          <section className={clsx("py-16")}>
            <div>
              <h3 className={clsx("text-xl font-light text-text-primary")}>
                より頑強なタグシステムの構築
              </h3>
            </div>
            <p
              className={clsx("mt-4 text-sm leading-relaxed text-text-primary")}
            >
              現状のニコニコ動画などのタグシステムにおいて、タグは単なる文字情報を持っているだけで、タグの別名や、タグ間の親子関係など、様々な情報を十分に扱うことが出来ていないと考えています。
              OtoMADBではこれらを予め組み込んだ上で、頑強なタグシステムを構築することを目標としています。
            </p>
          </section>
          <section className={clsx("py-16")}>
            <div>
              <h3 className={clsx("text-xl font-light text-text-primary")}>
                パーソナライズドされた音MADの推薦
              </h3>
            </div>
            <p
              className={clsx("mt-4 text-sm leading-relaxed text-text-primary")}
            >
              <i className={clsx("text-text-muted")}>実装中です。</i>
              あなたの音MADのいいね情報などから好みの傾向を分析し、それに合わせた音MADを推薦します。
            </p>
          </section>
          <section className={clsx("py-16")}>
            <div>
              <h3 className={clsx("text-xl font-light text-text-primary")}>
                コミュニティ機能の実装
              </h3>
            </div>
            <p
              className={clsx("mt-4 text-sm leading-relaxed text-text-primary")}
            >
              <i className={clsx("text-text-muted")}>実装中です。</i>
              MADページにコメント欄などを実装したりすることで、コミュニティ機能を提供したいと思います。
            </p>
          </section>
        </div>
      </section>
      <section className={clsx("bg-background-deeper py-12")}>
        <div
          className={clsx(
            "mx-auto",
            "max-w-screen-md",
            "px-8",
            "md:px-4",
            "flex",
            "flex-col",
            "md:flex-row",
            "items-start",
            "md:items-center"
          )}
        >
          <h2
            className={clsx([
              "mx-auto w-full grow text-2xl font-light text-text-primary",
            ])}
          >
            最近追加された音MAD
          </h2>
          <div className={clsx("shrink-0")}>
            <AllVideosPageLink
              className={clsx([
                "text-sm font-semibold text-text-muted hover:underline",
              ])}
            >
              もっと見る
            </AllVideosPageLink>
          </div>
        </div>
        <div className={clsx("mt-8")}>
          <Suspense fallback={<p>音MADを取得中です</p>}>
            <RecentVideos className={clsx()} />
          </Suspense>
        </div>
      </section>
      <section className={clsx("bg-background-root py-48")}>
        <div
          className={clsx(
            "mx-auto",
            "max-w-screen-md",
            "px-8",
            "md:px-4",
            "flex",
            "flex-col"
          )}
        >
          <h2
            className={clsx(
              ["mx-auto w-full grow"],
              "text-center text-2xl font-light text-text-primary md:text-left"
            )}
          >
            Join{" "}
            <strong className={clsx("text-accent-primary")}>OtoMADB</strong>
          </h2>
          <div
            className={clsx(
              "mt-8 flex flex-col items-center gap-y-4 md:items-start"
            )}
          >
            <p className={clsx("text-lg text-text-primary")}>
              皆も一緒にやってみよう
            </p>
            <SignupButton color="blue" size="medium" />
          </div>
        </div>
      </section>
    </main>
  );
}
