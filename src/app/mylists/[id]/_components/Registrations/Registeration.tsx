"use client";
import { PencilIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { VideoLink } from "~/components/Link";
import { graphql } from "~/gql";
import { MylistPage_RegistrationsSection_RegistrationFragment } from "~/gql/graphql";

graphql(`
  fragment MylistPage_RegistrationsSection_Registration on MylistRegistration {
    id
    note
    video {
      id
      title
      thumbnailUrl
    }
  }
`);

export const Registeration: React.FC<{
  className?: string;
  registration: MylistPage_RegistrationsSection_RegistrationFragment;
}> = ({ className, registration }) => {
  const {
    note,
    video: { id: videoId, thumbnailUrl, title },
  } = registration;
  return (
    <div
      className={clsx(
        className,
        ["@container"],
        ["flex", []],
        ["border", "border-slate-300"],
        ["shadow-md"],
        ["rounded-md"],
        ["bg-white"],
        ["divide-x", "border-slate-300"],
        ["py-0.5"]
      )}
    >
      <VideoLink
        videoId={videoId}
        className={clsx(["block"], ["flex-shrink-0"], ["px-2"])}
      >
        <Image
          className={clsx(["h-16"], ["w-24"], ["object-scale-down"])}
          src={thumbnailUrl}
          width={256}
          height={192}
          alt={title}
          priority={true}
        />
      </VideoLink>
      <VideoLink
        videoId={videoId}
        className={clsx(
          ["flex-grow"],
          ["px-2"],
          ["py-2"],
          ["flex", "flex-col"]
        )}
      >
        <div
          className={clsx(
            ["text-base", "xl:text-sm", "2xl:text-xs"],
            ["font-bold"],
            ["text-slate-900"]
          )}
        >
          {title}
        </div>
        {!!note && note !== "" && (
          <div
            className={clsx(
              ["mt-1"],
              ["px-2", "md:px-1"],
              ["py-2", "md:py-1"],
              ["text-sm", "md:text-xs"],
              ["rounded"],
              ["bg-slate-100"],
              ["text-slate-700"]
            )}
          >
            <div className={clsx(["float-left"], ["px-1"])}>
              <PencilIcon className={clsx(["w-4"], ["h-4"])} />
            </div>
            {note}
          </div>
        )}
      </VideoLink>
    </div>
  );
};
