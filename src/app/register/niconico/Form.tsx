"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { FormContext } from "./FormContext";
import { RegisterForm } from "./Registration/Form";
import { Searcher } from "./Search/Searcher";

export const Form: React.FC<{ className?: string }> = ({ className }) => {
  const [niconicoId, setNiconicoId] = useState<string | null>(null);
  const [primaryTitle, setPrimaryTitle] = useState<string | null>(null);
  const [extraTitles, setExtraTitles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [primaryThumbnail, setPrimaryThumbnail] = useState<string | null>(null);
  const [extraThumbnail, setExtraThumbnails] = useState<string[]>([]);

  return (
    <FormContext.Provider
      value={{
        niconicoId,
        primaryTitle,
        extraTitles,
        tags,
        primaryThumbnail,
        extraThumbnail,
        changeNiconicoId(id) {
          setNiconicoId(id);
        },
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
