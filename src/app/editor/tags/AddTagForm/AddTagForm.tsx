"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";

import { BlueButton, RedButton } from "~/components/Button";
import { PlusIcon, XMarkIcon } from "~/components/Icons";
import { TagSearcher } from "~/components/TagSearcher";
import { useToaster } from "~/components/Toaster";

import { SelectedTag } from "./SelectedTag";
import { SucceededToast } from "./SucceededToast";
import { useRegister } from "./useRegister";

export const AddTagForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onRegistered(): void;
  resolveSemitags: string[];
}> = ({ className, style, onRegistered, resolveSemitags }) => {
  const [primaryName, setPrimaryName] = useState<string>("");

  const [extraNameInput, setExtraNameInput] = useState("");
  const [extraNames, dispatchExtraNames] = useReducer(
    (
      prev: string[],
      action:
        | { type: "append"; name: string }
        | { type: "remove"; name: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, action.name])];
        case "remove":
          return prev.filter((id) => id !== action.name);
        case "clear":
          return [];
      }
    },
    []
  );

  const [selectingExplicitParentTag, dispatchExplicitParentTag] = useReducer(
    (
      _: string | undefined,
      action: { type: "set"; tagId: string } | { type: "clear" }
    ) => {
      switch (action.type) {
        case "set":
          return action.tagId;
        case "clear":
          return undefined;
      }
    },
    undefined
  );

  const [selectingImplicitParentTags, dispatchImplicitParentTags] = useReducer(
    (
      prev: string[],
      action:
        | { type: "append"; tagId: string }
        | { type: "remove"; tagId: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, action.tagId])];
        case "remove":
          return prev.filter((id) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );

  const ready = useMemo(() => {
    if (primaryName.length === 0) return false;
    return true;
  }, [primaryName]);

  const callToast = useToaster();
  const register = useRegister({
    onSuccess(data) {
      setPrimaryName("");
      dispatchExtraNames({ type: "clear" });
      dispatchExplicitParentTag({ type: "clear" });
      dispatchImplicitParentTags({ type: "clear" });
      onRegistered();
      callToast(<SucceededToast fragment={data} />);
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!ready) return;
      await register({
        primaryName,
        extraNames,
        explicitParent: selectingExplicitParentTag,
        implicitParents: selectingImplicitParentTags,
        resolveSemitags,
      });
    },
    [
      ready,
      register,
      primaryName,
      extraNames,
      selectingExplicitParentTag,
      selectingImplicitParentTags,
      resolveSemitags,
    ]
  );

  return (
    <form
      className={clsx(
        className,
        ["flex", "flex-col"],
        [["px-4"], ["py-4"]],
        ["border", "border-slate-700", "rounded"],
        ["bg-slate-900"]
      )}
      style={style}
      onSubmit={handleSubmit}
    >
      <div className={clsx()}>
        <div className={clsx(["text-sm", "font-bold", "text-slate-400"])}>
          タグの追加
        </div>
      </div>
      <div
        className={clsx(
          ["mt-4", "mb-6"],
          ["flex-grow", "flex-shrink-0"],
          ["flex", "flex-col", ["gap-y-4"]]
        )}
      >
        <div className={clsx(["flex", "flex-col"])}>
          <label>
            <div className={clsx(["text-xs"], ["text-slate-400"])}>
              主な名前
            </div>
            <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
              <div className={clsx(["w-full"])}>
                <input
                  type={"text"}
                  placeholder="タグの主な名前"
                  className={clsx(
                    ["w-full"],
                    ["flex-grow"],
                    ["py-1", "px-2"],
                    ["bg-slate-950"],
                    ["border", "border-slate-700", "rounded"],
                    ["text-sm", "text-slate-300", "placeholder-slate-600"]
                  )}
                  onChange={(e) => setPrimaryName(e.target.value)}
                  value={primaryName}
                />
              </div>
            </div>
          </label>
        </div>
        <div className={clsx(["flex", "flex-col"])}>
          <label>
            <div className={clsx(["text-xs"], ["text-slate-400"])}>
              追加の名前
            </div>
            <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
              <div className={clsx(["w-full"], ["flex", "gap-x-2"])}>
                <input
                  type={"text"}
                  placeholder="タグの追加の名前"
                  className={clsx(
                    ["w-full"],
                    ["flex-grow"],
                    ["py-1", "px-2"],
                    ["bg-slate-950"],
                    ["border", "border-slate-700", "rounded"],
                    ["text-sm", "text-slate-300", "placeholder-slate-600"]
                  )}
                  onChange={(e) => setExtraNameInput(e.target.value)}
                  value={extraNameInput}
                />
                <BlueButton
                  type="button"
                  className={clsx(["flex-shrink-0"], ["px-2"])}
                  onClick={() => {
                    if (!setExtraNameInput) return;
                    dispatchExtraNames({
                      type: "append",
                      name: extraNameInput,
                    });
                    setExtraNameInput("");
                  }}
                >
                  <PlusIcon className={clsx(["w-4"], ["h-4"])} />
                </BlueButton>
              </div>
            </div>
          </label>
          {extraNames.length >= 1 && (
            <div
              className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-2"])}
            >
              {extraNames.map((name) => (
                <div key={name} className={clsx(["flex", "gap-x-2"])}>
                  <input
                    className={clsx(
                      ["flex-grow"],
                      ["rounded"],
                      ["text-sm"],
                      [["py-0.5"], ["px-2"]],
                      ["bg-slate-200"],
                      ["border", "border-slate-300"],
                      ["text-slate-500"]
                    )}
                    type="text"
                    disabled={true}
                    value={name}
                  />
                  <RedButton
                    type="button"
                    className={clsx(["flex-shrink-0"], ["px-2"])}
                    onClick={() => dispatchExtraNames({ type: "remove", name })}
                  >
                    <XMarkIcon className={clsx(["w-4"], ["h-4"])} />
                  </RedButton>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={clsx(["flex", "flex-col"])}>
          <label className={clsx(["text-sm"])}>
            <div className={clsx(["text-xs"], ["text-slate-400"])}>
              明示的な親タグ
            </div>
            <TagSearcher
              className={clsx(["mt-1"])}
              handleSelect={(tagId) =>
                dispatchExplicitParentTag({ type: "set", tagId })
              }
              disabled={!!selectingExplicitParentTag}
            />
          </label>
          {selectingExplicitParentTag && (
            <SelectedTag
              className={clsx(["mt-2"])}
              tagId={selectingExplicitParentTag}
              remove={() => dispatchExplicitParentTag({ type: "clear" })}
            />
          )}
        </div>
        <div>
          <label className={clsx(["text-sm"])}>
            <div className={clsx(["text-xs"], ["text-slate-400"])}>
              非明示的な親タグ
            </div>
            <TagSearcher
              className={clsx(["mt-1"])}
              handleSelect={(tagId) =>
                dispatchImplicitParentTags({ type: "append", tagId })
              }
            />
          </label>
          {selectingImplicitParentTags.length >= 1 && (
            <div
              className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-2"])}
            >
              {selectingImplicitParentTags.map((tagId) => (
                <SelectedTag
                  key={tagId}
                  tagId={tagId}
                  remove={() =>
                    dispatchImplicitParentTags({ type: "remove", tagId })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={clsx(["flex-shrink-0"])}>
        <BlueButton
          type="submit"
          className={clsx(["text-md"], ["py-1"], ["px-3"])}
          disabled={!ready}
        >
          追加
        </BlueButton>
      </div>
    </form>
  );
};
