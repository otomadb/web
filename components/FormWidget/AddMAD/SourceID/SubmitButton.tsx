"use client";
import clsx from "clsx";
import React from "react";

import Button from "~/components/Button";
import { SearchPictogram } from "~/components/Pictogram";

export default function SubmitButton({
  className,
  type,
  disabled,
}: {
  className?: string;
  type: "request" | "register";
  disabled: boolean;
}) {
  return (
    <Button
      submit
      color="green"
      size="medium"
      text={type === "request" ? "リクエストする" : "登録する"}
      Pictogram={SearchPictogram}
      disabled={disabled}
      className={clsx(className)}
    />
  );
}
