"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { LinkRegisterSemitag } from "~/app/(application)/(editor)/editor/semitags/Link";
import { TagRegisterPageLink } from "~/app/(application)/(editor)/editor/tags/Link";
import TopPageLink from "~/app/(landing)/Link";
import { AllVideosPageLink } from "~/app/(v2)/mads/Link";
import AllNicovideoRequestsPageLink from "~/app/(v2)/requests/nicovideo/Link";
import {
  useOpenRegisterFromBilibili,
  useOpenRegisterFromNicovideo,
  useOpenRegisterFromYoutube,
  useOpenRequestFromNicovideo,
  useOpenRequestFromSoundcloud,
  useOpenRequestFromYoutube,
  useOpenSoundcloudRegisterModal,
} from "~/components/FormModal";
import Logo from "~/components/Logo";
import Pictogram from "~/components/Pictogram";
import { graphql } from "~/gql";

export const AppSideNavQuery = graphql(`
  query AppSideNav {
    viewer {
      id
      isEditor: hasRole(role: EDITOR)
      isAdmin: hasRole(role: ADMIN)
    }
  }
`);
export default function AppSideNav({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [{ data, fetching }] = useQuery({
    query: AppSideNavQuery,
  });

  const openRequestFromNicovideo = useOpenRequestFromNicovideo();
  const openRequestFromYoutube = useOpenRequestFromYoutube();
  const openRequestFromSoundcloud = useOpenRequestFromSoundcloud();

  const openNicovideoRegisterModal = useOpenRegisterFromNicovideo();
  const openYoutubeRegisterModal = useOpenRegisterFromYoutube();
  const openBilibiliRegisterModal = useOpenRegisterFromBilibili();
  const openSoundcloudRegisterModal = useOpenSoundcloudRegisterModal();

  return (
    <nav
      style={style}
      className={clsx(
        className,
        "overflow-y-hidden border-r border-r-obsidian-primary bg-obsidian-darker"
      )}
    >
      <div
        className={clsx(
          "flex h-[64px] items-center justify-center border-b border-obsidian-primary p-4"
        )}
      >
        <TopPageLink
          className={clsx(
            "block h-full shrink-0 fill-snow-primary transition-colors duration-75 hover:fill-vivid-primary"
          )}
        >
          <Logo className={clsx("h-full")} />
        </TopPageLink>
      </div>
      <div className="h-[calc(100%-64px)] overflow-y-scroll scrollbar-thin scrollbar-track-obsidian-primary scrollbar-thumb-obsidian-lighter scrollbar-w-[4px]">
        <div className={clsx("flex flex-col gap-y-4 px-2 py-4")}>
          <div
            className={clsx(
              "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
            )}
            data-active={!fetching}
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
                "grid animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
              )}
            >
              <AllVideosPageLink
                className={clsx(
                  "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                )}
              >
                <Pictogram icon="plus" className={clsx("h-4 w-4")} />
                <span className={clsx("text-sm")}>最近追加された音MAD</span>
              </AllVideosPageLink>
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
                  <Pictogram icon="nicovideo" className={clsx("h-4 w-4")} />
                  <span className={clsx("text-sm")}>ニコニコ動画</span>
                </AllNicovideoRequestsPageLink>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
            )}
            data-active={!fetching && !!data?.viewer}
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
                "relative ml-4 py-1 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.15s_ease-out_both] before:border-l before:border-obsidian-primary group-[&[data-active=false]]/sect:before:animation-paused"
              )}
            >
              <div
                className={clsx(
                  "animate-[fade-slide-l-to-r_0.5s_0.15s_ease-out_both] pl-4 text-xs font-bold text-snow-darker group-[&[data-active=false]]/sect:animation-paused"
                )}
              >
                音MADをリクエストする
              </div>
              <div
                className={clsx(
                  "mt-1 grid animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    openRequestFromNicovideo(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="nicovideo" className={clsx("h-4 w-4")} />
                  <span className={clsx("text-sm")}>ニコニコ動画</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openRequestFromYoutube(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="youtube" className={clsx("h-4 w-4 ")} />
                  <span className={clsx("text-sm")}>YouTube</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openRequestFromSoundcloud(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="soundcloud" className={clsx("h-4 w-4 ")} />
                  <span className={clsx("text-sm")}>SoundCloud</span>
                </button>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "group/sect relative flex flex-col gap-y-2 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0s_ease-out_both] before:border-l-2 before:border-obsidian-primary data-[active=false]:before:animation-paused"
            )}
            data-active={!fetching && !!data?.viewer?.isEditor}
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
                "relative ml-4 py-1 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.15s_ease-out_both] before:border-l before:border-obsidian-primary group-[&[data-active=false]]/sect:before:animation-paused"
              )}
            >
              <div
                className={clsx(
                  "animate-[fade-slide-l-to-r_0.5s_0.15s_ease-out_both] pl-4 text-xs font-bold text-snow-darker group-[&[data-active=false]]/sect:animation-paused"
                )}
              >
                音MADを登録する
              </div>
              <div
                className={clsx(
                  "mt-1 grid animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both] grid-cols-1 group-[&[data-active=false]]/sect:animation-paused"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    openNicovideoRegisterModal(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="nicovideo" className={clsx("h-4 w-4")} />
                  <span className={clsx("text-sm")}>ニコニコ動画</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openYoutubeRegisterModal(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="youtube" className={clsx("h-4 w-4 ")} />
                  <span className={clsx("text-sm")}>YouTube</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openSoundcloudRegisterModal(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="soundcloud" className={clsx("h-4 w-4 ")} />
                  <span className={clsx("text-sm")}>SoundCloud</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openBilibiliRegisterModal(null);
                  }}
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="bilibili" className={clsx("h-4 w-4 ")} />
                  <span className={clsx("text-sm")}>Bilibili</span>
                </button>
              </div>
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
                  <Pictogram icon="tag" className={clsx("h-4 w-4")} />
                  <span className={clsx("text-sm")}>タグの登録</span>
                </TagRegisterPageLink>
                <LinkRegisterSemitag
                  className={clsx(
                    "group flex items-center gap-x-2 px-4 py-1 text-left text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
                  )}
                >
                  <Pictogram icon="plus" className={clsx("h-4 w-4")} />
                  <span className={clsx("text-sm")}>仮タグの解決</span>
                </LinkRegisterSemitag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
