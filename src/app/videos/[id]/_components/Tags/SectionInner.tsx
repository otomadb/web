"use client";

import "client-only";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "urql";

import { DelayedInput } from "~/components/DelayedInput";
import { graphql } from "~/gql";
import {
  VideoPage_RefreshTagsDocument,
  VideoPage_TagVideoDocument,
} from "~/gql/graphql";
import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

import { EditToggle } from "./EditToggle";
import { TagsList } from "./List";
import { SearchBox } from "./SearchBox";

graphql(`
  fragment VideoPage_VideoTags on Video {
    id
    tags {
      ...VideoPage_Tag
    }
  }

  query VideoPage_RefreshTags($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_VideoTags
    }
  }

  mutation VideoPage_TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        ...VideoPage_VideoTags
        ...VideoPage_VideoHistory
      }
    }
  }
`);

export const SectionInner: React.FC<{
  className?: string;
  videoId: string;
}> = ({ className, videoId }) => {
  const isLoggedIn = useIsLoggedIn();

  const [result, reexecute] = useQuery({
    query: VideoPage_RefreshTagsDocument,
    variables: { id: videoId },
  });

  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(
    null
  );

  const [, exec] = useMutation(VideoPage_TagVideoDocument);
  const handleTagAdd = useCallback(
    (tagId: string) => {
      exec({ input: { tagId, videoId } });
    },
    [exec, videoId]
  );

  return (
    <div className={clsx(className, ["mt-2"])}>
      <div
        className={clsx([
          "flex",
          ["flex-col"],
          ["lg:flex-row", "lg:items-center", "lg:gap-x-2"],
        ])}
      >
        <EditToggle
          className={clsx(["flex-shrink-0"])}
          edit={edit}
          toggleEdit={(v) => setEdit(v)}
        />
        <div className={clsx(["flex"], ["flex-grow"])}>
          <div className={clsx(["relative"], ["flex-grow"])}>
            <DelayedInput
              className={clsx(
                ["w-full"],
                [["py-1"], ["px-2"]],
                ["text-xs"],
                ["border", "border-slate-200"]
              )}
              inject={selected?.name}
              disabled={!isLoggedIn || !edit}
              onUpdateQuery={(q) => {
                setQuery(q);
                if (q !== selected?.name) setSelected(null);
              }}
            />
            <SearchBox
              classNames={clsx(
                { invisible: query === "" || selected !== null },
                ["absolute"],
                ["top-100"],
                ["w-full"],
                ["border"]
              )}
              query={query}
              videoId={videoId}
              setTag={(v) => {
                setSelected(v);
              }}
            />
          </div>
          <button
            disabled={!selected?.id}
            className={clsx(
              ["px-2"],
              ["disabled:bg-slate-300", ["bg-blue-400"]],
              ["disabled:text-slate-100", ["text-slate-100"]]
            )}
            onClick={() => selected?.id && handleTagAdd(selected?.id)}
          >
            <PlusIcon
              className={clsx(["place-content-center"], [["w-4"], ["h-4"]])}
            />
          </button>
        </div>
      </div>
      <TagsList className={clsx(["mt-1"])} edit={edit} videoId={videoId} />
    </div>
  );
};
