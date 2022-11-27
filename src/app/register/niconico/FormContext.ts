"use client";
import React from "react";

/* eslint-disable @typescript-eslint/no-empty-function */
export const FormContext = React.createContext<{
  niconicoId: string | null;
  primaryTitle: string | null;
  extraTitles: string[];
  tags: string[];
  primaryThumbnail: string | null;
  extraThumbnail: string[];

  changeNiconicoId(id: string): void;
  changePrimaryTitle(title: string | null): void;
  addExtraTitle(title: string): void;
  deleteExtraTitle(title: string): void;

  changePrimaryThumbnail(thumbnail: string | null): void;
  addExtraThumbnail(thumbnail: string): void;
  deleteExtraThumbnail(thumbnail: string): void;

  addTag(id: string): void;
  deleteTag(id: string): void;
  clearTags(): void;
}>({
  niconicoId: null,
  primaryTitle: null,
  extraTitles: [],
  tags: [],
  primaryThumbnail: null,
  extraThumbnail: [],

  changeNiconicoId() {},
  changePrimaryTitle() {},
  addExtraTitle() {},
  deleteExtraTitle() {},

  changePrimaryThumbnail() {},
  addExtraThumbnail() {},
  deleteExtraThumbnail() {},

  addTag() {},
  deleteTag() {},
  clearTags() {},
});
/* eslint-enable @typescript-eslint/no-empty-function */
