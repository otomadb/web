"use client";

import "client-only";

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { BlueButton } from "~/components/common/Button";
import { ToggleSwitch } from "~/components/common/ToggleSwitch";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_AddSemitagDocument,
  VideoPage_SemitagFragment,
  VideoPage_SemitagFragmentDoc,
  VideoPage_SemitagsSectionFragment,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_UpstreamSemitagsSectionDocument,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { SemitagEditor } from "./SemitagEditor";

graphql(`
  fragment VideoPage_SemitagsSection on Video {
    id
    semitags {
      id
      name
      ...VideoPage_Semitag
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

  const semitags = useFragment(VideoPage_SemitagFragmentDoc, video.semitags);

  const islogin = useIsLogin();
  const [edit, setEdit] = useState(false);
  const [radio, setRadio] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (edit) return;
    setRadio(undefined);
  }, [edit]);

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
          ["flex", "flex-col", "items-stretch"],
          ["gap-y-2"]
        )}
      >
        {semitags.map((fragment) => (
          <SemitagItem
            key={fragment.id}
            fragment={fragment}
            edit={edit}
            radio={radio === fragment.id}
            handleFocus={(v) => {
              if (v) setRadio(fragment.id);
              else setRadio(undefined);
            }}
          />
        ))}
      </div>
      {edit && (
        <div className={clsx(["mt-2"])}>
          <SemitagAdder className={clsx(["w-full"])} videoId={video.id} />
        </div>
      )}
    </section>
  );
};

graphql(`
  fragment VideoPage_Semitag on Semitag {
    id
    name
  }
`);
export const SemitagItem: React.FC<{
  className?: string;
  fragment: VideoPage_SemitagFragment;
  edit: boolean;
  radio: boolean;
  handleFocus(focus: boolean): void;
}> = ({ className, fragment, edit, radio, handleFocus }) => {
  return (
    <div
      className={clsx(className, ["flex", "items-center", "justify-between"])}
    >
      <div
        className={clsx(
          ["bg-white"],
          ["border", "border-gray-200"],
          ["shadow-sm"],
          ["rounded"],
          ["px-2", "py-0.5"],
          ["text-slate-700"],
          ["text-xs"]
        )}
      >
        {fragment.name}
      </div>
      {edit && (
        <div className={clsx(["relative"])}>
          <div
            role="radio"
            aria-checked={radio}
            className={clsx(
              ["ml-1"],
              ["px-2", "py-0.5"],
              ["group/edit", "peer/edit"],
              ["border", "border-slate-300"],
              [
                "aria-checked:bg-slate-400",
                ["bg-slate-200", "hover:bg-slate-300"],
              ],
              ["rounded"],
              ["z-20"]
            )}
            onClick={() => handleFocus(!radio)}
          >
            <PencilSquareIcon
              className={clsx(
                ["w-3", "h-3"],
                [
                  "group-aria-checked/edit:text-slate-300",
                  ["text-slate-900", "group-hover/edit:text-slate-800"],
                ]
              )}
            />
          </div>
          {radio && (
            <div className={clsx(["absolute", "left-full"], ["z-infinity"])}>
              <div
                className={clsx(["fixed", "inset-0"], ["z-0"], ["bg-black/25"])}
                onClick={() => handleFocus(false)}
              />
              <SemitagEditor
                className={clsx(
                  ["absolute", "left-0", "top-0"],
                  ["ml-2"],
                  ["z-1"],
                  ["w-96"]
                )}
                semitagId={fragment.id}
                handleSelected={() => {
                  handleFocus(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

graphql(`
  mutation VideoPage_AddSemitag($videoId: ID!, $name: String!) {
    addSemitagToVideo(input: { videoId: $videoId, name: $name }) {
      ... on AddSemitagToVideoSucceededPayload {
        semitag {
          id
          video {
            ...VideoPage_SemitagsSection
          }
        }
      }
    }
  }
`);
export const SemitagAdder: React.FC<{
  className?: string;
  videoId: string;
}> = ({ className, videoId }) => {
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
