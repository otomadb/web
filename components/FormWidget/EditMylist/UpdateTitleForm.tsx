import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { z } from "zod";

import Button from "~/components/Button";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { checkTitle } from "../CreateMylist";

const formSchema = z.object({
  title: checkTitle,
});
type FormSchema = z.infer<typeof formSchema>;

export const EditMylistUpdateTitleFragment = graphql(`
  fragment EditMylist_UpdateTitleForm on Mylist {
    id
    title
  }
`);
export const MutationUpdateTitle = graphql(`
  mutation EditMylist_UpdateTitle($mylistId: ID!, $newTitle: String!) {
    updateMylistTitle(input: { mylistId: $mylistId, newTitle: $newTitle }) {
      __typename
      ... on UpdateMylistTitleSucceededPayload {
        mylist {
          id
          ...EditMylist
        }
      }
    }
  }
`);
const UpdateTitleForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof EditMylistUpdateTitleFragment>;
}> = ({ className, style, fragment }) => {
  const F = useFragment(EditMylistUpdateTitleFragment, fragment);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: F.title,
    },
  });
  const [, update] = useMutation(MutationUpdateTitle);
  const toast = useToaster();
  const router = useRouter();

  return (
    <form
      style={style}
      onSubmit={handleSubmit(async (data) => {
        const rr = await update({ mylistId: F.id, newTitle: data.title });
        if (
          rr.error ||
          !rr.data ||
          rr.data.updateMylistTitle.__typename !==
            "UpdateMylistTitleSucceededPayload"
        ) {
          toast(<>マイリストの変更に失敗しました</>, { type: "error" });
          return;
        }

        toast(<>マイリストの変更に成功しました</>);
        router.refresh();
      })}
      className={clsx(className, "flex items-start gap-x-2")}
    >
      <label className={clsx("flex grow flex-col gap-y-1")}>
        <div className={clsx("text-xs font-bold text-snow-darker")}>
          タイトル
        </div>
        <div className={clsx("grow gap-y-2")}>
          <input
            {...register("title")}
            placeholder="例: mads-2023"
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
export default UpdateTitleForm;
