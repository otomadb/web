"use client";

import clsx from "clsx";
import { CSSProperties, useState } from "react";
import { useMutation, useQuery } from "urql";

import Button from "~/components/Button";
import CommonTag from "~/components/CommonTag";
import { TagPictogram } from "~/components/Pictogram";
import useToaster from "~/components/Toaster/useToaster";
import { graphql } from "~/gql";
import { TypeCategoryTagType } from "~/gql/graphql";

import { FormWrapper2 } from "../FormWrapper";

export const QueryFetchCategories = graphql(`
  query TagCategorizer($tagId: ID!) {
    getAllTypeCategoryTag {
      type
      tag {
        id
        name
      }
    }
    getTag(id: $tagId) {
      ...CommonTag
      id
      parents {
        nodes {
          parent {
            id
            name
            isCategoryTag
          }
        }
      }
    }
  }
`);

export const MutationAddCategory = graphql(`
  mutation TagCategorizer_AddCategory($tagId: ID!, $categoryId: ID!) {
    registerTagParentRelation(
      input: { parentId: $categoryId, childId: $tagId, explicit: false }
    ) {
      __typename
      ... on RegisterTagParentRelationSucceededPayload {
        relation {
          id
          child {
            id
            type
          }
        }
      }
    }
  }
`);

const TagCategorizerForm = ({
  className,
  style,
  tagId,
  closeMe,
}: {
  className?: string;
  style?: CSSProperties;
  tagId: string;
  closeMe(): void;
}) => {
  const toast = useToaster();

  const [{ data, fetching }] = useQuery({
    query: QueryFetchCategories,
    variables: {
      tagId,
    },
  });
  const [, addCategory] = useMutation(MutationAddCategory);
  const [selected, setSelected] = useState<
    { type: TypeCategoryTagType; id: string } | undefined
  >(undefined);

  return (
    <FormWrapper2
      className={clsx(className)}
      style={style}
      Icon={TagPictogram}
      Title={<>タグをカテゴリーに分類する</>}
    >
      <form
        className={clsx("flex h-full w-full flex-col gap-y-6")}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!selected) return;

          const a = await addCategory({ tagId, categoryId: selected.id });
          if (a.error || !a.data) {
            toast(<>更新に失敗しました</>, { type: "error" });
            closeMe();
            return;
          }
          switch (a.data.registerTagParentRelation.__typename) {
            case "RegisterTagParentRelationSucceededPayload":
              toast(<>更新に成功しました</>);
              closeMe();
              break;
            default:
              toast(<>更新に失敗しました</>, { type: "error" });
              closeMe();
              return;
          }
        }}
      >
        {fetching && <p className={clsx("text-snow-darker")}>Loading</p>}
        {data && (
          <div className={clsx("flex h-full flex-col gap-y-4")}>
            <div className={clsx("flex shrink-0 text-sm text-snow-primary")}>
              <CommonTag fragment={data.getTag} size="small" className="" />
              に新しいカテゴリーを追加する．
            </div>
            <div className={clsx("grid grow grid-cols-4 flex-wrap gap-2")}>
              {data.getAllTypeCategoryTag.map(({ type, tag }) => (
                <div
                  key={type}
                  role={"radio"}
                  aria-checked={selected?.type === type}
                  aria-disabled={data.getTag.parents.nodes.some(
                    ({ parent }) => parent.id === tag.id
                  )}
                  onClick={(e) => {
                    if (
                      e.currentTarget.getAttribute("aria-disabled") !== "true"
                    )
                      setSelected({ type, id: tag.id });
                  }}
                  className={clsx(
                    "group/button flex cursor-pointer items-center rounded border border-obsidian-lighter bg-obsidian-darker p-2 aria-disabled:cursor-auto",
                    "aria-disabled:bg-obsidian-primary",
                    {
                      [TypeCategoryTagType.Character]:
                        "aria-checked:bg-tag-character-bg aria-checked:border-tag-character-frame aria-disabled-false:hover:border-tag-character-frame aria-disabled-false:hover:bg-tag-character-bg",
                      [TypeCategoryTagType.Class]:
                        "aria-checked:bg-tag-class-bg aria-checked:border-tag-class-frame aria-disabled-false:hover:bg-tag-class-bg aria-disabled-false:hover:border-tag-class-frame",
                      [TypeCategoryTagType.Copyright]:
                        "aria-checked:bg-tag-copyright-bg aria-checked:border-tag-copyright-frame aria-disabled-false:hover:bg-tag-copyright-bg aria-disabled-false:hover:border-tag-copyright-frame",
                      [TypeCategoryTagType.Event]:
                        "aria-checked:bg-tag-event-bg aria-checked:border-tag-event-frame aria-disabled-false:hover:bg-tag-event-bg aria-disabled-false:hover:border-tag-event-frame",
                      [TypeCategoryTagType.Music]:
                        "aria-checked:bg-tag-music-bg aria-checked:border-tag-music-frame aria-disabled-false:hover:bg-tag-music-bg aria-disabled-false:hover:border-tag-music-frame",
                      [TypeCategoryTagType.Phrase]:
                        "aria-checked:bg-tag-phrase-bg aria-checked:border-tag-phrase-frame aria-disabled-false:hover:bg-tag-phrase-bg aria-disabled-false:hover:border-tag-phrase-frame",
                      [TypeCategoryTagType.Series]:
                        "aria-checked:bg-tag-series-bg aria-checked:border-tag-series-frame aria-disabled-false:hover:bg-tag-series-bg aria-disabled-false:hover:border-tag-series-frame",
                      [TypeCategoryTagType.Style]:
                        "aria-checked:bg-tag-style-bg aria-checked:border-tag-style-frame aria-disabled-false:hover:bg-tag-style-bg aria-disabled-false:hover:border-tag-style-frame",
                      [TypeCategoryTagType.Tactics]:
                        "aria-checked:bg-tag-tactics-bg aria-checked:border-tag-tactics-frame aria-disabled-false:hover:bg-tag-tactics-bg aria-disabled-false:hover:border-tag-tactics-frame",
                    }[type]
                  )}
                >
                  <div
                    className={clsx(
                      "text-sm group-aria-checked/button:font-bold group-aria-disabled/button:text-snow-darkest",
                      {
                        [TypeCategoryTagType.Character]:
                          "text-tag-character-vivid",
                        [TypeCategoryTagType.Class]: "text-tag-class-vivid",
                        [TypeCategoryTagType.Copyright]:
                          "text-tag-copyright-vivid",
                        [TypeCategoryTagType.Event]: "text-tag-event-primary",
                        [TypeCategoryTagType.Music]: "text-tag-music-primary",
                        [TypeCategoryTagType.Phrase]: "text-tag-phrase-primary",
                        [TypeCategoryTagType.Series]: "text-tag-series-primary",
                        [TypeCategoryTagType.Style]: "text-tag-style-primary",
                        [TypeCategoryTagType.Tactics]:
                          "text-tag-tactics-primary",
                      }[type]
                    )}
                  >
                    {tag.name}
                  </div>
                </div>
              ))}
            </div>
            <div className={clsx("shrink-0")}>
              <Button
                submit
                text="追加する"
                size="medium"
                color="blue"
                disabled={!selected}
              />
            </div>
          </div>
        )}
      </form>
    </FormWrapper2>
  );
};

export default TagCategorizerForm;
