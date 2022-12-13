"use client";

import clsx from "clsx";
import React from "react";
import useSWR from "swr";

import { UserLink } from "~/components/Link";
import { UserIcon } from "~/components/UserIcon";
import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { VideoList } from "../tags/[id]/VideoList";
import { Logout } from "./Logout";

const ProfileDocument = graphql(`
  query Profile {
    whoami {
      id
      name
      displayName
      icon
      favorites {
        registrations(input: { limit: 12 }) {
          nodes {
            video {
              id
              title
              thumbnailUrl
            }
          }
        }
        recommendedVideos(input: { limit: 12 }) {
          items {
            video {
              id
              title
              thumbnailUrl
            }
            score
          }
        }
      }
    }
  }
`);

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const { data } = useSWR([ProfileDocument], async ([doc]) =>
    gqlClient.request(doc)
  );

  if (!data) return null;

  const {
    whoami: { id, name, displayName, icon, favorites },
  } = data;
  return (
    <div className={clsx(className)}>
      <p>Profile</p>
      <div>
        <UserIcon className={clsx([])} src={icon} name={name} />
        <p>
          <UserLink name={name}>@{name}</UserLink>
        </p>
        <p>{displayName}</p>
        <Logout />
      </div>
      <section className={clsx(["mt-2"])}>
        <h2 className={clsx(["text-lg"])}>いいねした動画</h2>
        <VideoList
          className={clsx(["mt-2"])}
          videos={favorites.registrations.nodes.map(({ video }) => ({
            id: video.id,
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
          }))}
        />
      </section>
      <section className={clsx(["mt-2"])}>
        <h2 className={clsx(["text-lg"])}>
          あなたのいいねした動画からのオススメ
        </h2>
        <VideoList
          className={clsx(["mt-2"])}
          videos={favorites.recommendedVideos.items.map(({ video }) => ({
            id: video.id,
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
          }))}
        />
      </section>
    </div>
  );
};
