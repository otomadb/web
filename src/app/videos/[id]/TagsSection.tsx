"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useContext, useState } from "react";

import { useLoggedIn } from "~/hooks/useLoggedIn";

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
      <TagsList tags={tags} videoId={videoId} edit={edit} updateTags={update} />
      <EditToggle edit={edit} toggleEdit={(v) => setEdit(v)} />
      <TagsEditer
        className={clsx(["mt-2"], ["w-full"], { hidden: !edit })}
        videoId={videoId}
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
  const isLoggedIn = useLoggedIn();

  return (
    <div className={clsx(className)}>
      {!isLoggedIn && <span></span>}
      {isLoggedIn && (
        <label>
          <input
            type="checkbox"
            value={edit ? "edit" : undefined}
            onChange={(e) => {
              toggleEdit(e.target.value !== "edit");
            }}
          />
          {!edit && <span>not edit</span>}
          {edit && <span>editing</span>}
        </label>
      )}
    </div>
  );
};
