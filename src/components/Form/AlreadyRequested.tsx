"use client";
import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React, { ReactNode } from "react";

import Button from "~/components/Button";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment Form_VideoAlreadyRequested on RegistrationRequest {
    sourceId
    thumbnailUrl
  }
`);
export default function AlreadyRequested({
  className,
  style,
  RequestPageLink,
  handleCancel,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
  RequestPageLink: React.FC<{
    className?: string;
    children: ReactNode;
    sourceId: string;
  }>;
  handleCancel(): void;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div
      className={clsx(className, ["flex", "flex-col"], ["gap-y-4"])}
      style={style}
    >
      <div className={clsx(["flex", "gap-x-4"])}>
        <RequestPageLink
          className={clsx(["flex-shrink-0"])}
          sourceId={fragment.sourceId}
        >
          <Image
            width={260}
            height={200}
            src={fragment.thumbnailUrl}
            alt={fragment.sourceId}
            priority
          />
        </RequestPageLink>
        <div>
          <p className={clsx(["text-sm"], ["text-slate-400"])}>
            <RequestPageLink
              className={clsx(["font-bold"], ["text-slate-300"])}
              sourceId={fragment.sourceId}
            >
              {fragment.sourceId}
            </RequestPageLink>
            は既にリクエストされています。
          </p>
        </div>
      </div>
      <div>
        <Button
          className={clsx(["ml-auto"])}
          onClick={() => {
            handleCancel();
          }}
          text="戻る"
          size="medium"
          color="green"
        />
      </div>
    </div>
  );
}
