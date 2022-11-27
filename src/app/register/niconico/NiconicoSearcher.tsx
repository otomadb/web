"use client";

import "client-only";

import clsx from "clsx";
import ky from "ky";
import React, { useContext, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

import { FormContext } from "./Form";

const SearchTagsQueryDocument = graphql(`
  query SearchTags3($query: String!) {
    tags: searchTags(query: $query, limit: 3) {
      result {
        matchedName
        tag {
          id
          name
          type
        }
      }
    }
  }
`);

export const NiconicoSearcher: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { clearTags, changePrimaryTitle } = useContext(FormContext);
  const [nicovideoId, setNicovideoId] = useState("");
  const [source, setSource] = useState<{
    id: string;
    title: string;
    tags: { value: string }[];
    watchUrl: string;
    uploadedAt: Date;
    thumbnailUrl: { original: string; large: string };
  } | null>(null);

  return (
    <div className={clsx(className, [])}>
      <input
        onChange={(e) => {
          setNicovideoId(e.target.value);
        }}
      ></input>
      <button
        onClick={async () => {
          if (nicovideoId === "") return;

          await ky
            .get(`https://nicovideo-gti-proxy.deno.dev/${nicovideoId}`)
            .then((result) =>
              result
                .json<{
                  id: string;
                  title: string;
                  tags: { value: string }[];
                  watch_url: string;
                  uploaded_at: string;
                  thumbnail_url: { original: string; large: string };
                }>()
                .then(
                  ({
                    id,
                    tags,
                    thumbnail_url,
                    title,
                    uploaded_at,
                    watch_url,
                  }) => {
                    setSource({
                      id,
                      tags,
                      thumbnailUrl: thumbnail_url,
                      title,
                      uploadedAt: new Date(uploaded_at),
                      watchUrl: watch_url,
                    });
                    clearTags();
                    changePrimaryTitle(title);
                  }
                )
            );
        }}
      >
        search
      </button>
      {source && (
        <div>
          <div>
            <span>{source.title}</span>
          </div>
          {source.tags.map(({ value }, i) => (
            <CandidateTag key={i} tag={value} />
          ))}
          <div>
            <div>
              <span>original</span>
              <img src={source.thumbnailUrl.original}></img>
            </div>
            <div>
              <span>large</span>
              <img src={source.thumbnailUrl.large}></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const excludeSearch = (v: string): boolean => ["音MAD"].includes(v);

export const CandidateTag: React.FC<{ className?: string; tag: string }> = ({
  tag,
}) => {
  const { addTag: addCandidateTag } = useContext(FormContext);
  const [tags, setTags] = useState<
    { matchedName: string; tag: { id: string; name: string; type: string } }[]
  >([]);
  const { isValidating } = useSWR(
    !excludeSearch(tag) ? [SearchTagsQueryDocument, tag] : null,
    (doc, query) => gqlClient.request(doc, { query }),
    {
      onSuccess(data) {
        const { tags } = data;
        setTags(
          tags.result.map(({ matchedName, tag: { id, name, type } }) => ({
            matchedName,
            tag: { id, name, type },
          }))
        );
      },
    }
  );
  return (
    <div>
      <span>{tag}</span>
      <div className={clsx(["divide-y", ["border-gray-300"]])}>
        {tags.map(({ matchedName, tag }) => (
          <button
            key={tag.id}
            className={clsx(
              ["w-full"],
              ["bg-blue-50"],
              ["px-2"],
              ["py-2"],
              ["flex", ["items-center"]]
            )}
            onClick={() => {
              console.log(tag.id);
              addCandidateTag(tag.id);
            }}
          >
            <span className={clsx(["text-slate-700"], ["text-xs"])}>
              {tag.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
