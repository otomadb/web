"use client";
import clsx from "clsx";
import React, { useCallback, useContext } from "react";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { useAccessToken } from "~/hooks/useAccessToken";

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

export const RegisterForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [accessToken] = useAccessToken();
  const { tags, primaryTitle, primaryThumbnail } = useContext(FormContext);

  const handleRegister = useCallback(async () => {
    if (!accessToken) return;
    if (!primaryTitle) return;
    if (!primaryThumbnail) return;

    try {
      const result = await gqlClient.request(
        RegisterVideoMutationDocument,
        {
          input: { primaryTitle, primaryThumbnail, tags, extraTitles: [] },
        },
        { Authorization: `Bearer ${accessToken}` }
      );
      console.log(result.registerVideo.video.id);
    } catch (e) {
      console.error(e);
    }
  }, [accessToken, primaryThumbnail, primaryTitle, tags]);

  return (
    <div className={clsx(className)}>
      <div>
        <div className={clsx(["text-slate-700"], ["text-sm"])}>Title</div>
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
            ["bg-blue-400", "hover:bg-blue-600", "disabled:bg-slate-300"]
          )}
          disabled={!accessToken || !primaryTitle || !primaryThumbnail}
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
    </div>
  );
};
