"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";
import * as z from "zod";

import { graphql } from "~/gql";
import { RegisterTag_RegisterTagDocument } from "~/gql/graphql";

import { LinkTag } from "../common/Link";
import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraName } from "./ExtraName";
import { ImplictParentTags } from "./ImplicitParentTags";
import { PrimaryName } from "./PrimaryName";
import { Semitags } from "./Semitags";

graphql(`
  mutation RegisterTag_RegisterTag(
    $primaryName: String!
    $extraNames: [String!]
    $explicitParent: ID
    $implicitParents: [ID!]
    $resolveSemitags: [ID!]
  ) {
    registerTag(
      input: {
        primaryName: $primaryName
        extraNames: $extraNames
        explicitParent: $explicitParent
        implicitParents: $implicitParents
        resolveSemitags: $resolveSemitags
        meaningless: false
      }
    ) {
      tag {
        id
        name
        explicitParent {
          id
          name
        }
      }
    }
  }
`);

const formSchema = z.object({
  primaryName: z.string().min(1, "タグ名は1文字以上で"),
  extraNames: z.optional(
    z.array(
      z.object({
        name: z.string().min(1, "タグ名は1文字以上で"),
      })
    )
  ),

  explicitParent: z.optional(
    z.object({
      tag: z.object({
        id: z.string(),
        name: z.string(),
        explicitParent: z.optional(
          z.object({
            id: z.string(),
            name: z.string(),
          })
        ),
      }),
    })
  ),
  implicitParents: z.array(
    z.object({
      tag: z.object({
        id: z.string(),
        name: z.string(),
        explicitParent: z.optional(
          z.object({
            id: z.string(),
            name: z.string(),
          })
        ),
      }),
    })
  ),

  resolveSemitags: z.array(
    z.object({
      semitag: z.object({
        id: z.string(),
        name: z.string(),
        video: z.object({
          id: z.string(),
          title: z.string(),
        }),
      }),
    })
  ),
});
type FormSchema = z.infer<typeof formSchema>;

export const RegisterTagForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [, trigger] = useMutation(RegisterTag_RegisterTagDocument);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    resetField,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const primaryName = watch("primaryName");
  const {
    fields: extraNames,
    append: appendExtraName,
    remove: removeExtraName,
  } = useFieldArray({
    control,
    name: "extraNames",
  });
  const explicitParent = watch("explicitParent");
  const {
    fields: implicitParents,
    append: appendImplicitParent,
    remove: removeImplicitParent,
  } = useFieldArray({ control, name: "implicitParents" });
  const {
    fields: resolveSemitags,
    append: appendResolveSemitag,
    remove: removeresolveSemitag,
  } = useFieldArray({ control, name: "resolveSemitags" });
  const selectedParentIds: string[] = useMemo(
    () => [
      ...(explicitParent?.tag ? [explicitParent.tag.id] : []),
      ...implicitParents.map(({ tag }) => tag.id),
    ],
    [explicitParent, implicitParents]
  );

  useEffect(() => {
    const firstSemitag = resolveSemitags.at(0);
    if (primaryName || !firstSemitag) return;

    setValue("primaryName", firstSemitag.semitag.name);
  }, [primaryName, resolveSemitags, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({
      primaryName,
      extraNames,
      explicitParent,
      implicitParents,
      resolveSemitags,
    }) => {
      const { data } = await trigger({
        primaryName,
        extraNames: extraNames?.map(({ name }) => name),
        explicitParent: explicitParent?.tag.id,
        implicitParents: implicitParents.map(({ tag: { id } }) => id),
        resolveSemitags: resolveSemitags.map(({ semitag: { id } }) => id),
      });
      resetField("primaryName");
      resetField("extraNames");
      resetField("explicitParent");
      resetField("implicitParents");
      resetField("resolveSemitags");

      if (data) {
        const { id, name } = data.registerTag.tag;
        toast(() => (
          <div className={clsx(["text-slate-700"])}>
            <LinkTag
              tagId={id}
              className={clsx(["font-bold"], ["text-blue-500"])}
            >
              {name}
            </LinkTag>
            を登録しました．
          </div>
        ));
      }
    },
    [resetField, trigger]
  );

  return (
    <form
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["rounded"],
        ["border", "border-slate-300"],
        ["bg-slate-50"]
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(
          [["px-4"], ["py-4"]],
          ["flex"],
          ["gap-x-4"],
          ["border"],
          ["rounded"],
          ["bg-slate-100"]
        )}
      >
        <PrimaryName
          className={clsx(["flex-grow"], ["flex-shrink-0"])}
          Input={({ ...props }) => (
            <input type={"text"} {...props} {...register("primaryName")} />
          )}
          errorMessage={errors.primaryName?.message}
        />
        <ExplicitParentTag
          className={clsx(["flex-shrink-0"], ["w-96"])}
          field={explicitParent}
          selectedParentIds={selectedParentIds}
          append={(payload) => setValue("explicitParent", payload)}
          remove={() => setValue("explicitParent", undefined)}
        />
      </div>
      <div
        className={clsx(
          [["px-4"], ["py-4"]],
          ["border"],
          ["rounded"],
          ["bg-slate-100"],
          ["mt-4"],
          ["grid"],
          ["grid-cols-2"],
          ["gap-x-6"],
          ["gap-y-6"]
        )}
      >
        <ExtraName
          names={extraNames}
          Input={({ index, ...props }) => (
            <input
              type="text"
              disabled={true}
              {...props}
              {...register(`extraNames.${index}.name`)}
            />
          )}
          append={(payload) => appendExtraName(payload)}
          remove={(index) => removeExtraName(index)}
        />
        <ImplictParentTags
          className={clsx()}
          fields={implicitParents}
          selectedParentIds={selectedParentIds}
          append={(payload) => appendImplicitParent(payload)}
          remove={(index) => removeImplicitParent(index)}
        />
      </div>
      <div
        className={clsx(
          ["mt-4"],
          [["px-4"], ["py-4"]],
          ["border"],
          ["rounded"],
          ["bg-slate-100"]
        )}
      >
        <Semitags
          fields={resolveSemitags}
          append={(p) => appendResolveSemitag(p)}
          remove={(i) => removeresolveSemitag(i)}
        />
      </div>
      <div className={clsx(["mt-8"])}>
        <div>
          <button
            type="submit"
            className={clsx(
              ["px-4"],
              ["py-2"],
              ["disabled:bg-slate-300", "bg-blue-400", "hover:bg-blue-500"],
              [
                "disabled:text-slate-100",
                "text-blue-50",
                "hover:text-blue-100",
              ],
              ["text-sm"],
              ["cursor-pointer"],
              ["rounded"]
            )}
          >
            追加
          </button>
        </div>
      </div>
    </form>
  );
};
