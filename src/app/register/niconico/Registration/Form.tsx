"use client";
import clsx from "clsx";
import Image from "next/image";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";

import { VideoLink } from "~/components/VideoLink";
import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

import { FormContext } from "../FormContext";
import { EditableTag } from "./EditableTag";

export const RegisterVideoMutationDocument = graphql(`
  mutation RegisterVideo($input: RegisterVideoInput!) {
    registerVideo(input: $input) {
      video {
        id
        title
        tags {
          id
          name
        }
      }
    }
  }
`);

export const FindNicoSource = graphql(`
  query FindNiconico($id: ID!) {
    findNiconicoSource(id: $id) {
      id
      video {
        id
        title
        thumbnailUrl
      }
    }
  }
`);

export const AlreadyDetector: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const gqlClient = useGraphQLClient();
  const { niconicoId } = useContext(FormContext);
  const [already, setAlready] = useState<null | {
    id: string;
    title: string;
    thumbnailUrl: string;
  }>(null);

  useSWR(
    niconicoId ? [FindNicoSource, niconicoId] : null,
    (doc, id) => gqlClient.request(doc, { id }),
    {
      onSuccess(data) {
        const { findNiconicoSource } = data;
        if (findNiconicoSource && findNiconicoSource.video) {
          const { video } = findNiconicoSource;
          setAlready({
            id: video.id,
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
          });
        } else {
          setAlready(null);
        }
      },
    }
  );

  useEffect(() => {
    setAlready(null);
  }, [niconicoId]);

  if (!already) return <>{children}</>;

  const { id, thumbnailUrl, title } = already;
  return (
    <>
      <div className={clsx(["px-2"])}>
        <p className={clsx(["text-lg"], ["text-slate-900"])}>
          <VideoLink videoId={id} className={clsx(["font-bold"])}>
            {title}
          </VideoLink>
          では？
        </p>
      </div>
      <div className={clsx(["mt-2"])}>
        <VideoLink videoId={id}>
          <Image
            className={clsx(["object-scale-down"], ["h-40"])}
            src={thumbnailUrl}
            width={260}
            height={200}
            alt={title}
            priority={true}
          />
        </VideoLink>
      </div>
    </>
  );
};

export const RegisterForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const gqlClient = useGraphQLClient();
  const {
    niconicoId,
    primaryTitle,
    primaryThumbnail,
    tags,
    changeNiconicoId,
    changePrimaryThumbnail,
    changePrimaryTitle,
    clearTags,
  } = useContext(FormContext);
  const loggedIn = useIsLoggedIn();

  const handleRegister = useCallback(async () => {
    if (!loggedIn) return;
    if (!niconicoId) return;
    if (!primaryTitle) return;
    if (!primaryThumbnail) return;

    try {
      const result = await gqlClient.request(RegisterVideoMutationDocument, {
        input: {
          primaryTitle,
          primaryThumbnail,
          tags,
          extraTitles: [],
          sources: [],
        },
      });

      const { title, id } = result.registerVideo.video;
      toast(() => (
        <span className={clsx(["text-slate-700"])}>
          <VideoLink
            videoId={id}
            className={clsx(["font-bold"], ["text-blue-500"])}
          >
            {title}
          </VideoLink>
          を登録しました．
        </span>
      ));
      changeNiconicoId(null);
      changePrimaryTitle(null);
      changePrimaryThumbnail(null);
      clearTags();
    } catch (e) {
      toast.error(() => (
        <span className={clsx(["text-slate-700"])}>
          登録時に問題が発生しました
        </span>
      ));
    }
  }, [
    loggedIn,
    niconicoId,
    primaryTitle,
    primaryThumbnail,
    gqlClient,
    tags,
    changeNiconicoId,
    changePrimaryTitle,
    changePrimaryThumbnail,
    clearTags,
  ]);

  return (
    <div className={clsx(className)}>
      <AlreadyDetector>
        <div>
          <div className={clsx(["text-slate-700"], ["text-sm"])}>
            niconico ID
          </div>
          <div>{niconicoId}</div>
        </div>
        <div>
          <div className={clsx(["mt-4"], ["text-slate-700"], ["text-sm"])}>
            Title
          </div>
          <div>{primaryTitle}</div>
        </div>
        <div className={clsx(["mt-4"])}>
          <div className={clsx(["text-slate-700"], ["text-sm"])}>Tags</div>
          <div>
            {tags.map((id) => (
              <EditableTag key={id} id={id} />
            ))}
          </div>
        </div>
        <div className={clsx(["mt-4"])}>
          <div className={clsx(["text-slate-700"], ["text-sm"])}>Thumbnail</div>
          <div className={clsx(["mt-2"])}>
            {primaryThumbnail && (
              <img className={clsx(["h-48"])} src={primaryThumbnail} />
            )}
          </div>
        </div>
        <div className={clsx(["mt-4"])}>
          <button
            className={clsx(
              ["rounded"],
              ["px-2", "py-1"],
              ["group"],
              ["bg-blue-400", "hover:bg-blue-600", "disabled:bg-slate-200"]
            )}
            disabled={!loggedIn || !primaryTitle || !primaryThumbnail}
            onClick={() => {
              handleRegister();
            }}
          >
            <span
              className={clsx(
                ["text-blue-50", "group-hover:text-blue-100"],
                ["group-disabled:text-slate-400"]
              )}
            >
              Register
            </span>
          </button>
        </div>
      </AlreadyDetector>
    </div>
  );
};
