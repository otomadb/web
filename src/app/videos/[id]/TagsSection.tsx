"use client";

import "client-only";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

import { useTags } from "./context";
import { TagsEditer } from "./TagsEditer";
import { TagsList } from "./TagsList";

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

export const TagsSection: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [edit, setEdit] = useState(false);
  const tags = useTags();

  return (
    <div className={clsx(className)}>
      <div className={clsx(["h-8"], ["flex", ["items-center"]])}>
        <EditToggle edit={edit} toggleEdit={(v) => setEdit(v)} />
        <TagsEditer className={clsx(["ml-2"], ["w-full"], { hidden: !edit })} />
      </div>
      <TagsList className={clsx(["mt-1"])} tags={tags} edit={edit} />
    </div>
  );
};
