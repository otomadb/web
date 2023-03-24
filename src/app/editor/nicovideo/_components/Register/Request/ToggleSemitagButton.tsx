"use client";

import clsx from "clsx";
import { useContext } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { RegisterContext } from "../Context";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_RequestFormPart_ToggleSemitagButton on NicovideoRegistrationRequestSemitagging {
    name
  }
`);

export default function ToggleSemitagButton({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const { toggleSemitag } = useContext(RegisterContext);

  return (
    <button
      className={clsx(
        className,
        ["flex"],
        ["text-left"],
        ["text-xs"],
        ["px-1"],
        ["py-0.5"],
        ["border"]
      )}
      type="button"
      onClick={() => {
        toggleSemitag(fragment.name);
      }}
    >
      {fragment.name}
    </button>
  );
}
