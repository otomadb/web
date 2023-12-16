"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { z } from "zod";

import Button from "~/components/Button";
import { PlusPictogram } from "~/components/Pictogram";
import useToaster from "~/components/Toaster/useToaster";
import { graphql } from "~/gql";
import { MylistShareRange } from "~/gql/graphql";

import { useCloseFormWidget } from "..";
import { FormWrapper2 } from "../FormWrapper";

export const QueryFetchCategories = graphql(`
  query TagCategorizer($tagId: ID!) {
    getAllAbstractGroups {
      keyword
      name
    }
    getTag(id: $tagId) {
      ...CommonTag
      id
      allBelongTo {
        group {
          keyword
        }
      }
    }
  }
`);

export const checkTitle = z
  .string()
  .min(1, { message: "1文字以上50文字以下で入力してください" })
  .max(50, { message: "1文字以上50文字以下で入力してください" });

export const checkSlug = z
  .string()
  .min(1, { message: "1文字以上50文字以下で入力してください" })
  .max(50, { message: "1文字以上50文字以下で入力してください" })
  .regex(/[a-zA-Z0-9]/, { message: "半角英数字のみで入力してください" })
  .refine((v) => v !== "likes", { message: '"likes"は使用できません' });

const formSchema = z.object({
  slug: checkSlug,
  title: checkTitle,
  range: z.union([
    z.literal("PUBLIC"),
    z.literal("SHARE_RANGE"),
    z.literal("PRIVATE"),
  ]),
});
type FormSchema = z.infer<typeof formSchema>;

export const MutationCreateMylist = graphql(`
  mutation CreateMylist_Create(
    $title: String!
    $slug: String!
    $range: MylistShareRange!
  ) {
    createMylist(input: { title: $title, slug: $slug, range: $range }) {
      __typename
      ... on CreateMylistSucceededPayload {
        mylist {
          id
          ...YouMylistPageLink
        }
      }
    }
  }
`);

const CreateMylistForm = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [, create] = useMutation(MutationCreateMylist);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      range: "PRIVATE",
    },
    mode: "onBlur",
  });

  const toast = useToaster();
  const closer = useCloseFormWidget();
  const router = useRouter();

  return (
    <FormWrapper2
      className={clsx(className)}
      style={style}
      Icon={PlusPictogram}
      Title={<>マイリストを作成する</>}
    >
      <form
        className={clsx("flex h-full w-full flex-col gap-y-6")}
        onSubmit={handleSubmit(async (data) => {
          const rr = await create({
            title: data.title,
            slug: data.slug,
            range:
              data.range === "PUBLIC"
                ? MylistShareRange.Public
                : MylistShareRange.Private,
          });
          if (
            rr.error ||
            !rr.data ||
            rr.data.createMylist.__typename !== "CreateMylistSucceededPayload"
          ) {
            toast(<>マイリストの作成に失敗しました</>, { type: "error" });
            closer();
            return;
          }

          toast(<>マイリストの作成に成功しました！</>);
          closer();
          router.refresh();
        })}
      >
        <label className={clsx("flex items-start")}>
          <div
            className={clsx("w-48 shrink-0 text-xs font-bold text-snow-darker")}
          >
            タイトル
          </div>
          <div className={clsx("grow gap-y-2")}>
            <input
              {...register("title")}
              placeholder="例: 2023年良かった音MAD"
              className={clsx(
                "w-full border-b border-obsidian-lightest bg-transparent px-2 py-0.5 text-snow-primary placeholder:text-obsidian-lightest"
              )}
            ></input>
            {errors.title && (
              <p className={clsx("text-xs text-error-primary")}>
                {errors.title.message}
              </p>
            )}
          </div>
        </label>
        <label className={clsx("flex items-start")}>
          <div
            className={clsx("w-48 shrink-0 text-xs font-bold text-snow-darker")}
          >
            管理しやすいキーワード
          </div>
          <div className={clsx("grow gap-y-2")}>
            <input
              {...register("slug")}
              placeholder="例: mads-2023"
              className={clsx(
                "w-full border-b border-obsidian-lightest bg-transparent px-2 py-0.5 text-snow-primary placeholder:text-obsidian-lightest"
              )}
            ></input>
            {errors.slug && (
              <p className={clsx("text-xs text-error-primary")}>
                {errors.slug.message}
              </p>
            )}
          </div>
        </label>
        <div className={clsx("flex items-center")}>
          <div className={clsx("w-48 text-xs font-bold text-snow-darker")}>
            公開範囲
          </div>
          <div className={clsx("grid grow grid-cols-3")}>
            <label className={clsx("flex")}>
              <input
                {...register("range")}
                type="radio"
                value={"PUBLIC"}
              ></input>
              <div className={clsx("ml-2 text-snow-primary")}>公開</div>
            </label>
            <label className={clsx("flex")}>
              <input
                {...register("range")}
                type="radio"
                value={"PRIVATE"}
              ></input>
              <div className={clsx("ml-2 text-snow-primary")}>非公開</div>
            </label>
          </div>
        </div>
        <Button
          submit
          disabled={!isValid}
          color="blue"
          size="medium"
          className={clsx("ml-auto mt-auto")}
          text={"作成する"}
        />
      </form>
    </FormWrapper2>
  );
};

export default CreateMylistForm;
