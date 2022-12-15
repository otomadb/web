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
