"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import z from "zod";

import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import useToaster from "~/components/Toaster/useToaster";
import { graphql } from "~/gql";

export const RenameMutation = graphql(`
  mutation SettingsPage_UseRename($renameTo: String!) {
    changeUserDisplayName(renameTo: $renameTo) {
      __typename
      ... on ChangeUserDisplayNameInvalidNameError {
        name
      }
      ... on ChangeUserDisplayNameSucceededPayload {
        user {
          id
          displayName
        }
      }
    }
  }
`);
export const useRename = ({
  onSucceeded,
}: {
  onSucceeded(
    data: Extract<
      ResultOf<typeof RenameMutation>["changeUserDisplayName"],
      { __typename: "ChangeUserDisplayNameSucceededPayload" }
    >
  ): void;
}) => {
  const [{ fetching }, mutate] = useMutation(RenameMutation);

  const rename = useCallback(
    async (renameTo: string) => {
      const result = await mutate({ renameTo });
      if (result.error || !result.data) {
        return;
      }
      switch (result.data.changeUserDisplayName.__typename) {
        case "ChangeUserDisplayNameInvalidNameError": {
          break;
        }
        case "ChangeUserDisplayNameSucceededPayload": {
          onSucceeded(result.data.changeUserDisplayName);
          break;
        }
      }
    },
    [onSucceeded, mutate]
  );
  return [{ fetching }, rename] as const;
};

const formSchema = z.object({
  renameTo: z
    .string()
    .min(1, { message: "1文字以上の名前にしてください。" })
    .max(20, "20文字以下の名前にしてください。"),
});
type FormSchema = z.infer<typeof formSchema>;

export default function RenameForm({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const callToast = useToaster();
  const [{ fetching }, rename] = useRename({
    onSucceeded({ user: { displayName } }) {
      reset();
      callToast(
        <>
          名前を<strong className={clsx("font-bold")}>{displayName}</strong>
          に変更しました
        </>
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ renameTo }) => rename(renameTo))}
      style={style}
      className={clsx(className, "flex items-start justify-between gap-x-2")}
    >
      <div className={clsx("relative flex flex-col gap-y-1")}>
        <TextInput
          {...register("renameTo")}
          disabled={fetching}
          placeholder="新しい表示名"
          className={clsx("w-96")}
        />
        <ErrorMessage
          errors={errors}
          name="renameTo"
          render={({ message }) => (
            <p className={clsx("text-xs text-error-primary")}>{message}</p>
          )}
        />
      </div>
      <div className={clsx("flex shrink-0")}>
        <Button
          submit
          color="blue"
          size="small"
          icon="plus"
          text="変更"
          disabled={fetching}
        />
      </div>
    </form>
  );
}
