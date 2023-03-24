"use client";

import clsx from "clsx";
import React, { useContext, useEffect } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { RegisterContext } from "../Context";
import ToggleTagButton from "../ToggleTagButton";
import ToggleSemitagButton from "./ToggleSemitagButton";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_Request on NicovideoRegistrationRequest {
    id
    title
    checked
    taggings {
      id
      tag {
        id
        ...RegisterNicovideoPage_RequestFormPart_ToggleTagButton
      }
    }
    semitaggings {
      id
      ...RegisterNicovideoPage_RequestFormPart_ToggleSemitagButton
    }
  }
`);
export const Request: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { setNicovideoRequestId } = useContext(RegisterContext);

  useEffect(() => {
    setNicovideoRequestId(fragment.id);
  }, [fragment.id, setNicovideoRequestId]);

  return (
    <div className={clsx(className, ["flex", "gap-x-4"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-72"],
          ["flex", "flex-col", "gap-y-4"]
        )}
      >
        <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
          <div className={clsx(["text-xs"])}>タイトル</div>
          <div className={clsx(["text-sm", "font-bold"])}>{fragment.title}</div>
        </div>
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-2"])}>
        <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-0.5"])}>
          <div className={clsx(["text-xs"])}>タグ</div>
          <div
            className={clsx(["flex", ["gap-x-1"], ["gap-y-0.5"], "flex-wrap"])}
          >
            {fragment.taggings.map((tagging) => (
              <ToggleTagButton key={tagging.id} fragment={tagging.tag} />
            ))}
          </div>
        </div>
        <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-0.5"])}>
          <div className={clsx(["text-xs"])}>仮タグ</div>
          <div
            className={clsx(["flex", ["gap-x-1"], ["gap-y-0.5"], "flex-wrap"])}
          >
            {fragment.semitaggings.map((semitagging) => (
              <ToggleSemitagButton
                key={semitagging.id}
                fragment={semitagging}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
