"use client";

import clsx from "clsx";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

import useToaster from "~/components/Toaster/useToaster";
import { graphql } from "~/gql";

import IconUpdateModal from "./IconUpdateModal";

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
export default function IconUpdateController({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [original, setOriginal] = useState<string | null>(null);
  const toast = useToaster();

  return (
    <>
      <Dropzone
        accept={{
          "image/jpeg": [],
          "image/png": [],
        }}
        onDrop={(acceptedFiles: File[]) => {
          if (acceptedFiles.length === 1) {
            setOriginal(URL.createObjectURL(acceptedFiles[0]));
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className={clsx("text-snow-primary")}>アイコンを選択</p>
          </div>
        )}
      </Dropzone>
      {original && (
        <div
          className={clsx(
            "fixed left-0 top-0 z-infinity flex h-[100vh] w-[100vw] items-center justify-center"
          )}
        >
          <div
            role="button"
            onClick={() => {
              setOriginal(null);
            }}
            className={clsx("absolute inset-0 z-0 bg-black/75")}
          ></div>
          <IconUpdateModal
            original={original}
            handleSuccess={() => {
              toast("アイコンを変更しました");
              setOriginal(null);
            }}
            handleFailed={() => {
              toast("アイコンの変更に失敗しました", { type: "error" });
            }}
            handleCancel={() => {
              setOriginal(null);
            }}
            className={clsx("relative z-1 h-[360px] w-[480px]")}
          />
        </div>
      )}
    </>
  );
}
