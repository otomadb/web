"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { UserIcon } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import { ProfilePageDocument, VideoList_VideoFragmentDoc } from "~/gql/graphql";

import { VideoList } from "../common/VideoList";
import { Logout } from "./Logout";

graphql(`
  query ProfilePage {
    whoami {
      id
      name
      displayName
      icon
      favorites {
        id
        registrations(input: { limit: 12, order: { updatedAt: DESC } }) {
          nodes {
            id
            video {
              ...VideoList_Video
            }
          }
        }
        recommendedVideos(input: { limit: 12 }) {
          items {
            video {
              ...VideoList_Video
            }
            score
          }
        }
      }
    }
  }
`);

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [result] = useQuery({ query: ProfilePageDocument });
  const { data } = result;

  if (data?.whoami === null) {
    return (
      <div className={clsx(className)}>
        <p>You have to login</p>
      </div>
    );
  }

  const whoami = data?.whoami;

  const likedVideos = getFragment(
    VideoList_VideoFragmentDoc,
    whoami?.favorites.registrations.nodes.map(({ video }) => video)
  );
  const recommendedVideosFromLiked = getFragment(
    VideoList_VideoFragmentDoc,
    whoami?.favorites.recommendedVideos.items.map(({ video }) => video)
  );

  return (
    <main className={clsx(className)}>
      <h1 className={clsx(["text-xl"])}>Profile</h1>
      <section className={clsx(["mt-4"])}>
        <div className={clsx(["w-24"], ["h-24"])}>
          {!whoami && (
            <div
              className={clsx(
                ["rounded-lg"],
                [["w-full"], ["h-full"]],
                ["bg-slate-200"],
                ["animate-pulse"]
              )}
            ></div>
          )}
          {whoami && (
            <UserIcon
              className={clsx(["w-full"], ["h-full"], ["rounded-md"])}
              src={whoami.icon}
              name={whoami.name}
            />
          )}
        </div>
        <div className={clsx(["mt-2"], ["flex", "items-center"])}>
          <div
            className={clsx(
              !whoami && ["w-32", "bg-slate-200", "animate-pulse"]
            )}
          >
            {!whoami && (
              <span className={clsx(["text-transparent"])}>LOADING</span>
            )}
            {whoami && (
              <span className={clsx(["text-lg"], ["text-slate-900"])}>
                {whoami.displayName}
              </span>
            )}
          </div>
          <div
            className={clsx(
              ["ml-1"],
              !whoami && ["w-24", "bg-slate-200", "animate-pulse"]
            )}
          >
            {!whoami && (
              <span className={clsx(["text-transparent"])}>LOADING</span>
            )}
            {whoami && (
              <span
                className={clsx(["text-sm"], ["text-slate-500"], ["font-mono"])}
              >
                @{whoami.name}
              </span>
            )}
          </div>
        </div>
        <Logout className={clsx(["mt-2"])} />
      </section>
      <section className={clsx(["mt-4"])}>
        <h2 className={clsx(["text-lg"])}>いいねした動画</h2>
        {likedVideos && (
          <>
            <VideoList className={clsx(["mt-2"])} videos={likedVideos} />
          </>
        )}
      </section>
      <section className={clsx(["mt-4"])}>
        <h2 className={clsx(["text-lg"])}>
          あなたのいいねした動画からのオススメ
        </h2>
        {recommendedVideosFromLiked && (
          <VideoList
            className={clsx(["mt-2"])}
            videos={recommendedVideosFromLiked}
          />
        )}
      </section>
    </main>
  );
};
