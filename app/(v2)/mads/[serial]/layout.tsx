import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CommonSemitag2 } from "~/components/CommonSemitag";
import CommonTagLink from "~/components/CommonTagLink";
import {
  BilibiliPictogram,
  ExternalLinkPictogram,
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
          }
          youtubeSources {
            id
            sourceId
            url
          }
          soundcloudSources {
            id
            sourceId
            url
          }
          bilibiliSources {
            id
            sourceId
            url
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
      <header
        className={clsx(
          "col-span-full mx-auto max-w-[1536px] p-4 @[1024px]/layout:p-8"
        )}
      >
        <h1 className={clsx("text-2xl font-bold text-snow-primary")}>
          <MadPageLink fragment={video}>{video.title}</MadPageLink>
        </h1>
      </header>
      <div
        className={clsx(
          "z-1 mx-auto mt-4 flex w-full max-w-[1536px] gap-4",
          "flex-col @[1024px]/layout:flex-row"
        )}
      >
        <nav
          className={clsx(
            "flex w-full shrink-0 flex-row items-stretch gap-x-2",
            "@[1024px]/layout:w-72 @[1024px]/layout:flex-col @[1024px]/layout:items-start @[1024px]/layout:justify-start @[1024px]/layout:gap-y-4"
          )}
        >
          <div className={clsx("col-span-1 @[1024px]/layout:w-full")}>
            <LikeButton
              fragment={video}
              className={clsx(
                "w-32 @[1024px]/layout:w-full",
                "shrink-0 @[1024px]/layout:max-w-none"
              )}
            />
          </div>
          <LinkVideoEvents
            fragment={video}
            className={clsx(
              "flex items-center justify-center px-4 text-sm text-snow-darker @[1024px]/layout:px-0 hover:bg-obsidian-lighter @[1024px]/layout:hover:bg-transparent",
              "@[1024px]/layout:hover:text-vivid-primary @[1024px]/layout:hover:underline"
            )}
          >
            編集履歴を見る
          </LinkVideoEvents>
          <div
            className={clsx(
              "group/sources relative flex items-center justify-center @[1024px]/layout:w-full",
              "px-4 @[1024px]/layout:px-0",
              "hover:bg-obsidian-lighter @[1024px]/layout:hover:bg-transparent"
            )}
          >
            <div
              className={clsx(
                "text-sm text-snow-darker @[1024px]/layout:hidden"
              )}
            >
              動画ソース
            </div>
            <div
              className={clsx(
                "right-0 top-full z-1 flex flex-col @[1024px]/layout:top-auto @[1024px]/layout:gap-y-2",
                "w-64 @[1024px]/layout:w-full",
                "absolute @[1024px]/layout:relative",
                "invisible group-hover/sources:visible @[1024px]/layout:visible",
                "divide-y divide-obsidian-lighter @[1024px]/layout:divide-y-0",
                "border border-obsidian-lighter @[1024px]/layout:border-0",
                "bg-obsidian-primary/90 backdrop-blur-md @[1024px]/layout:bg-transparent"
              )}
            >
              {nicovideoSources.map((source) => (
                <div
                  key={source.id}
                  className={clsx(
                    "flex items-center border-l-2 !border-l-nicovideo-primary @[1024px]/layout:h-8"
                  )}
                >
                  <Link
                    href={{
                      pathname: `/videos/${serial}/sources/nicovideo/${source.sourceId}`,
                    }}
                    className={clsx(
                      "group/source flex grow items-center gap-x-2 hover:bg-vivid-primary @[1024px]/layout:hover:bg-obsidian-lighter",
                      "p-4 @[1024px]/layout:h-8"
                    )}
                  >
                    <NicovideoPictogram
                      className={clsx(
                        "h-4 w-4 text-snow-darker group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    />
                    <div
                      className={clsx(
                        "font-mono text-xs text-snow-primary group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    >
                      {source.sourceId}
                    </div>
                  </Link>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      "mx-2 block h-8 w-8 rounded-md p-2 text-snow-primary @[1024px]/layout:mx-0 hover:bg-vivid-primary hover:text-obsidian-primary @[1024px]/layout:hover:bg-obsidian-lighter @[1024px]/layout:hover:text-snow-lighter"
                    )}
                  >
                    <ExternalLinkPictogram className={clsx("h-full w-full ")} />
                  </a>
                </div>
              ))}
              {youtubeSources.map((source) => (
                <div
                  key={source.id}
                  className={clsx(
                    "flex items-center gap-x-2 border-l-2 !border-l-youtube-primary"
                  )}
                >
                  <Link
                    href={{
                      pathname: `/videos/${serial}/sources/youtube/${source.sourceId}`,
                    }}
                    className={clsx(
                      "group/source flex grow items-center gap-x-2 hover:bg-vivid-primary @[1024px]/layout:hover:bg-obsidian-lighter",
                      "p-4 @[1024px]/layout:h-8"
                    )}
                  >
                    <YoutubePictogram
                      className={clsx(
                        "h-4 w-4 text-snow-darker group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    />
                    <div
                      className={clsx(
                        "font-mono text-xs text-snow-primary group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    >
                      {source.sourceId}
                    </div>
                  </Link>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      "mx-2 block h-8 w-8 rounded-md p-2 text-snow-primary @[1024px]/layout:mx-0 hover:bg-vivid-primary hover:text-obsidian-primary @[1024px]/layout:hover:bg-obsidian-lighter @[1024px]/layout:hover:text-snow-lighter"
                    )}
                  >
                    <ExternalLinkPictogram className={clsx("h-full w-full ")} />
                  </a>
                </div>
              ))}
              {bilibiliSources.map((source) => (
                <div
                  key={source.id}
                  className={clsx(
                    "flex items-center gap-x-2 border-l-2 !border-l-bilibili-primary"
                  )}
                >
                  <Link
                    href={{
                      pathname: `/videos/${serial}/sources/bilibili/${source.sourceId}`,
                    }}
                    className={clsx(
                      "group/source flex grow items-center gap-x-2 hover:bg-vivid-primary @[1024px]/layout:hover:bg-obsidian-lighter",
                      "p-4 @[1024px]/layout:h-8"
                    )}
                  >
                    <BilibiliPictogram
                      className={clsx(
                        "h-4 w-4 text-snow-darker group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    />
                    <div
                      className={clsx(
                        "font-mono text-xs text-snow-primary group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    >
                      {source.sourceId}
                    </div>
                  </Link>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      "mx-2 block h-8 w-8 rounded-md p-2 text-snow-primary @[1024px]/layout:mx-0 hover:bg-vivid-primary hover:text-obsidian-primary @[1024px]/layout:hover:bg-obsidian-lighter @[1024px]/layout:hover:text-snow-lighter"
                    )}
                  >
                    <ExternalLinkPictogram className={clsx("h-full w-full ")} />
                  </a>
                </div>
              ))}
              {soundcloudSources.map((source) => (
                <div
                  key={source.id}
                  className={clsx(
                    "flex items-center gap-x-2 border-l-2 !border-l-soundcloud-primary"
                  )}
                >
                  <Link
                    href={{
                      pathname: `/videos/${serial}/sources/soundcloud/${source.sourceId}`,
                    }}
                    className={clsx(
                      "group/source flex grow items-center gap-x-2 hover:bg-vivid-primary @[1024px]/layout:hover:bg-obsidian-lighter",
                      "p-4 @[1024px]/layout:h-8"
                    )}
                  >
                    <SoundcloudPictogram
                      className={clsx(
                        "h-4 w-4 text-snow-darker group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    />
                    <div
                      className={clsx(
                        "font-mono text-xs text-snow-primary group-hover/source:text-obsidian-primary @[1024px]/layout:group-hover/source:text-snow-primary"
                      )}
                    >
                      {source.sourceId}
                    </div>
                  </Link>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      "mx-2 block h-8 w-8 rounded-md p-2 text-snow-primary @[1024px]/layout:mx-0 hover:bg-vivid-primary hover:text-obsidian-primary @[1024px]/layout:hover:bg-obsidian-lighter @[1024px]/layout:hover:text-snow-lighter"
                    )}
                  >
                    <ExternalLinkPictogram className={clsx("h-full w-full ")} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </nav>
        <div
          className={clsx(
            "relative z-0 grid grow gap-2",
            "grid-cols-1 @[1024px]/layout:grid-cols-3"
          )}
        >
          <section
            className={clsx(
              "col-span-full flex flex-col gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker p-4"
            )}
          >
            <VideoThumbnail
              fragment={video}
              imageSize="large"
              className={clsx("mx-auto h-full max-h-[540px] max-w-[960px]")}
            />
          </section>
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
