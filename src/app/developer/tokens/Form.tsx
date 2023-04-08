"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";

import useGenerateAccessToken from "./useGenerateAccessToken";

export const formSchema = z.object({});
export type FormSchema = z.infer<typeof formSchema>;

const Form: React.FC<{ show(token: string): void }> = ({ ...props }) => {
  const { handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const generate = useGenerateAccessToken({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFailure() {},
  });

  return (
    <form
      className={clsx(["flex"], ["px-2", "py-1"], ["border"], ["bg-slate-50"])}
      onSubmit={handleSubmit(() => {
        generate();
      })}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <BlueButton
          type="submit"
          disabled
          className={clsx([["px-4"], ["py-0.5"]])}
        >
          <span className={clsx(["text-xs"])}>発行</span>
        </BlueButton>
      </div>
    </form>
  );
};
export default Form;
