"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import {
  useOpenRequestFromNicovideo,
  useOpenRequestFromSoundcloud,
  useOpenRequestFromYoutube,
} from "~/components/FormModal";
import { graphql } from "~/gql";

import Pictogram from "../Pictogram";

export const AppSideNavQuery = graphql(`
  query AppSideNav {
    viewer {
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

  return (
    <div
      style={style}
      className={clsx(
        className,
        "border-r border-r-obsidian-lighter bg-obsidian-primary"
      )}
    >
      <div className={clsx("h-[64px]")}></div>
      <div className={clsx("flex flex-col gap-y-4 px-2")}>
        {data?.viewer && (
          <>
            <div
              className={clsx(
                "relative px-4 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.1s_ease-out_both] before:border-l-2 before:border-obsidian-lighter"
              )}
            >
              <div
                className={clsx(
                  "animate-[fade-slide-l-to-r_0.5s_0s_ease-out_both]"
                )}
              >
                <div className={clsx("text-sm font-bold text-snow-darkest")}>
                  あなた
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "relative px-4 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.2s_ease-out_both] before:border-l-2 before:border-obsidian-lighter"
              )}
            >
              <div
                className={clsx(
                  "animate-[fade-slide-l-to-r_0.5s_0.1s_ease-out_both]"
                )}
              >
                <div className={clsx("text-sm font-bold text-snow-darkest")}>
                  動画のリクエスト
                </div>
                <div className={clsx("mt-2 grid grid-cols-1")}>
                  <button
                    type="button"
                    onClick={() => {
                      openRequestFromNicovideo();
                    }}
                    className={clsx(
                      "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
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
                      "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
                    )}
                  >
                    <Pictogram icon="youtube" className={clsx("h-4 w-4")} />
                    <span className={clsx("text-sm")}>YouTube</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openRequestFromSoundcloud(null);
                    }}
                    className={clsx(
                      "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
                    )}
                  >
                    <Pictogram icon="soundcloud" className={clsx("h-4 w-4")} />
                    <span className={clsx("text-sm")}>SoundCloud</span>
                  </button>
                </div>
              </div>
            </div>
            {data.viewer.isEditor && (
              <>
                <div
                  className={clsx(
                    "relative px-4 py-2 before:absolute before:inset-0 before:h-full before:origin-top before:animate-[stretch-t-to-b_0.2s_0.3s_ease-out_both] before:border-l-2 before:border-obsidian-lighter"
                  )}
                >
                  <div
                    className={clsx(
                      "animate-[fade-slide-l-to-r_0.5s_0.2s_ease-out_both]"
                    )}
                  >
                    <div
                      className={clsx("text-sm font-bold text-snow-darkest")}
                    >
                      動画の登録
                    </div>
                    <div className={clsx("mt-2 grid grid-cols-1")}>
                      <button
                        type="button"
                        onClick={() => {
                          openRequestFromNicovideo();
                        }}
                        className={clsx(
                          "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
                        )}
                      >
                        <Pictogram
                          icon="nicovideo"
                          className={clsx("h-4 w-4")}
                        />
                        <span className={clsx("text-sm")}>ニコニコ動画</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          openRequestFromYoutube(null);
                        }}
                        className={clsx(
                          "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
                        )}
                      >
                        <Pictogram icon="youtube" className={clsx("h-4 w-4")} />
                        <span className={clsx("text-sm")}>YouTube</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          openRequestFromSoundcloud(null);
                        }}
                        className={clsx(
                          "group flex items-center gap-x-2 px-4 py-2 text-left text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
                        )}
                      >
                        <Pictogram
                          icon="soundcloud"
                          className={clsx("h-4 w-4")}
                        />
                        <span className={clsx("text-sm")}>SoundCloud</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
