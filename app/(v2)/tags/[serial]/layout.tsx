import clsx, { ClassValue } from "clsx";
import { notFound } from "next/navigation";

import CommonTagLink from "~/components/CommonTagLink";
import { TagType } from "~/components/TagType";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import EditorPanel from "./Editor";

const a =
  (ts: Record<string, ClassValue>, f: ClassValue) =>
  (t: string | undefined) => {
    return typeof t === "string" && Object.keys(ts).includes(t) ? ts[t] : f;
  };

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const result = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query TagPageLayout($serial: Int!) {
        findTagBySerial(serial: $serial) {
          ...TagPageLayout_EditorPanel
          ...TagType
          id
          name
          serial
          totalTaggedVideos
          belongTo {
            keyword
            name
          }
          explicitParent {
            id
            name
          }
          aliases: names(primary: false) {
            id
            name
            primary
          }
          parents(categoryTag: false) {
            nodes {
              id
              explicit
              parent {
                ...CommonTagLink
                id
              }
            }
          }
          children {
            nodes {
              id
              explicit
              child {
                ...CommonTagLink
                id
              }
            }
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );
  if (!result.findTagBySerial) notFound();

  const { findTagBySerial } = result;
  const {
    name,
    explicitParent,
    aliases,
    totalTaggedVideos,
    parents: parentTags,
    children: childTags,
    belongTo,
  } = findTagBySerial;
  return (
    <div className={clsx("mx-auto @container/layout")}>
      <header
        className={clsx(
          "flex h-48 flex-col justify-center gap-y-1 border-b px-12",
          a(
            {
              event: "bg-tag-event-back border-b-tag-event-secondary",
              technique:
                "bg-tag-technique-back border-b-tag-technique-secondary",
              style: "bg-tag-style-back border-b-tag-style-secondary",
              realperson:
                "bg-tag-realperson-back border-b-tag-realperson-secondary",
              class: "bg-tag-class-back border-b-tag-class-secondary",
              character:
                "bg-tag-character-back border-b-tag-character-secondary",
              series: "bg-tag-series-back border-b-tag-series-secondary",
              music: "bg-tag-music-back border-b-tag-music-secondary",
              phrase: "bg-tag-phrase-back border-b-tag-phrase-secondary",
              copyright:
                "bg-tag-copyright-back border-b-tag-copyright-secondary",
            },
            "bg-obsidian-primary border-b-obsidian-lighter"
          )(belongTo?.keyword)
        )}
      >
        <div className={clsx("mx-auto w-full max-w-screen-xl")}>
          <h1 className={clsx("text-2xl")}>
            <span
              className={clsx(
                "font-bold",
                a(
                  {
                    event: "text-tag-event-primary-vivid",
                    technique: "text-tag-technique-primary-vivid",
                    style: "text-tag-style-primary-vivid",
                    realperson: "text-tag-realperson-primary-vivid",
                    class: "text-tag-class-primary-vivid",
                    character: "text-tag-character-primary-vivid",
                    series: "text-tag-series-primary-vivid",
                    music: "text-tag-music-primary-vivid",
                    phrase: "text-tag-phrase-primary-vivid",
                    copyright: "text-tag-copyright-primary-vivid",
                  },
                  "text-snow-primary"
                )(belongTo?.keyword)
              )}
            >
              {name}
            </span>
            {explicitParent && (
              <span
                className={clsx(
                  "ml-1 text-snow-darker",
                  a(
                    {
                      event: "text-tag-event-primary",
                      technique: "text-tag-technique-primary",
                      style: "text-tag-style-primary",
                      realperson: "text-tag-realperson-primary",
                      class: "text-tag-class-primary",
                      character: "text-tag-character-primary",
                      series: "text-tag-series-primary",
                      music: "text-tag-music-primary",
                      phrase: "text-tag-phrase-primary",
                      copyright: "text-tag-copyright-primary",
                    },
                    "text-snow-primary"
                  )(belongTo?.keyword)
                )}
              >
                ({explicitParent.name})
              </span>
            )}
          </h1>
        </div>
      </header>
      <div className="flex w-full flex-col items-start gap-4 px-8 py-4 @[768px]/layout:flex-row">
        <section
          className={clsx(
            "flex w-full shrink-0 flex-col gap-y-4 rounded border border-obsidian-primary bg-obsidian-darker px-2 py-4 @[768px]/layout:w-64"
          )}
        >
          <div
            className={clsx(
              "flex flex-row items-center justify-between border-l border-obsidian-lighter px-2"
            )}
          >
            <div className={clsx("text-xs text-snow-darker")}>タイプ</div>
            <TagType className={clsx("text-sm")} fragment={findTagBySerial} />
          </div>
          <div
            className={clsx(
              "flex flex-row items-center justify-between border-l border-obsidian-lighter px-2"
            )}
          >
            <div className={clsx("text-xs text-snow-darker")}>音MADの数</div>
            <p className={clsx("text-sm text-snow-primary")}>
              {totalTaggedVideos}
            </p>
          </div>
          {1 <= aliases.length && (
            <div
              className={clsx(
                "flex flex-col gap-y-2 border-l border-obsidian-lighter px-2"
              )}
            >
              <div className={clsx("text-xs text-snow-darker")}>別の表記</div>
              <div className={clsx("flex flex-col items-start gap-y-1")}>
                {aliases.map(({ id, name }) => (
                  <div key={id} className={clsx(["text-sm text-snow-primary"])}>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {1 <= parentTags.nodes.length && (
            <div
              className={clsx(
                "flex flex-col gap-y-2 border-l border-obsidian-lighter px-2"
              )}
            >
              <div className={clsx("text-xs text-snow-darker")}>親タグ</div>
              <div className={clsx("flex flex-col items-start gap-y-1")}>
                {parentTags.nodes.map(({ id, parent }) => (
                  <CommonTagLink
                    key={id}
                    size="xs"
                    fragment={parent}
                    className={clsx("block")}
                  />
                ))}
              </div>
            </div>
          )}
          {1 <= childTags.nodes.length && (
            <div
              className={clsx(
                "flex flex-col gap-y-2 border-l border-obsidian-lighter px-2"
              )}
            >
              <div className={clsx("text-xs text-snow-darker")}>子タグ</div>
              <div className={clsx("flex flex-col items-start gap-y-1")}>
                {childTags.nodes.map(({ id, child }) => (
                  <CommonTagLink
                    key={id}
                    size="xs"
                    fragment={child}
                    className={clsx("block")}
                  />
                ))}
              </div>
            </div>
          )}
          <EditorPanel fragment={findTagBySerial} className={clsx("w-full")} />
        </section>
        {children}
      </div>
    </div>
  );
}
