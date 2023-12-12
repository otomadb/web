import clsx from "clsx";
import { useMemo, useReducer } from "react";

import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import { FragmentType } from "~/gql";

import { TagButton, TagButtonFragment } from "../../CommonTag/Button";
import { SemitagButton } from "./SemitagButton";

export const useRequestFormEditTaggings = () => {
  const [taggings, dispatchTags] = useReducer(
    (
      prev: { id: string; fragment: FragmentType<typeof TagButtonFragment> }[],
      action:
        | {
            type: "append";
            tagId: string;
            fragment: FragmentType<typeof TagButtonFragment>;
          }
        | { type: "remove"; tagId: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          if (prev.map(({ id }) => id).includes(action.tagId)) return prev;
          return [...prev, { id: action.tagId, fragment: action.fragment }];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );
  const payload = useMemo(
    () => taggings.map(({ id }) => ({ tagId: id, note: null })),
    [taggings]
  );

  return {
    taggings,
    taggingsPayload: payload,
    isSelecting: (tagId: string) =>
      taggings.map(({ id }) => id).includes(tagId),
    appendTag: (
      tagId: string,
      fragment: FragmentType<typeof TagButtonFragment>
    ) => dispatchTags({ type: "append", tagId, fragment }),
    removeTag: (tagId: string) => dispatchTags({ type: "remove", tagId }),
    clearTags: () => dispatchTags({ type: "clear" }),
  };
};

export const useRequestFormEditSemitaggings = () => {
  const [semitaggings, dispatchSemitags] = useReducer(
    (
      prev: { name: string }[],
      action:
        | { type: "append"; name: string }
        | { type: "remove"; name: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, { name: action.name }])];
        case "remove":
          return prev.filter(({ name }) => name !== action.name);
        case "clear":
          return [];
      }
    },
    []
  );
  const payload = useMemo(
    () => semitaggings.map(({ name }) => ({ name, note: null })),
    [semitaggings]
  );

  return {
    semitaggings,
    semitaggingsPayload: payload,
    isSelectingSemitag: (name: string) =>
      semitaggings.map(({ name }) => name).includes(name),
    appendSemitag: (name: string) => dispatchSemitags({ type: "append", name }),
    removeSemitag: (name: string) => dispatchSemitags({ type: "remove", name }),
    clearSemitags: () => dispatchSemitags({ type: "clear" }),
  };
};

export const RequestsFormEditorablePart = ({
  className,
  style,
  title,
  setTitle,
  taggings,
  appendTag,
  removeTag,
  semitaggings,
  appendSemitag,
  removeSemitag,
  isSelectingSemitag,
}: {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  setTitle(v: string): void;
} & Pick<
  ReturnType<typeof useRequestFormEditTaggings>,
  "taggings" | "appendTag" | "removeTag"
> &
  Pick<
    ReturnType<typeof useRequestFormEditSemitaggings>,
    "semitaggings" | "appendSemitag" | "removeSemitag" | "isSelectingSemitag"
  >) => {
  return (
    <div
      style={style}
      className={clsx(
        className,
        "mt-auto flex w-full shrink-0 flex-col justify-between gap-y-2"
      )}
    >
      <label className={clsx("flex flex-col gap-y-1")}>
        <div className={clsx("text-xs font-bold text-snow-darker")}>
          タイトル
        </div>
        <TextInput2
          size="small"
          placeholder={"動画タイトル"}
          value={title}
          onChange={(v) => setTitle(v)}
        />
      </label>
      <div className={clsx("flex flex-col gap-y-2")}>
        <div className={clsx("flex gap-x-2")}>
          <div
            className={clsx(
              "shrink-0 py-0.5 text-xs font-bold text-snow-darker"
            )}
          >
            追加されるタグ
          </div>
          {taggings.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {taggings.map(({ id: tagId, fragment }) => (
                <TagButton
                  key={tagId}
                  tagId={tagId}
                  fragment={fragment}
                  append={(f) => appendTag(tagId, f)}
                  remove={() => removeTag(tagId)}
                  selected={taggings.map(({ id }) => id).includes(tagId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={clsx("flex gap-x-2")}>
        <div
          className={clsx("shrink-0 py-0.5 text-xs font-bold text-snow-darker")}
        >
          追加される仮タグ
        </div>
        {semitaggings.length === 0 && (
          <div
            className={clsx("shrink-0 self-center text-xs text-snow-darker")}
          >
            なし
          </div>
        )}
        {semitaggings.length > 0 && (
          <div className={clsx("flex flex-wrap gap-1")}>
            {semitaggings.map(({ name }) => (
              <SemitagButton
                key={name}
                name={name}
                append={() => appendSemitag(name)}
                remove={() => removeSemitag(name)}
                selected={isSelectingSemitag(name)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={clsx("mt-auto shrink-0")}>
        <TagSearcher
          limit={5}
          size="small"
          className={clsx("z-10 w-full")}
          behavior={{
            mode: "simple",
            handleSelect: (tagId, fragment) => {
              appendTag(tagId, fragment);
            },
          }}
          Additional={({ query }) => (
            <div className={clsx("flex items-center text-sm text-snow-darker")}>
              <div
                className={clsx(
                  "rounded-sm border border-slate-700 bg-slate-900 px-0.5 py-0.25 text-xs font-bold text-snow-primary"
                )}
              >
                {query}
              </div>
              を仮タグとして追加
            </div>
          )}
          showAdditional={(query) => !isSelectingSemitag(query)}
          handleAdditionalClicked={(query) => appendSemitag(query)}
        />
      </div>
    </div>
  );
};

export const RequestsFormButtonsPart = ({
  className,
  style,
  handleCancel,
  disabled,
}: {
  className?: string;
  style?: React.CSSProperties;
  handleCancel(): void;
  disabled: boolean;
}) => {
  return (
    <div style={style} className={clsx(className, "flex justify-between")}>
      <Button
        submit
        text="リクエストする"
        size="medium"
        color="blue"
        disabled={disabled}
      />
      <Button
        className={clsx()}
        onClick={() => {
          handleCancel();
        }}
        text="戻る"
        size="medium"
        color="green"
      />
    </div>
  );
};

export type TabChoice = "SOURCE";
export const RequestsFormTabPicker = ({
  className,
  choices,
  setTab,
  current,
}: {
  className?: string;
  choices: TabChoice[];
  current: TabChoice;
  setTab(p: TabChoice): void;
}) => {
  return (
    <div className={clsx(className, "flex gap-x-2")}>
      {choices.includes("SOURCE") && (
        <div
          className={clsx(
            "cursor-pointer select-none rounded border px-2 py-1 text-xs font-bold",
            "border-obsidian-lighter bg-obsidian-primary text-snow-darker hover:bg-obsidian-lighter",
            "aria-checked:cursor-default aria-checked:border-obsidian-lightest aria-checked:bg-obsidian-lighter aria-checked:text-snow-primary"
          )}
          onClick={() => setTab("SOURCE")}
          aria-checked={current === "SOURCE"}
        >
          ソース情報
        </div>
      )}
    </div>
  );
};
