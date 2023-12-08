import clsx from "clsx";
import { useMemo, useReducer } from "react";

import UserPageLink from "~/app/(v2)/users/[name]/Link";
import Button from "~/components/Button";
import TagSearcher from "~/components/TagSearcher";
import { TextInput2 } from "~/components/TextInput";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { TagButton, TagButtonFragment } from "../../CommonTag/Button";
import { SemitagButton } from "./SemitagButton";

export const useRegisterFormEditTaggings = () => {
  const [tags, dispatchTags] = useReducer(
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
          return [
            ...new Set([
              ...prev,
              { id: action.tagId, fragment: action.fragment },
            ]),
          ];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );
  const tagIds = useMemo(() => tags.map(({ id }) => id), [tags]);

  return {
    tags,
    tagIds,
    isSelecting: (tagId: string) => tagIds.includes(tagId),
    appendTag: (
      tagId: string,
      fragment: FragmentType<typeof TagButtonFragment>
    ) => dispatchTags({ type: "append", tagId, fragment }),
    removeTag: (tagId: string) => dispatchTags({ type: "remove", tagId }),
    clearTags: () => dispatchTags({ type: "clear" }),
  };
};

export const useRegisterFormEditSemitaggings = () => {
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
    () => semitaggings.map(({ name }) => name),
    [semitaggings]
  );

  return {
    semitaggings,
    semitagNames: payload,
    isSelectingSemitag: (name: string) =>
      semitaggings.map(({ name }) => name).includes(name),
    appendSemitag: (name: string) => dispatchSemitags({ type: "append", name }),
    removeSemitag: (name: string) => dispatchSemitags({ type: "remove", name }),
    clearSemitags: () => dispatchSemitags({ type: "clear" }),
  };
};

export const RegisterFormEditorablePart = ({
  className,
  style,
  title,
  setTitle,
  tags,
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
  ReturnType<typeof useRegisterFormEditTaggings>,
  "tags" | "appendTag" | "removeTag"
> &
  Pick<
    ReturnType<typeof useRegisterFormEditSemitaggings>,
    "semitaggings" | "appendSemitag" | "removeSemitag" | "isSelectingSemitag"
  >) => {
  return (
    <div
      style={style}
      className={clsx(className, "flex flex-col justify-between gap-y-2")}
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
          {tags.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {tags.map(({ id: tagId, fragment }) => (
                <TagButton
                  key={tagId}
                  tagId={tagId}
                  fragment={fragment}
                  append={(f) => appendTag(tagId, f)}
                  remove={() => removeTag(tagId)}
                  selected={tags.map(({ id }) => id).includes(tagId)}
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
          showAdditional={(query) => !isSelectingSemitag(query)}
          handleAdditionalClicked={(query) => appendSemitag(query)}
        />
      </div>
    </div>
  );
};

export const RegisterFormButtonsPart = ({
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
        text="登録する"
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

export type RegisterFormTabChoice = "SOURCE" | "REQUEST";
export const RegisterFormTabPicker = ({
  className,
  choices,
  setTab,
  current,
}: {
  className?: string;
  choices: Record<RegisterFormTabChoice, boolean>;
  current: RegisterFormTabChoice;
  setTab(p: RegisterFormTabChoice): void;
}) => {
  return (
    <div className={clsx(className, "flex gap-x-2")}>
      {choices.SOURCE && (
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
      {choices.REQUEST && (
        <div
          className={clsx(
            "cursor-pointer select-none rounded border px-2 py-1 text-xs font-bold",
            "border-obsidian-lighter bg-obsidian-primary text-snow-darker hover:bg-obsidian-lighter",
            "aria-checked:cursor-default aria-checked:border-obsidian-lightest aria-checked:bg-obsidian-lighter aria-checked:text-snow-primary"
          )}
          onClick={() => setTab("REQUEST")}
          aria-checked={current === "REQUEST"}
        >
          リクエスト情報
        </div>
      )}
    </div>
  );
};

export const RegisterFormRequestPartFragment = graphql(`
  fragment RegisterFormRequestPart on RegistrationRequest {
    title
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
    taggings {
      id
      tag {
        id
        ...CommonTag
      }
    }
    semitaggings {
      id
      name
    }
  }
`);
export const RegisterFormRequestPart = ({
  className,
  fragment,
  appendSemitag,
  appendTag,
  isSelectingSemitag: isIncludeSemitag,
  removeSemitag,
  removeTag,
  isSelectingTag: isSelecting,
}: {
  className?: string;
  fragment: FragmentType<typeof RegisterFormRequestPartFragment>;
  isSelectingTag: ReturnType<typeof useRegisterFormEditTaggings>["isSelecting"];
  isSelectingSemitag: ReturnType<
    typeof useRegisterFormEditSemitaggings
  >["isSelectingSemitag"];
} & Pick<
  ReturnType<typeof useRegisterFormEditTaggings>,
  "appendTag" | "removeTag"
> &
  Pick<
    ReturnType<typeof useRegisterFormEditSemitaggings>,
    "appendSemitag" | "removeSemitag"
  >) => {
  const { title, requestedBy, taggings, semitaggings } = useFragment(
    RegisterFormRequestPartFragment,
    fragment
  );
  return (
    <div className={clsx(className, "flex flex-col gap-y-2")}>
      <div className={clsx("flex flex-col gap-y-2")}>
        <div className={clsx("flex items-center")}>
          <p className={clsx("grow text-sm text-snow-darker")}>
            <span className={clsx("font-bold text-snow-primary")}>{title}</span>
            としてリクエストされています
          </p>
          <div className={clsx("shrink-0")}>
            <UserPageLink fragment={requestedBy}>
              <UserIcon size={24} fragment={requestedBy} />
            </UserPageLink>
          </div>
        </div>
        <div className={clsx("flex flex-col gap-y-2")}>
          <div className={clsx("shrink-0 py-0.5 text-xs text-snow-darker")}>
            タグ
          </div>
          {taggings.length === 0 && (
            <div className={clsx("shrink-0 text-xs text-snow-darkest")}>
              なし
            </div>
          )}
          {taggings.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {taggings.map((tagging) => (
                <TagButton
                  key={tagging.id}
                  fragment={tagging.tag}
                  tagId={tagging.tag.id}
                  append={(f) => appendTag(tagging.tag.id, f)}
                  remove={() => removeTag(tagging.tag.id)}
                  selected={isSelecting(tagging.tag.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={clsx("flex flex-col gap-y-2")}>
          <div className={clsx("shrink-0 py-0.5 text-xs text-snow-darker")}>
            仮タグ
          </div>
          {semitaggings.length === 0 && (
            <div className={clsx("shrink-0 text-xs text-snow-darkest")}>
              なし
            </div>
          )}
          {semitaggings.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {semitaggings.map((semitagging) => (
                <SemitagButton
                  key={semitagging.id}
                  name={semitagging.name}
                  append={() => appendSemitag(semitagging.name)}
                  remove={() => removeSemitag(semitagging.name)}
                  selected={isIncludeSemitag(semitagging.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
