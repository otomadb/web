"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";

import Button from "~/components/Button";
import { PlusPictogram, XMarkPictogram } from "~/components/Pictogram";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";

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
          ["grow", "shrink-0"],
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
                <TextInput2
                  size={"small"}
                  className={clsx(["w-full"], ["grow"])}
                  placeholder="タグの主な名前"
                  value={primaryName}
                  onChange={(v) => setPrimaryName(v)}
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
                <TextInput2
                  size="small"
                  className={clsx(["w-full"], ["grow"])}
                  placeholder="タグの追加の名前"
                  value={extraNameInput}
                  onChange={(v) => setExtraNameInput(v)}
                />
                <Button
                  className={clsx(["shrink-0"])}
                  color="blue"
                  size="small"
                  Pictogram={PlusPictogram}
                  onClick={() => {
                    if (!setExtraNameInput) return;
                    dispatchExtraNames({
                      type: "append",
                      name: extraNameInput,
                    });
                    setExtraNameInput("");
                  }}
                />
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
                      ["grow"],
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
                  <Button
                    size="small"
                    color="red"
                    className={clsx(["shrink-0"])}
                    onClick={() => dispatchExtraNames({ type: "remove", name })}
                    Pictogram={XMarkPictogram}
                  />
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
              size="medium"
              limit={3}
              className={clsx(["mt-1"])}
              behavior={{
                mode: "simple",
                handleSelect: (tagId: string) =>
                  dispatchExplicitParentTag({ type: "set", tagId }),
              }}
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
              size="medium"
              limit={3}
              className={clsx(["mt-1"])}
              behavior={{
                mode: "simple",
                handleSelect: (tagId: string) =>
                  dispatchImplicitParentTags({ type: "append", tagId }),
              }}
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
      <div className={clsx(["shrink-0"])}>
        <Button
          submit
          className={clsx(["shrink-0"])}
          color="blue"
          size="small"
          Pictogram={PlusPictogram}
          text="追加"
          disabled={!ready}
        />
      </div>
    </form>
  );
};
