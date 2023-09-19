"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import RequestMADFromNicovideoFormModal from "~/components/FormModal/RequestMADFromNicovideo";

export default function Controller(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const searchParams = useSearchParams();

  return (
    <RequestMADFromNicovideoFormModal
      {...props}
      initialSourceId={searchParams?.get("sourceId") || undefined}
    />
  );
}
