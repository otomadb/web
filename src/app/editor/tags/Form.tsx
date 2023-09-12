"use client";

import "client-only";

import clsx from "clsx";
import React, { useReducer } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { AddTagForm } from "./AddTagForm/AddTagForm";
import { Semitags } from "./Semitags";

export const Query = graphql(`
  query EditorTagsPage_Form {
    ...EditorTagsPage_Form_Semitags
  }
`);
export const RegisterTagForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  const [{ data }, refetch] = useQuery({
    query: Query,
    requestPolicy: "network-only",
  });
  const [selectingSemitags, dispatch] = useReducer(
    (
      prev: string[],
      action:
        | { type: "append"; id: string }
        | { type: "remove"; id: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...prev, action.id];
        case "remove":
          return prev.filter((id) => id !== action.id);
        case "clear":
          return [];
      }
    },
    []
  );

  return (
    <div style={style} className={clsx(className, ["flex"], ["gap-x-2"])}>
      <div
        className={clsx(
          ["flex-grow", "flex-shrink-0"],
          ["flex", "flex-col", ["gap-y-4"]]
        )}
      >
        <AddTagForm
          onRegistered={() => {
            dispatch({ type: "clear" });
            refetch();
          }}
          resolveSemitags={selectingSemitags}
        />
      </div>
      <Semitags
        className={clsx(["w-[1024px]"], ["flex-shrink-0"])}
        fragment={data}
        selectings={selectingSemitags}
        append={({ id }) => {
          dispatch({ type: "append", id });
        }}
        remove={(id) => dispatch({ type: "remove", id })}
      />
    </div>
  );
};
