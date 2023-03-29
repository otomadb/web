"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

import useReject from "./useReject";
import useResolve from "./useResolve";

export const formSchema = z.object({
  resolvedTo: z.string(),
});
export type FormSchema = z.infer<typeof formSchema>;

export const Fragment = graphql(`
  fragment CheckSemitagsPage_SemitagRow on Semitag {
    id
    name
    checked
    video {
      id
      title
    }
    suggestTags(limit: 3) {
      items {
        canResolveTo
        name {
          id
          name
          primary
        }
        tag {
          ...CommonTag
          id
        }
      }
    }
  }
`);
const Component: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const resolve = useResolve(fragment.id, {
    onSuccess() {},
  });
  const reject = useReject(fragment.id, {
    onSuccess() {},
  });

  return (
    <form
      className={clsx(["flex", "items-center"], ["px-2", "py-1"], ["gap-x-4"])}
      onSubmit={handleSubmit(({ resolvedTo }) => {
        if (resolvedTo === "") reject();
        else resolve({ resolvedTo });
      })}
    >
      <div
        className={clsx(["flex-shrink-0"], ["w-64"], ["flex", "items-center"])}
      >
        <span className={clsx(["text-sm", "text-slate-900"])}>
          {fragment.name}
        </span>
      </div>
      <div
        className={clsx(["flex-grow"], ["flex", "items-stretch", "gap-x-2"])}
      >
        <div
          className={clsx(
            ["flex-grow"],
            ["flex", "items-center", "flex-wrap", "gap-x-1", "gap-y-1"]
          )}
        >
          {fragment.suggestTags.items.length === 0 && (
            <p className={clsx(["text-xs", "text-slate-500"])}>
              検索候補はありませんでした
            </p>
          )}
          {fragment.suggestTags.items.map(({ tag, canResolveTo }, i) => (
            <label
              key={i}
              aria-disabled={!canResolveTo}
              className={clsx(
                ["px-2", "py-0.5"],
                [
                  "border",
                  ["border-slate-300", "aria-disabled:border-slate-300"],
                ],
                ["bg-slate-100", "aria-disabled:bg-slate-200"],
                ["rounded"],
                ["flex", "items-center"]
              )}
            >
              <input
                type="radio"
                value={tag.id}
                disabled={!canResolveTo}
                {...register("resolvedTo", { required: true })}
              ></input>
              <div className={clsx(["ml-2"])}>
                <CommonTag
                  className={clsx(["text-xs"], ["px-1"])}
                  fragment={tag}
                  disabled={!canResolveTo}
                />
              </div>
            </label>
          ))}
        </div>
        <div className={clsx(["flex-shrink-0"], ["flex", "items-center"])}>
          <label
            className={clsx(
              ["cursor-pointer"],
              ["border", "border-rose-200"],
              ["rounded"],
              ["bg-rose-50"],
              ["px-2", "py-0.5"],
              ["flex", "items-center"]
            )}
          >
            <input type="radio" value={""} {...register("resolvedTo")}></input>
            <div className={clsx(["ml-2"])}>
              <span className={clsx(["text-xs", "text-rose-800"])}>
                棄却する
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className={clsx(["flex-shrink-0"])}>
        <BlueButton
          type="submit"
          className={clsx([["px-4"], ["py-0.5"]])}
          disabled={fragment.checked}
        >
          <span className={clsx(["text-xs"])}>決定</span>
        </BlueButton>
      </div>
    </form>
  );
};
export default Component;
