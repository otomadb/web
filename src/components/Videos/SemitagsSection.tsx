"use client";

import "client-only";

import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_AddSemitagDocument,
  VideoPage_SemitagsSectionFragment,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_UpstreamSemitagsSectionDocument,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { BlueButton } from "../common/Button";
import { ToggleSwitch } from "../common/ToggleSwitch";

graphql(`
  fragment VideoPage_SemitagsSection on Video {
    id
    semitags(resolved: false) {
      id
      name
    }
  }

  query VideoPage_UpstreamSemitagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_SemitagsSection
    }
  }
`);

export const SemitagsSection: React.FC<{
  className?: string;
  fallback: VideoPage_SemitagsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamSemitagsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(
    VideoPage_SemitagsSectionFragmentDoc,
    data?.video
  );
  const video = useMemo(() => upstream || fallback, [fallback, upstream]);

  const [edit, setEdit] = useState(false);
  const islogin = useIsLogin();

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          仮タグ
        </h2>
        {islogin && (
          <ToggleSwitch
            className={clsx(["flex-shrink-0"])}
            handleToggle={(v) => setEdit(v)}
          />
        )}
      </div>
      <div
        className={clsx(
          ["mt-2"],
          ["flex", "flex-col", "items-start"],
          ["gap-y-2"]
        )}
      >
        {video.semitags.map(({ id, name }) => (
          <div
            key={id}
            className={clsx(
              ["flex"],
              ["items-center"],
              ["bg-white"],
              ["border", "border-gray-200"],
              ["shadow-sm"],
              ["rounded"],
              ["px-2", "py-0.5"],
              ["text-slate-600"],
              ["text-xs"]
            )}
          >
            {name}
          </div>
        ))}
      </div>
      {edit && (
        <div className={clsx(["mt-2"])}>
          <Inp className={clsx(["w-full"])} videoId={video.id} />
        </div>
      )}
    </section>
  );
};

graphql(`
  mutation VideoPage_AddSemitag($videoId: ID!, $name: String!) {
    addSemitagToVideo(input: { videoId: $videoId, name: $name }) {
      semitag {
        id
        video {
          ...VideoPage_SemitagsSection
        }
      }
    }
  }
`);

export const Inp: React.FC<{ className?: string; videoId: string }> = ({
  className,
  videoId,
}) => {
  const [name, setName] = useState<string>("");
  const [, trigger] = useMutation(VideoPage_AddSemitagDocument);

  const handleAdd = useCallback(
    () => trigger({ name, videoId }),
    [name, trigger, videoId]
  );

  return (
    <div className={clsx(className, ["flex", "items-center"])}>
      <input
        className={clsx(
          ["flex-grow"],
          ["border", "border-slate-300"],
          ["rounded"],
          ["px-2", "py-1"],
          ["text-xs"]
        )}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <BlueButton
        className={clsx(["ml-2"], ["px-2", "py-1"])}
        disabled={name === ""}
        onClick={() => handleAdd()}
      >
        <PlusIcon className={clsx(["w-4"], ["h-4"])} />
      </BlueButton>
    </div>
  );
};
