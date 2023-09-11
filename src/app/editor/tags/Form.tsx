"use client";

import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "urql";

import { BlueButton } from "~/components/Button";
import { useToaster } from "~/components/Toaster";
import { graphql } from "~/gql";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraNames } from "./ExtraNames";
import { FormSchema, formSchema } from "./FormSchema";
import { ImplictParentTags } from "./ImplicitParentTags";
import { PrimaryName } from "./PrimaryName";
import { Semitags } from "./Semitags";
import { SucceededToast } from "./SucceededToast";
import { useRegister } from "./useRegister";

export const Query = graphql(`
  query EditorTagsPage_Form {
    ...EditorTagsPage_Form_Semitags
  }
`);
export const RegisterTagForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  const [{ data }] = useQuery({ query: Query, requestPolicy: "network-only" });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const callToast = useToaster();
  const onSubmit: SubmitHandler<FormSchema> = useRegister({
    onSuccess: (data) => {
      reset({
        primaryName: "",
        extraNames: [],
        explicitParentTagId: "",
        implicitParents: [],
        resolveSemitags: [],
      });
      callToast(<SucceededToast fragment={data} />);
    },
  });
  const {
    fields: extraNames,
    append: appendExtraName,
    remove: removeExtraName,
  } = useFieldArray({ control, name: "extraNames" });
  const {
    fields: implicitParents,
    append: appendImplicitParent,
    remove: removeImplicitParent,
  } = useFieldArray({ control, name: "implicitParents" });
  const {
    fields: resolveSemitags,
    append: appendResolveSemitag,
    remove: removeResolveSemitag,
  } = useFieldArray({ control, name: "resolveSemitags" });

  return (
    <form
      style={style}
      className={clsx(className, ["flex"], ["gap-x-4"])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(
          ["flex-grow", "flex-shrink-0"],
          ["flex", "flex-col", ["gap-y-4"]]
        )}
      >
        <div
          className={clsx(
            ["flex-grow", "flex-shrink-0"],
            [["px-4"], ["py-4"]],
            ["border", "border-slate-300", "rounded"],
            ["bg-slate-50"],
            ["flex", "flex-col", ["gap-y-4"]]
          )}
        >
          <div>
            <PrimaryName
              register={register("primaryName")}
              errors={errors.primaryName}
            />
          </div>
          <div>
            <ExtraNames
              register={(index) => register(`extraNames.${index}.name`)}
              extraNames={extraNames}
              append={appendExtraName}
              remove={removeExtraName}
            />
          </div>
          <div>
            <ExplicitParentTag
              explicitParentTagId={watch("explicitParentTagId")}
              implicitParentTagIds={implicitParents.map(({ tagId }) => tagId)}
              set={(id) => setValue("explicitParentTagId", id)}
              removeSelected={() => setValue("explicitParentTagId", undefined)}
            />
          </div>
          <div>
            <ImplictParentTags
              explicitParentTagId={watch("explicitParentTagId")}
              implicitParents={implicitParents}
              append={appendImplicitParent}
              remove={removeImplicitParent}
            />
          </div>
          <div className={clsx(["flex-shrink-0"])}>
            <BlueButton
              type="submit"
              className={clsx(["text-md"], ["py-1"], ["px-3"])}
            >
              追加
            </BlueButton>
          </div>
        </div>
      </div>
      <Semitags
        className={clsx(["w-[1024px]"], ["flex-shrink-0"])}
        fragment={data}
        fields={resolveSemitags}
        append={appendResolveSemitag}
        remove={removeResolveSemitag}
        setTemporaryPrimaryTitle={(temp) => {
          if (getValues("primaryName") === "") setValue("primaryName", temp);
        }}
      />
    </form>
  );
};
