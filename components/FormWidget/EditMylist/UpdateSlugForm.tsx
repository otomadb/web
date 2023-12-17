import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { z } from "zod";

import Button from "~/components/Button";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { useCloseFormWidget } from "..";
import { checkSlug } from "../CreateMylist";

const formSchema = z.object({
  slug: checkSlug,
});
type FormSchema = z.infer<typeof formSchema>;

export const EditMylistUpdateSlugFragment = graphql(`
  fragment EditMylist_UpdateSlugForm on Mylist {
    id
    slug
  }
`);
export const MutationUpdateSlug = graphql(`
  mutation EditMylist_UpdateSlug($mylistId: ID!, $newSlug: String!) {
    updateMylistSlug(input: { mylistId: $mylistId, newSlug: $newSlug }) {
      __typename
      ... on UpdateMylistSlugSucceededPayload {
        mylist {
          id
          ...EditMylist
        }
      }
    }
  }
`);
const UpdateSlugForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof EditMylistUpdateSlugFragment>;
}> = ({ className, style, fragment }) => {
  const F = useFragment(EditMylistUpdateSlugFragment, fragment);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      slug: F.slug,
    },
  });
  const [, update] = useMutation(MutationUpdateSlug);
  const toast = useToaster();
  const closer = useCloseFormWidget();
  const router = useRouter();

  return (
    <form
      style={style}
      onSubmit={handleSubmit(async (data) => {
        const rr = await update({ mylistId: F.id, newSlug: data.slug });
        if (
          rr.error ||
          !rr.data ||
          rr.data.updateMylistSlug.__typename !==
            "UpdateMylistSlugSucceededPayload"
        ) {
          toast(<>マイリストの変更に失敗しました</>, { type: "error" });
          closer();
          return;
        }

        toast(<>マイリストの変更に成功しました</>);
        closer();
        router.push(`/me/mylists/${data.slug}`);
      })}
      className={clsx(className, "flex items-start gap-x-2")}
    >
      <label className={clsx("flex grow flex-col gap-y-1")}>
        <div className={clsx("text-xs font-bold text-snow-darker")}>
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
      <Button
        submit
        disabled={!isValid}
        size="small"
        color="blue"
        text="変更する"
        className={clsx("shrink-0")}
      />
    </form>
  );
};
export default UpdateSlugForm;
