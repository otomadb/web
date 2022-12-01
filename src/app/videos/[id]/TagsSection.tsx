"use client";

import "client-only";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useCallback, useContext, useState } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

import { UpdateableContext } from "./context";
import { TagsEditer } from "./TagsEditer";
import { TagsList } from "./TagsList";

export const TagsSection: React.FC<{
  className?: string;
  videoId: string;
}> = ({ className, videoId }) => {
  const [edit, setEdit] = useState(false);
  const { tags, updateTags, updateHistory } = useContext(UpdateableContext);
  const update = useCallback(() => {
    updateTags();
    updateHistory();
  }, [updateHistory, updateTags]);

  return (
    <div className={clsx(className)}>
      <div className={clsx(["h-8"], ["flex", ["items-center"]])}>
        <EditToggle edit={edit} toggleEdit={(v) => setEdit(v)} />
        <TagsEditer
          className={clsx(["ml-2"], ["w-full"], { hidden: !edit })}
          videoId={videoId}
          updateTags={update}
        />
      </div>
      <TagsList
        className={clsx(["mt-1"])}
        tags={tags}
        videoId={videoId}
        edit={edit}
        updateTags={update}
      />
    </div>
  );
};

export const EditToggle: React.FC<{
  className?: string;
  edit: boolean;
  toggleEdit(v: boolean): void;
}> = ({ className, edit, toggleEdit }) => {
  const login = useIsLoggedIn();

  if (!login) return null;

  return (
    <div className={clsx(className)}>
      <label className={clsx(["flex"])}>
        <PencilSquareIcon className={clsx(["w-4"], ["h-4"])} />
        <input
          type="checkbox"
          value={edit ? "edit" : undefined}
          onChange={(e) => {
            toggleEdit(e.target.value !== "edit");
          }}
        />
      </label>
    </div>
  );
};
