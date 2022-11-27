"use client";

import "client-only";

import clsx from "clsx";
import React, { ReactNode, useState } from "react";

import { useAccessToken } from "~/hooks/useAccessToken";

import { FormContext } from "./FormContext";
import { RegisterForm } from "./Registration/Form";
import { Searcher } from "./Search/Searcher";

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
        <Searcher className={clsx([])} />
        <RegisterForm className={clsx([])} />
      </div>
    </FormContext.Provider>
  );
};
