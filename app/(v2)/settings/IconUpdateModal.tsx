"use client";

import clsx from "clsx";
import React from "react";
import Cropper, { CropperProps } from "react-easy-crop";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import Button from "~/components/Button";
import { PlusPictogram } from "~/components/Pictogram";
import { graphql } from "~/gql";
import cropImage from "~/utils/crop";

export const UpdateProfileIconMutation = graphql(`
  mutation SettingsPage_ChangeUserIcon($changeTo: File!) {
    changeUserIcon(changeTo: $changeTo) {
      __typename
      ... on ChangeUserIconSucceededSuccess {
        user {
          id
          icon
        }
      }
    }
  }
`);
export default function IconUpdateModal({
  className,
  style,
  original,
  handleSuccess,
  handleFailed,
  handleCancel,
}: {
  className?: string;
  style?: React.CSSProperties;
  original: string;
  handleSuccess(): void;
  handleFailed(): void;
  handleCancel(): void;
}) {
  const [{ fetching }, mutate] = useMutation(UpdateProfileIconMutation);

  const { setValue, handleSubmit } = useForm<{ changeTo: File }>({});

  const [crop, setCrop] = React.useState<CropperProps["crop"]>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<CropperProps["zoom"]>(1);

  return (
    <form
      onSubmit={handleSubmit(async ({ changeTo }) => {
        const data = await mutate({ changeTo });
        if (
          !data ||
          data.data?.changeUserIcon.__typename !==
            "ChangeUserIconSucceededSuccess"
        )
          return handleFailed();
        return handleSuccess();
      })}
      style={style}
      className={clsx(
        className,
        "flex flex-col gap-y-4 rounded-md border border-obsidian-lighter bg-obsidian-primary p-4"
      )}
    >
      <div className={clsx("relative w-full grow")}>
        <Cropper
          image={original}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={async (_, c2) => {
            const file = await cropImage(original, c2);
            if (file) setValue("changeTo", file);
          }}
          classes={{
            containerClassName: "",
          }}
        />
      </div>
      <div className={clsx("flex shrink-0 gap-x-2")}>
        <Button
          onClick={handleCancel}
          color="red"
          size="medium"
          text="キャンセル"
          disabled={fetching}
          className={clsx("shrink-0")}
        />
        <Button
          submit
          color="blue"
          size="medium"
          Pictogram={PlusPictogram}
          text="変更"
          disabled={fetching}
          className={clsx("grow")}
        />
      </div>
    </form>
  );
}
