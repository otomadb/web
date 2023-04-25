"use client";

import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { BlueButton } from "~/components/Button";
import { useToaster } from "~/components/Toaster";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraNames } from "./ExtraNames";
import { FormSchema, formSchema } from "./FormSchema";
import { ImplictParentTags } from "./ImplicitParentTags";
import { PrimaryName } from "./PrimaryName";
import { Semitags } from "./Semitags";
import { SucceededToast } from "./SucceededToast";
import { useRegister } from "./useRegister";

export const RegisterTagForm: React.FC<{ className?: string }> = ({
  className,
}) => {
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
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["rounded"],
        ["border", "border-slate-300"],
        ["bg-slate-50"],
        ["flex", "gap-x-4", "items-stretch"]
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(
          ["w-96"],
          ["flex-shrink-0"],
          ["flex", "flex-col", ["gap-y-4"]],
          ["border"],
          ["rounded-md"],
          ["px-4", "py-4"]
        )}
      >
        <div className={clsx(["flex-grow"], ["flex", "flex-col", ["gap-y-4"]])}>
          <PrimaryName
            register={register("primaryName")}
            errors={errors.primaryName}
          />
          <ExtraNames
            register={(index) => register(`extraNames.${index}.name`)}
            extraNames={extraNames}
            append={appendExtraName}
            remove={removeExtraName}
          />
          <ExplicitParentTag
            explicitParentTagId={watch("explicitParentTagId")}
            implicitParentTagIds={implicitParents.map(({ tagId }) => tagId)}
            set={(id) => setValue("explicitParentTagId", id)}
            remove={() => setValue("explicitParentTagId", undefined)}
          />
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
      <div
        className={clsx(
          ["flex-grow"],
          ["border"],
          ["rounded-md"],
          ["px-4", "py-4"]
        )}
      >
        <Semitags
          className={clsx(["h-full"])}
          fields={resolveSemitags}
          append={appendResolveSemitag}
          remove={removeResolveSemitag}
          setTemporaryPrimaryTitle={(temp) => {
            if (getValues("primaryName") === "") setValue("primaryName", temp);
          }}
        />
      </div>
    </form>
  );
};
