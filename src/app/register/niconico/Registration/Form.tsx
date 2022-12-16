"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { ReactNode, useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "urql";

import { VideoLink } from "~/components/Link";
import { graphql } from "~/gql";
import {
  RegisterNiconicoPage_FindNicovideoSourceDocument,
  RegisterNiconicoPage_RegisterVideoDocument,
  RegisterVideoInputSourceType,
} from "~/gql/graphql";
import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

import { FormContext } from "../FormContext";
import { EditableTag } from "./EditableTag";

graphql(`
  mutation RegisterNiconicoPage_RegisterVideo($input: RegisterVideoInput!) {
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

  query RegisterNiconicoPage_FindNicovideoSource($id: ID!) {
    findNicovideoVideoSource(sourceId: $id) {
      id
      video {
        id
        title
        thumbnailUrl
      }
    }
  }
`);

export const AlreadyDetector: React.FC<{
  children: ReactNode;
  nicovideoId: string;
}> = ({ children, nicovideoId }) => {
  const [result] = useQuery({
    query: RegisterNiconicoPage_FindNicovideoSourceDocument,
    variables: { id: nicovideoId },
  });
  const { data } = result;

  const already = useMemo(() => {
    if (!data?.findNicovideoVideoSource?.video) return null;
    const { id, thumbnailUrl, title } = data.findNicovideoVideoSource.video;
    return { id, title, thumbnailUrl };
  }, [data]);

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

  const [, trigger] = useMutation(RegisterNiconicoPage_RegisterVideoDocument);

  const handleRegister = useCallback(async () => {
    if (!loggedIn) return;
    if (!niconicoId) return;
    if (!primaryTitle) return;
    if (!primaryThumbnail) return;

    const result = await trigger({
      input: {
        primaryTitle,
        primaryThumbnail,
        tags,
        extraTitles: [],
        sources: [
          {
            type: RegisterVideoInputSourceType.Nicovideo,
            sourceId: niconicoId,
          },
        ],
      },
    });
    if (result.error) {
      toast.error(() => (
        <span className={clsx(["text-slate-700"])}>
          登録時に問題が発生しました
        </span>
      ));
      return;
    }

    if (result.data) {
      const { title, id } = result.data.registerVideo.video;
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
    }
    changeNiconicoId(null);
    changePrimaryTitle(null);
    changePrimaryThumbnail(null);
    clearTags();
  }, [
    loggedIn,
    niconicoId,
    primaryTitle,
    primaryThumbnail,
    trigger,
    tags,
    changeNiconicoId,
    changePrimaryTitle,
    changePrimaryThumbnail,
    clearTags,
  ]);

  if (!niconicoId) return null;

  return (
    <div className={clsx(className)}>
      <AlreadyDetector nicovideoId={niconicoId}>
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
