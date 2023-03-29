"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useCallToast } from "~/app/ToastProvider";
import { BlueButton } from "~/components/common/Button";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

import RejectSucceededToast from "./RejectSucceededToast";
import ResolveSucceededToast from "./ResolveSucceededToast";
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
  const callToast = useCallToast();
  const resolve = useResolve(fragment.id, {
    onSuccess(data) {
      callToast(<ResolveSucceededToast fragment={data} />);
    },
  });
  const reject = useReject(fragment.id, {
    onSuccess(data) {
      callToast(<RejectSucceededToast fragment={data} />);
    },
  });

  return (
    <form
      className={clsx(
        ["flex", "items-center"],
        ["px-2", "py-1"],
        ["gap-x-4"],
        ["border"],
        ["bg-slate-50"]
      )}
      onSubmit={handleSubmit(({ resolvedTo }) => {
        if (resolvedTo === "") reject();
        else resolve({ resolvedTo });
      })}
    >
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-64"],
          ["flex", "flex-col", "gap-y-1"]
        )}
      >
        <div>
          <p className={clsx(["text-sm", "text-slate-900"])}>{fragment.name}</p>
        </div>
        <div className={clsx()}>
          <p className={clsx(["line-clamp-2"], ["text-xxs", "text-slate-500"])}>
            {fragment.video.title}
          </p>
        </div>
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
              aria-disabled={fragment.checked || !canResolveTo}
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
                disabled={fragment.checked || !canResolveTo}
                {...register("resolvedTo", { required: true })}
              ></input>
              <div className={clsx(["ml-2"])}>
                <CommonTag
                  className={clsx(["text-xs"], ["px-1"])}
                  fragment={tag}
                  disabled={fragment.checked || !canResolveTo}
                />
              </div>
            </label>
          ))}
        </div>
        <div className={clsx(["flex-shrink-0"], ["flex", "items-center"])}>
          <label
            aria-disabled={fragment.checked}
            className={clsx(
              ["group/reject"],
              ["cursor-pointer"],
              ["bg-rose-50", "aria-disabled:bg-rose-100"],
              ["rounded"],
              ["border", ["border-rose-400", "aria-disabled:border-rose-200"]],
              ["px-2", "py-0.5"],
              ["flex", "items-center"]
            )}
          >
            <input
              type="radio"
              value={""}
              disabled={fragment.checked}
              {...register("resolvedTo")}
            ></input>
            <div className={clsx(["ml-2"])}>
              <span
                className={clsx([
                  "text-xs",
                  ["text-rose-600", "group-aria-disabled/reject:text-rose-300"],
                ])}
              >
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
