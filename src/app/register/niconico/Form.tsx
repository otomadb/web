"use client";

import "client-only";

import clsx from "clsx";
import React, { ReactNode, useState } from "react";

import { useAccessToken } from "~/hooks/useAccessToken";

import { NiconicoSearcher } from "./NiconicoSearcher";
import { Registration } from "./Registration";

export const YouHaveToLogin: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken] = useAccessToken();

  if (!accessToken) {
    return (
      <div>
        <span>you must login</span>
      </div>
    );
  }

  return <>{children}</>;
};

/* eslint-disable @typescript-eslint/no-empty-function */
export const FormContext = React.createContext<{
  primaryTitle: string | null;
  extraTitles: string[];
  tags: string[];
  primaryThumbnail: string | null;
  extraThumbnail: string[];

  changePrimaryTitle(title: string): void;
  addExtraTitle(title: string): void;
  deleteExtraTitle(title: string): void;

  changePrimaryThumbnail(thumbnail: string): void;
  addExtraThumbnail(thumbnail: string): void;
  deleteExtraThumbnail(thumbnail: string): void;

  addTag(id: string): void;
  deleteTag(id: string): void;
  clearTags(): void;
}>({
  primaryTitle: null,
  extraTitles: [],
  tags: [],
  primaryThumbnail: null,
  extraThumbnail: [],

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

export const Form: React.FC<{ className?: string }> = ({ className }) => {
  const [primaryTitle, setPrimaryTitle] = useState<string | null>(null);
  const [extraTitles, setExtraTitles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [primaryThumbnail, setPrimaryThumbnail] = useState<string | null>(null);
  const [extraThumbnail, setExtraThumbnails] = useState<string[]>([]);

  return (
    <FormContext.Provider
      value={{
        primaryTitle,
        extraTitles,
        tags,
        primaryThumbnail,
        extraThumbnail,
        changePrimaryTitle(title) {
          setPrimaryTitle(title);
        },
        addExtraTitle(title) {
          setExtraTitles((prev) => {
            if (prev.includes(title)) return prev;
            else return [...prev, title];
          });
        },
        deleteExtraTitle(title) {
          setExtraTitles((prev) => {
            return prev.filter((v) => v !== title);
          });
        },
        changePrimaryThumbnail(thumbnail) {
          setPrimaryThumbnail(thumbnail);
        },
        addExtraThumbnail(thumbnail) {
          setExtraThumbnails((prev) => {
            if (prev.includes(thumbnail)) return prev;
            else return [...prev, thumbnail];
          });
        },
        deleteExtraThumbnail(thumbnail) {
          setExtraThumbnails((prev) => {
            return prev.filter((v) => v !== thumbnail);
          });
        },
        addTag(id) {
          setTags((prev) => {
            if (prev.includes(id)) return prev;
            else return [...prev, id];
          });
        },
        deleteTag(id) {
          setTags((prev) => {
            return prev.filter((v) => v !== id);
          });
        },
        clearTags() {
          setTags([]);
        },
      }}
    >
      <div className={clsx(className, ["grid", ["grid-cols-2"]])}>
        <NiconicoSearcher className={clsx([])} />
        <Registration className={clsx([])} />
      </div>
    </FormContext.Provider>
  );
};
