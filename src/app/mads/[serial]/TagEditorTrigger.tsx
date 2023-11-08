"use client";

import "client-only";

import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import TagEditor from "./TagEditor";

export default function TagEditorTrigger({ madId }: { madId: string }) {
  const [open, setOpen] = useState(false);
  const [{ data }] = useQuery({
    query: graphql(`
      query MadPage_CheckTagEditPermission {
        whoami {
          id
          hasRole(role: EDITOR)
        }
      }
    `),
  });

  if (!data?.whoami.hasRole) return null;

  return (
    <>
      <button
        type="button"
        className={clsx("text-sm")}
        onClick={() => setOpen(true)}
      >
        タグを編集する
      </button>
      {open && (
        <div
          className={clsx([
            "fixed inset-0 z-infinity flex items-center justify-center",
          ])}
        >
          <div
            onClick={() => setOpen(false)}
            className={clsx([
              "absolute inset-0 z-0 cursor-pointer bg-black/25",
            ])}
          />
          <TagEditor
            madId={madId}
            close={() => setOpen(false)}
            className={clsx("z-1 w-[960px]")}
          />
        </div>
      )}
    </>
  );
}
