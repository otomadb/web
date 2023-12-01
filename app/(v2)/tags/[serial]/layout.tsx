import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CommonTagLink from "~/components/CommonTagLink";
import { TagType } from "~/components/TagType";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const result = await makeGraphQLClient().request(
    graphql(`
      query TagPageLayout_Metadata($serial: Int!) {
        findTag(input: { serial: $serial }) {
          name
          serial
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  const { findTag } = result;
  if (!findTag) notFound();

  const { name, serial } = findTag;
  return {
    title: `tag:${name} | OtoMADB`,
    openGraph: {
      url: `https://otomadb.com/tags/${serial}`,
      title: `tag:${name} | OtoMADB`,
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query TagPageLayout($serial: Int!) {
        findTagBySerial(serial: $serial) {
          ...TagType
          id
          name
          type
          serial
          isCategoryTag
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
  if (result.findTagBySerial.isCategoryTag) return notFound(); // TODO: `/category/`とかに飛ばすとかでも良いと思う

  const { findTagBySerial } = result;
  const {
    name,
    explicitParent,
    aliases,
    parents: parentTags,
    children: childTags,
  } = findTagBySerial;
  return (
    <div className={clsx("mx-auto max-w-screen-2xl @container/layout")}>
      <header className={clsx("flex flex-col gap-y-1 px-4")}>
        <h1 className={clsx("text-2xl")}>
          <span className={clsx("font-bold text-snow-primary")}>{name}</span>
          {explicitParent && (
            <span className={clsx("ml-1 text-snow-darker")}>
              ({explicitParent.name})
            </span>
          )}
        </h1>
      </header>
      <div className="mt-4 flex w-full flex-col items-start gap-4 @[768px]/layout:flex-row">
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
        </section>
        <div className={clsx("w-full grow")}>{children}</div>
      </div>
    </div>
  );
}
