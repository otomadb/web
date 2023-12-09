import clsx from "clsx";

import UserPageLink from "~/app/(v2)/users/[name]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import AcceptRequestButton from "./AcceptRequestButton";

const Fragment = graphql(`
  fragment RequestPageCommon on RegistrationRequest {
    ...RequestPageCommon_AcceptRequestButton
    title
    sourceId
    requestedBy {
      id
      name
      displayName
      ...Link_User
      ...UserIcon
    }
    taggings {
      id
      tag {
        ...CommonTagLink
      }
      note
    }
    semitaggings {
      id
      name
      note
    }
  }
`);
export default async function RequestPageCommon({
  fragment,
  platform,
  Embed,
}: {
  fragment: FragmentType<typeof Fragment>;
  platform: "nicovideo" | "soundcloud" | "youtube" | "bilibili";
  Embed?: React.FC<{ className?: string }>;
}) {
  const a = useFragment(Fragment, fragment);
  const { title, requestedBy, sourceId, taggings, semitaggings } = a;

  return (
    <main
      className={clsx("mx-auto max-w-screen-2xl px-8 py-4 @container/page")}
    >
      <div className={clsx("flex flex-col gap-8 @[960px]/page:flex-row")}>
        <header className={clsx("@[960px]/page:hidden")}>
          <h1 className={clsx("text-2xl font-bold text-snow-primary")}>
            {title}
          </h1>
        </header>
        <div
          className={clsx(
            "flex shrink-0 flex-col gap-y-4 @[960px]/page:w-[384px]"
          )}
        >
          <div className={clsx()}>
            {Embed && <Embed className={clsx("h-[192px] w-full")} />}
          </div>
          <div className={clsx("flex flex-col gap-y-2")}>
            <div
              className={clsx(
                "flex w-full shrink-0 flex-col gap-y-4 rounded border border-obsidian-primary bg-obsidian-darker px-2 py-4"
              )}
            >
              <div
                className={clsx(
                  "flex flex-row items-center justify-between border-l border-obsidian-lighter px-2"
                )}
              >
                <div className={clsx("text-xs text-snow-darker")}>動画ID</div>
                <div className={clsx("font-mono text-sm text-snow-darker")}>
                  {sourceId}
                </div>
              </div>
              <div
                className={clsx(
                  "flex flex-row items-center justify-between border-l border-obsidian-lighter px-2"
                )}
              >
                <div className={clsx("text-xs text-snow-darker")}>
                  リクエストした人
                </div>
                <div className={clsx("flex items-center gap-x-2")}>
                  <UserPageLink fragment={requestedBy}>
                    <UserIcon size={24} fragment={requestedBy} />
                  </UserPageLink>
                  <UserPageLink
                    className={clsx("text-sm text-snow-darker")}
                    fragment={requestedBy}
                  >
                    {requestedBy.displayName}
                  </UserPageLink>
                </div>
              </div>
            </div>
            <div className={clsx("grid grid-cols-2 gap-x-2")}>
              <AcceptRequestButton fragment={a} platform={platform} />
            </div>
          </div>
        </div>
        <div className={clsx("flex grow flex-col gap-y-4")}>
          <header className={clsx("hidden @[960px]/page:flex")}>
            <h1 className={clsx("text-2xl font-bold text-snow-primary")}>
              {title}
            </h1>
          </header>
          <section
            className={clsx(
              "flex flex-col items-start gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker px-4 py-2"
            )}
          >
            <h2 className={clsx("font-bold text-snow-primary")}>タグ</h2>
            {taggings.length === 0 && (
              <p className={clsx("text-sm text-snow-darkest")}>
                提案されているタグ付けがありません
              </p>
            )}
            {taggings.length >= 1 && (
              <div className={clsx("flex gap-2")}>
                {taggings.map((tagging) => (
                  <div key={tagging.id}>
                    <div>
                      <CommonTagLink size="small" fragment={tagging.tag} />
                    </div>
                    <div>{tagging.note && <span>{tagging.note}</span>}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section
            className={clsx(
              "flex flex-col items-start gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker px-4 py-2"
            )}
          >
            <h2 className={clsx("font-bold text-snow-primary")}>仮タグ</h2>
            {semitaggings.length === 0 && (
              <p className={clsx("text-sm text-snow-darkest")}>
                提案されている仮タグ付けがありません
              </p>
            )}
            {semitaggings.length >= 1 && (
              <div className={clsx("flex gap-2")}>
                {semitaggings.map((semitagging) => (
                  <div
                    key={semitagging.id}
                    className={clsx(
                      "border border-obsidian-primary bg-obsidian-darker px-2 py-1 text-sm text-snow-darker"
                    )}
                  >
                    <div>
                      <span>{semitagging.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
