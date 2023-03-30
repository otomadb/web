"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";
import { GenerateAccessTokenInputDuration } from "~/gql/graphql";

import useGenerateAccessToken from "./useGenerateAccessToken";

export const formSchema = z.object({
  duration: z.enum([
    GenerateAccessTokenInputDuration.OneDay,
    GenerateAccessTokenInputDuration.ThreeDays,
    GenerateAccessTokenInputDuration.OneWeek,
    GenerateAccessTokenInputDuration.OneMonth,
  ]),
});
export type FormSchema = z.infer<typeof formSchema>;

const Form: React.FC<{ show(token: string): void }> = ({ show, ...props }) => {
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const generate = useGenerateAccessToken({
    onSuccess(data) {
      show(data.accessToken);
    },
  });

  return (
    <form
      className={clsx(["flex"], ["px-2", "py-1"], ["border"], ["bg-slate-50"])}
      onSubmit={handleSubmit(({ duration }) => {
        generate({ duration });
      })}
    >
      <div className={clsx(["flex-grow"], ["flex", "gap-x-2"])}>
        <label className={clsx(["px-2", "py-0.5"], ["flex", "items-center"])}>
          <input
            type="radio"
            value={GenerateAccessTokenInputDuration.OneDay}
            {...register("duration", { required: true })}
          />
          <div className={clsx(["ml-2"])}>
            <span className={clsx(["text-xs"])}>1日</span>
          </div>
        </label>
        <label className={clsx(["px-2", "py-0.5"], ["flex", "items-center"])}>
          <input
            type="radio"
            value={GenerateAccessTokenInputDuration.ThreeDays}
            {...register("duration", { required: true })}
          />
          <div className={clsx(["ml-2"])}>
            <span className={clsx(["text-xs"])}>3日</span>
          </div>
        </label>
        <label className={clsx(["px-2", "py-0.5"], ["flex", "items-center"])}>
          <input
            type="radio"
            value={GenerateAccessTokenInputDuration.OneWeek}
            {...register("duration", { required: true })}
          />
          <div className={clsx(["ml-2"])}>
            <span className={clsx(["text-xs"])}>1週間</span>
          </div>
        </label>
        <label className={clsx(["px-2", "py-0.5"], ["flex", "items-center"])}>
          <input
            type="radio"
            value={GenerateAccessTokenInputDuration.OneMonth}
            {...register("duration", { required: true })}
          />
          <div className={clsx(["ml-2"])}>
            <span className={clsx(["text-xs"])}>1ヶ月</span>
          </div>
        </label>
      </div>
      <div className={clsx(["flex-shrink-0"])}>
        <BlueButton type="submit" className={clsx([["px-4"], ["py-0.5"]])}>
          <span className={clsx(["text-xs"])}>発行</span>
        </BlueButton>
      </div>
    </form>
  );
};
export default Form;
