import "server-only";

import clsx from "clsx";
import { Suspense } from "react";

import { MadPageLink } from "~/app/(application)/mads/[serial]/Link";
import { AllVideosPageLink } from "~/app/(application)/mads/Link";
import { LinkTag } from "~/app/(application)/tags/[serial]/Link";
import { CommonTag2 } from "~/components/CommonTag";
import { Logo } from "~/components/Logo";
import { SearchContents } from "~/components/SearchContents/SearchContents";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import { SignupButton } from "./SignUpButton";

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

const getMADs = () =>
  makeGraphQLClient({ next: { revalidate: 120 } })
    .request(
      graphql(`
        query AboutPage_RecentVideos {
          findVideos(first: 12) {
            nodes {
              id
              title
              ...Link_Video
              ...VideoThumbnail
              taggings(first: 3) {
                nodes {
                  id
                  tag {
                    ...CommonTag
                    ...Link_Tag
                  }
                }
              }
            }
          }
        }
      `)
    )
    .then((result) => result.findVideos.nodes);

export default async function Page() {
  return (
    <main className={clsx("flex w-full flex-col")}>
      <section
        className={clsx(
          "relative flex min-h-[calc(100vh-96px)] w-full items-center gap-x-8 bg-black px-8 py-16"
        )}
      >
        <SignupButton
          className={clsx("absolute right-8 top-4")}
          theme="vivid"
        />
        <div
          className={clsx(
            "mx-auto mt-[-96px] w-full max-w-screen-md md:-mt-32"
          )}
        >
          <div
            className={clsx("flex flex-col items-center gap-x-8 md:flex-row")}
          >
            <div className={clsx("w-[196px] shrink-0")}>
              <Logo className={clsx("w-full fill-accent-primary")} />
            </div>
            <div className={clsx("grow")}>
              <h1
                className={clsx(
                  "grow text-xl font-light text-text-primary md:text-2xl"
                )}
              >
                <strong className={clsx("text-accent-primary")}>音MAD</strong>
                のデータベースを作る
              </h1>
              <div className={clsx(["mt-4 grid grid-cols-4 gap-x-8"])}>
                <div className={clsx(["flex flex-col"])}>
                  <span className={clsx(["text-xs text-text-muted"])}>
                    音MAD
                  </span>
                  <span
                    className={clsx([
                      "font-mono text-xl font-thin text-accent-primary md:text-2xl",
                    ])}
                  >
                    <Suspense fallback={"0"}>{await getMadsCount()}</Suspense>
                  </span>
                </div>
                <div className={clsx(["flex flex-col"])}>
                  <span className={clsx(["text-xs text-text-muted"])}>
                    タグ
                  </span>
                  <span
                    className={clsx([
                      "font-mono text-xl font-thin text-accent-primary md:text-2xl",
                    ])}
                  >
                    <Suspense fallback={"0"}>{await getTagsCount()}</Suspense>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <SearchContents className={clsx(["mt-4 w-full"])} />
        </div>
      </section>
      <section className={clsx("bg-background-primary py-28")}>
        <div className={clsx("mx-auto max-w-screen-md px-8 md:px-4")}>
          <h2 className={clsx("text-2xl font-light text-text-primary")}>
            <strong className={clsx(["text-accent-primary"])}>OtoMADB</strong>
            とは何か、そして何であるべきか
          </h2>
          <p className={clsx("mt-2 text-sm text-text-muted")}>
            ここに記載する内容は、一部実装中の内容を含むことが有ります。
          </p>
        </div>
        <div
          className={clsx(
            "mx-auto max-w-screen-lg divide-y divide-background-shallower px-8 md:px-4"
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
              <i className={clsx(["text-text-muted"])}>実装中です。</i>
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
              <i className={clsx(["text-text-muted"])}>実装中です。</i>
              MADページにコメント欄などを実装したりすることで、コミュニティ機能を提供したいと思います。
            </p>
          </section>
        </div>
      </section>
      <section className={clsx("bg-background-deeper py-12")}>
        <div
          className={clsx(
            "mx-auto flex max-w-screen-md flex-col items-start px-8 md:flex-row md:items-center md:px-4"
          )}
        >
          <h2
            className={clsx(
              "mx-auto w-full grow text-2xl font-light text-text-primary"
            )}
          >
            最近追加された音MAD
          </h2>
          <div className={clsx(["shrink-0"])}>
            <AllVideosPageLink
              className={clsx(
                "text-sm font-semibold text-text-muted hover:underline"
              )}
            >
              もっと見る
            </AllVideosPageLink>
          </div>
        </div>
        <div className={clsx("mt-8")}>
          <Suspense fallback={<p>音MADを取得中です</p>}>
            <div
              className={clsx(
                "mx-auto grid max-w-screen-2xl grid-cols-2 items-stretch gap-1 overflow-scroll px-2 sm:grid-cols-3 md:grid-cols-4 md:px-4 lg:grid-cols-6"
              )}
            >
              {(await getMADs()).map((node) => (
                <div
                  key={node.id}
                  className={clsx(
                    "shrink-0 overflow-hidden rounded-sm border border-background-shallower bg-background-primary"
                  )}
                >
                  <MadPageLink className={clsx(["flex"])} fragment={node}>
                    <VideoThumbnail
                      fragment={node}
                      className={clsx(["h-32 w-full"])}
                      imageSize="large"
                    />
                  </MadPageLink>
                  <div className={clsx("flex flex-col gap-y-2 p-2")}>
                    <MadPageLink
                      fragment={node}
                      className={clsx(
                        "line-clamp-1 text-xs font-bold text-text-primary hover:text-accent-primary hover:underline"
                      )}
                    >
                      {node.title}
                    </MadPageLink>
                    <div className={clsx([])}>
                      {node.taggings.nodes.length === 0 && (
                        <div className={clsx("text-xxs text-slate-500")}>
                          タグ付けがありません
                        </div>
                      )}
                      <div className={clsx(["flex flex-wrap gap-0.5"])}>
                        {node.taggings.nodes.map((tagging) => (
                          <LinkTag
                            key={tagging.id}
                            fragment={tagging.tag}
                            className={clsx(["flex"])}
                          >
                            <CommonTag2
                              size="xs"
                              fragment={tagging.tag}
                              className={clsx(["px-1 py-0.5 text-xxs"])}
                            />
                          </LinkTag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </section>
      <section
        className={clsx(
          "relative bg-[url('/distinct.gif')] bg-cover py-48 before:absolute before:inset-0 before:z-0 before:bg-vivid-primary/80 before:backdrop-blur-sm md:py-64"
        )}
      >
        <div
          className={clsx(
            "relative z-infinity mx-auto flex max-w-screen-md flex-col items-center px-8 md:px-4"
          )}
        >
          <h2
            className={clsx(
              "text-center text-2xl font-light text-coal-darker md:text-left"
            )}
          >
            Join <strong className={clsx("text-coal-darkest")}>OtoMADB</strong>.
          </h2>
          <p className={clsx(["text-base text-coal-darker"])}>
            皆も一緒にやってみよう
          </p>
          <SignupButton className={clsx("mt-12")} theme="coal" />
        </div>
      </section>
    </main>
  );
}
