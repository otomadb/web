"use client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

export const EditToggle: React.FC<{
  className?: string;
  edit: boolean;
  toggleEdit(v: boolean): void;
}> = ({ className, edit, toggleEdit }) => {
  const login = useIsLoggedIn();

  return (
    <label className={clsx(className, ["flex"], ["items-center"])}>
      <PencilSquareIcon className={clsx(["w-4"], ["h-4"])} />
      <input
        disabled={!login}
        type="checkbox"
        value={edit ? "edit" : undefined}
        onChange={(e) => {
          if (!login) return;
          toggleEdit(e.target.value !== "edit");
        }}
      />
    </label>
  );
};
