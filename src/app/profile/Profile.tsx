"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useLogout } from "~/hooks/useLogout";

import { VideoList } from "../tags/[id]/VideoList";

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
      }
    }
  }
`);

export const Logout: React.FC<{ className: string }> = ({ className }) => {
  const router = useRouter();
  const logout = useLogout({
    onSuccess() {
      router.push("/");
    },
  });

  return (
    <button
      className={clsx(
        className,
        ["px-2"],
        ["py-1"],
        ["bg-blue-400"],
        ["text-white"],
        ["rounded"]
      )}
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const { data } = useSWR([ProfileDocument], async (doc) =>
    gqlClient.request(doc)
  );

  if (!data) return null;

  const {
    whoami: { id, name, displayName, icon, favorites },
  } = data;
  return (
    <>
      <div className={clsx(className)}>
        <p>Profile</p>
        <div>
          <Image src={icon} width={128} height={128} alt={"icon"} />
          <p>
            <Link href={`/users/${name}`}> @{name}</Link>
          </p>
          <p>{displayName}</p>
        </div>
        <Logout className={clsx(["mt-1"])} />
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
    </>
  );
};
