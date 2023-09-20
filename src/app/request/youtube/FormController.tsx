"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import RequestMADFromYoutubeFormModal from "~/components/FormModal/RequestMADFromYoutube";

export default function Controller(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const searchParams = useSearchParams();

  return (
    <RequestMADFromYoutubeFormModal
      {...props}
      initialSourceId={searchParams?.get("sourceId") || undefined}
    />
  );
}
