import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CommonSemitag2 } from "~/components/CommonSemitag";
import CommonTagLink from "~/components/CommonTagLink";
import {
  BilibiliPictogram,
  NicovideoPictogram,
  SoundcloudPictogram,
  YoutubePictogram,
} from "~/components/Pictogram";
import { TagType } from "~/components/TagType";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import { LinkVideoEvents } from "./events/Link";
import LikeButton from "./LikeButton";
import { MadPageLink } from "./Link";
import TaggingEditor from "./TaggingEditor";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
  searchParams: Record<string, unknown>;
}) {
  /*
  const sp = z
    .union([z.undefined(), z.object({})])
    .safeParse(unparsedSearchParams);
    */

  const data = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query MadPageLayout($serial: Int!) {
        findMadBySerial(serial: $serial) {
          id
          title
          serial
          ...VideoThumbnail
          ...Link_Video
          ...Link_VideoEvents
          ...MadPageLayout_LikeSwitch
          ...MadPageLayout_Taggings
          ...MadPageLayout_Semitags
          ...MadPageLayout_Preview
          taggings {
            nodes {
              id
              tag {
                ...CommonTagLink
                ...TagType
                id
                belongTo {
                  keyword
                }
              }
            }
          }
          semitags(checked: false) {
            id
            ...CommonSemitag
          }
          nicovideoSources {
            id
            sourceId
            url
            embedUrl
          }
          youtubeSources {
            id
            sourceId
            url
            embedUrl
          }
          soundcloudSources {
            id
            sourceId
            url
            embedUrl
          }
          bilibiliSources {
            id
            sourceId
            url
            embedUrl
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!data.findMadBySerial) notFound();
  const { findMadBySerial: video } = data;
  const {
    serial,
    taggings,
    semitags,
    bilibiliSources,
    nicovideoSources,
    soundcloudSources,
    youtubeSources,
  } = video;

  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-x-4 px-8 py-4 @container/layout"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-[1536px] flex-wrap items-start gap-x-2"
        )}
      >
        <div className={clsx("grow py-4")}>
          <VideoThumbnail
            fragment={video}
            imageSize="large"
            className={clsx("mx-auto h-full max-h-[540px] max-w-[960px]")}
          />
        </div>
        <div
          className={clsx(
            "grid w-full shrink-0  gap-x-1 gap-y-0.5",
            "@[1024px]/layout:w-[256px] @[1024px]/layout:grid-cols-1",
            "grid-cols-3"
          )}
        >
          {nicovideoSources.map((source) => (
            <div
              key={source.id}
              className={clsx(
                "flex items-center gap-x-2 border-l-2 border-l-nicovideo-primary"
              )}
            >
              <Link
                href={{
                  pathname: `/videos/${serial}`,
                  query: { platform: "nicovideo", sourceId: source.sourceId },
                }}
                className={clsx(
                  "group flex grow items-center gap-x-2 p-4 hover:bg-obsidian-lighter"
                )}
              >
                <NicovideoPictogram
                  className={clsx(
                    "h-4 w-4 text-snow-darker group-hover:text-snow-lightest"
                  )}
                />
                <div
                  className={clsx(
                    "font-mono text-xs text-snow-primary group-hover:text-snow-lightest"
                  )}
                >
                  {source.sourceId}
                </div>
              </Link>
            </div>
          ))}
          {youtubeSources.map((source) => (
            <div
              key={source.id}
              className={clsx(
                "flex items-center gap-x-2 border-l-2 border-l-youtube-primary"
              )}
            >
              <Link
                href={{
                  pathname: `/videos/${serial}`,
                  query: { platform: "youtube", sourceId: source.sourceId },
                }}
                className={clsx(
                  "group flex grow items-center gap-x-2 p-4 hover:bg-obsidian-lighter"
                )}
              >
                <YoutubePictogram
                  className={clsx(
                    "h-4 w-4 text-snow-darker group-hover:text-snow-lightest"
                  )}
                />
                <div
                  className={clsx(
                    "font-mono text-xs text-snow-primary group-hover:text-snow-lightest"
                  )}
                >
                  {source.sourceId}
                </div>
              </Link>
            </div>
          ))}
          {bilibiliSources.map((source) => (
            <div
              key={source.id}
              className={clsx(
                "flex items-center gap-x-2 border-l-2 border-l-bilibili-primary"
              )}
            >
              <Link
                href={{
                  pathname: `/videos/${serial}`,
                  query: { platform: "bilibili", sourceId: source.sourceId },
                }}
                className={clsx(
                  "group flex grow items-center gap-x-2 p-4 hover:bg-obsidian-lighter"
                )}
              >
                <BilibiliPictogram
                  className={clsx(
                    "h-4 w-4 text-snow-darker group-hover:text-snow-lightest"
                  )}
                />
                <div
                  className={clsx(
                    "font-mono text-xs text-snow-primary group-hover:text-snow-lightest"
                  )}
                >
                  {source.sourceId}
                </div>
              </Link>
            </div>
          ))}
          {soundcloudSources.map((source) => (
            <div
              key={source.id}
              className={clsx(
                "flex items-center gap-x-2 border-l-2 border-l-soundcloud-primary"
              )}
            >
              <Link
                href={{
                  pathname: `/videos/${serial}`,
                  query: { platform: "soundcloud", sourceId: source.sourceId },
                }}
                className={clsx(
                  "group flex grow items-center gap-x-2 p-4 hover:bg-obsidian-lighter"
                )}
              >
                <SoundcloudPictogram
                  className={clsx(
                    "h-4 w-4 text-snow-darker group-hover:text-snow-lightest"
                  )}
                />
                <div
                  className={clsx(
                    "font-mono text-xs text-snow-primary group-hover:text-snow-lightest"
                  )}
                >
                  {source.sourceId}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "mx-auto mt-4 flex w-full max-w-[1536px] gap-4",
          "flex-col @[1024px]/layout:flex-row"
        )}
      >
        <div
          className={clsx(
            "flex w-full shrink-0 items-center justify-between",
            "@[1024px]/layout:w-72 @[1024px]/layout:flex-col @[1024px]/layout:items-start @[1024px]/layout:justify-start"
          )}
        >
          <LikeButton
            fragment={video}
            className={clsx(
              "w-full max-w-[256px] shrink-0 @[1024px]/layout:max-w-none"
            )}
          />
          <div className={clsx()}>
            <LinkVideoEvents
              fragment={video}
              className={clsx("text-sm text-snow-darker")}
            >
              編集履歴を見る
            </LinkVideoEvents>
          </div>
        </div>
        <div className={clsx("grid grow grid-cols-3 flex-wrap gap-4")}>
          <header className={clsx("col-span-full px-4")}>
            <h1 className={clsx("text-2xl font-bold text-snow-primary")}>
              <MadPageLink fragment={video}>{video.title}</MadPageLink>
            </h1>
          </header>
          <section
            className={clsx(
              "col-span-2 flex flex-col gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker p-4"
            )}
          >
            <div className={clsx("flex items-center gap-x-4 px-2")}>
              <h2 className={clsx("block text-lg font-bold text-snow-darker")}>
                タグ
              </h2>
              <div className={clsx("flex grow gap-x-2 gap-y-1")}>
                {taggings.nodes
                  .filter(
                    ({ tag: { belongTo: k1 } }, i, arr) =>
                      i ===
                      arr.findIndex(
                        ({ tag: { belongTo: k2 } }) =>
                          k1?.keyword === k2?.keyword
                      )
                  )
                  .map((node) => (
                    <TagType
                      key={node.tag.belongTo?.keyword || "_UNDEFINED"}
                      className={clsx("text-xs")}
                      fragment={node.tag}
                    />
                  ))}
              </div>
              <Suspense>
                <TaggingEditor madId={data.findMadBySerial.id} />
              </Suspense>
            </div>
            {taggings.nodes.length === 0 && (
              <p
                className={clsx(
                  "text-center text-xs font-bold text-snow-darkest"
                )}
              >
                タグ付けが行われていません。
              </p>
            )}
            {taggings.nodes.length > 0 && (
              <div className={clsx("flex flex-wrap gap-x-1 gap-y-0.5")}>
                {taggings.nodes.map((tagging) => (
                  <div key={tagging.id} className={clsx("flex")}>
                    <CommonTagLink size="small" fragment={tagging.tag} />
                  </div>
                ))}
              </div>
            )}
          </section>
          <section
            className={clsx(
              "col-span-1 flex flex-col gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker p-4"
            )}
          >
            <div className={clsx("flex items-center gap-x-4 px-2")}>
              <h2 className={clsx("block text-lg font-bold text-snow-darker")}>
                仮タグ
              </h2>
            </div>
            {semitags.length === 0 && (
              <p
                className={clsx(
                  "text-center text-xs font-bold text-snow-darkest"
                )}
              >
                仮タグ付けが行われていません。
              </p>
            )}
            {semitags.length > 0 && (
              <div className={clsx("flex flex-wrap gap-x-1 gap-y-0.5")}>
                {semitags.map((semitag) => (
                  <CommonSemitag2
                    key={semitag.id}
                    fragment={semitag}
                    size="small"
                  />
                ))}
              </div>
            )}
          </section>
          {children}
        </div>
      </div>
    </div>
  );
}
