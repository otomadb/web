"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import RegisterMADFromNicovideoFormModal from "~/components/FormModal/RegisterMADFromNicovideo";

export default function FormController(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const searchParams = useSearchParams();

  return (
    <RegisterMADFromNicovideoFormModal
      {...props}
      initialSourceId={searchParams?.get("sourceId") || undefined}
    />
  );
}
