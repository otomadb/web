"use client";

import Button, { NormalButton } from "~/components/Button";
import { useOpenEditMylistForm } from "~/components/FormWidget";
import { EditMylistPictogram } from "~/components/Pictogram";

export const EditButton = ({
  fragment,
  ...props
}: {
  fragment: Parameters<ReturnType<typeof useOpenEditMylistForm>>[0]["fragment"];
} & Omit<NormalButton, "onClick" | "Pictogram">) => {
  const open = useOpenEditMylistForm();

  return (
    <Button
      {...props}
      Pictogram={EditMylistPictogram}
      onClick={() => {
        open({ fragment });
      }}
    />
  );
};
