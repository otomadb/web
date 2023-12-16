"use client";

import clsx from "clsx";
import Link from "next/link";

import LinkRegisterSemitag from "~/app/(v2)/editor/semitags/Link";
import TagRegisterPageLink from "~/app/(v2)/editor/tags/Link";
import { AllVideosPageLink } from "~/app/(v2)/mads/Link";
import AllBilibiliRequestLink from "~/app/(v2)/requests/bilibili/Link";
import AllNicovideoRequestsPageLink from "~/app/(v2)/requests/nicovideo/Link";
import AllSoundcloudRequestLink from "~/app/(v2)/requests/soundcloud/Link";
import AllYoutubeRequestLink from "~/app/(v2)/requests/youtube/Link";
import { useOpenInput } from "~/components/FormWidget";
import {
  BilibiliPictogram,
  GroupPictogram,
  NicovideoPictogram,
  PlusPictogram,
  SoundcloudPictogram,
  TagPictogram,
  YoutubePictogram,
} from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const AppSideNavMenuFragment = graphql(`
  fragment AppSideNav on Query {
    viewer {
      isEditor: hasRole(role: EDITOR)
      isAdmin: hasRole(role: ADMIN)
    }
  }
`);
export default function Presentation({
  className,
  style,
  fragment,
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AppSideNavMenuFragment>;
}) {
  const openSourceInput = useOpenInput();
  const { viewer } = useFragment(AppSideNavMenuFragment, fragment);

  return (
    <div
      style={style}
      className={clsx(className, "flex flex-col gap-y-4 px-2 py-4")}
    >
      <div
        className={clsx(
          "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
        )}
      >
        <div
          className={clsx(
            "animate-[fade-slide-l-to-r_0.5s_0.1s_ease-out_both] px-4 text-sm font-bold text-snow-primary group-[&[data-active=false]]/sect:animation-paused"
          )}
        >
          一般
        </div>
        <div
          className={clsx(
            "grid animate-[fade-slide-l-to-r_0.5s_0.15s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
          )}
        >
          <AllVideosPageLink
            className={clsx(
              "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            <PlusPictogram className={clsx("h-4 w-4")} />
            <span className={clsx("text-sm")}>最近追加された音MAD</span>
          </AllVideosPageLink>
          <Link
            href="/groups"
            className={clsx(
              "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            <GroupPictogram className={clsx("h-4 w-4")} />
            <span className={clsx("text-sm")}>タグのグループ</span>
          </Link>
        </div>
        <div
          className={clsx(
            "relative ml-4 py-1 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.15s_ease-out_both] before:border-l before:border-obsidian-primary group-[&[data-active=false]]/sect:before:animation-paused"
          )}
        >
          <div
            className={clsx(
              "animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both] pl-4 text-xs font-bold text-snow-darker group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            最近リクエストされた音MAD
          </div>
          <div
            className={clsx(
              "mt-1 grid animate-[fade-slide-l-to-r_0.5s_0.25s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            <AllNicovideoRequestsPageLink
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <NicovideoPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>ニコニコ動画</span>
            </AllNicovideoRequestsPageLink>
            <AllBilibiliRequestLink
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <BilibiliPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>Bilibili</span>
            </AllBilibiliRequestLink>
            <AllYoutubeRequestLink
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <YoutubePictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>Youtube</span>
            </AllYoutubeRequestLink>
            <AllSoundcloudRequestLink
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <SoundcloudPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>SoundCloud</span>
            </AllSoundcloudRequestLink>
          </div>
        </div>
      </div>
      {viewer && (
        <div
          className={clsx(
            "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
          )}
        >
          <div
            className={clsx(
              "animate-[fade-slide-l-to-r_0.5s_0.1s_ease-out_both] px-4 text-sm font-bold text-snow-primary group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            諸々のリクエスト
          </div>
          <div
            className={clsx(
              "grid animate-[fade-slide-l-to-r_0.5s_0.15s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openSourceInput("request");
              }}
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <PlusPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>音MADをリクエストする</span>
            </button>
          </div>
        </div>
      )}
      {viewer?.isEditor && (
        <div
          className={clsx(
            "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
          )}
        >
          <div
            className={clsx(
              "animate-[fade-slide-l-to-r_0.5s_0.1s_ease-out_both] px-4 text-sm font-bold text-snow-primary group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            編集者モード
          </div>
          <div
            className={clsx(
              "grid animate-[fade-slide-l-to-r_0.5s_0.15s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openSourceInput("register");
              }}
              className={clsx(
                "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
              )}
            >
              <PlusPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("text-sm")}>音MADを登録する</span>
            </button>
          </div>
          <div
            className={clsx(
              "relative ml-4 py-1 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.15s_ease-out_both] before:border-l before:border-obsidian-primary group-[&[data-active=false]]/sect:before:animation-paused"
            )}
          >
            <div
              className={clsx(
                "animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both] pl-4 text-xs font-bold text-snow-darker group-[&[data-active=false]]/sect:animation-paused"
              )}
            >
              タグ関連
            </div>
            <div
              className={clsx(
                "mt-1 grid animate-[fade-slide-l-to-r_0.5s_0.25s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
              )}
            >
              <TagRegisterPageLink
                className={clsx(
                  "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                )}
              >
                <TagPictogram className={clsx("h-4 w-4")} />
                <span className={clsx("text-sm")}>タグの登録</span>
              </TagRegisterPageLink>
              <LinkRegisterSemitag
                className={clsx(
                  "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                )}
              >
                <PlusPictogram className={clsx("h-4 w-4")} />
                <span className={clsx("text-sm")}>仮タグの解決</span>
              </LinkRegisterSemitag>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
