import clsx from "clsx";

import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";

import { SemitagButton } from "./SemitagButton";
import { TagButton } from "./TagButton";
import useRequestFormEditSemitaggings from "./useRequestFormEditSemitaggings";
import useRequestFormEditTaggings from "./useRequestFormEditTaggings";

export const EditorablePart = ({
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
  isIncludeSemitag,
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
    "semitaggings" | "appendSemitag" | "removeSemitag" | "isIncludeSemitag"
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
        <div className={clsx("text-xs font-bold text-slate-400")}>タイトル</div>
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
            className={clsx("shrink-0 py-0.5 text-xs font-bold text-slate-400")}
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
          className={clsx("shrink-0 py-0.5 text-xs font-bold text-slate-400")}
        >
          追加される仮タグ
        </div>
        {semitaggings.length === 0 && (
          <div className={clsx("shrink-0 self-center text-xs text-slate-400")}>
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
                selected={isIncludeSemitag(name)}
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
          handleSelect={(tagId, fragment) => {
            appendTag(tagId, fragment);
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
          showAdditional={(query) => !isIncludeSemitag(query)}
          handleAdditionalClicked={(query) => appendSemitag(query)}
        />
      </div>
    </div>
  );
};

export const ButtonsPart = ({
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
    <div
      style={style}
      className={clsx(
        className,
        "mt-auto flex w-full shrink-0 justify-between"
      )}
    >
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
export const Tab = ({
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
            "cursor-pointer select-none rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs font-bold text-slate-400 aria-checked:cursor-default aria-checked:border-slate-600 aria-checked:bg-slate-700 aria-checked:text-slate-400 aria-disabled:cursor-default aria-disabled:border-slate-800 aria-disabled:bg-slate-900 aria-disabled:text-slate-700 hover:bg-slate-800"
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
