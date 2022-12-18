"use client";
import { useMemo } from "react";

export const useIfSkipTag = (tag: string) =>
  useMemo(() => tag.toLowerCase() === "音mad", [tag]);
