"use client";

import "client-only";

import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { DelayedInput } from "~/components/DelayedInput";
import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { useAccessToken } from "~/hooks/useAccessToken";
import { useLoggedIn } from "~/hooks/useLoggedIn";

const SearchTagsDocument = graphql(`
  query SearchTags($query: String!) {
    tags: searchTags(query: $query, limit: 5) {
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

const CanTagQueryDocument = graphql(`
  query CanTag($tagId: ID!, $videoId: ID!) {
    tag(id: $tagId) {
      id
    }
    video(id: $videoId) {
      id
      hasTag(id: $tagId)
    }
  }
`);

const TagVideoMutationDocument = graphql(`
  mutation TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        title
      }
      tag {
        id
        name
      }
    }
  }
`);

export const SearchBox: React.FC<{
  query: string;
  classNames?: string;
  setTag(payload: { id: string; name: string }): void;
}> = ({ query, classNames, setTag }) => {
  const [tags, setTags] = useState<
    { matchedName: string; tag: { id: string; name: string; type: string } }[]
  >([]);
  const { isValidating } = useSWR(
    query !== "" ? [SearchTagsDocument, query] : null,
    (doc, query) => gqlClient.request(doc, { query }),
    {
      suspense: false,
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
    <div className={clsx(classNames, ["divide-y", ["border-gray-300"]])}>
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
            setTag({ id: tag.id, name: tag.name });
          }}
        >
          <span className={clsx(["text-slate-700"], ["text-xs"])}>
            {tag.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export const RegisterButton: React.FC<{
  className?: string;
  tagId?: string;
  videoId: string;
}> = ({ className, tagId, videoId }) => {
  const [token] = useAccessToken();
  const [ensureTagId, setEnsureTagId] = useState<string | null>(null);
  const { isValidating } = useSWR(
    tagId ? [CanTagQueryDocument, tagId] : null,
    (doc, tagId) => gqlClient.request(doc, { tagId, videoId }),
    {
      onSuccess(data) {
        const {
          tag,
          video: { hasTag },
        } = data;
        if (!tag.id) setEnsureTagId(null);
        else if (hasTag) setEnsureTagId(null);
        else setEnsureTagId(tag.id);
      },
      onError(e) {
        setEnsureTagId(null);
      },
    }
  );
  useEffect(() => {
    setEnsureTagId(null);
  }, [tagId]);

  return (
    <button
      className={clsx(
        className,
        ["px-2"],
        ["bg-blue-400", "disabled:bg-slate-300"],
        ["text-white"],
        ["flex", ["justify-center"], ["items-center"]]
      )}
      disabled={!ensureTagId}
      onClick={async () => {
        if (!ensureTagId || !token) return;
        const result = await gqlClient.request(
          TagVideoMutationDocument,
          { input: { tagId: ensureTagId, videoId } },
          { Authorization: `Bearer ${token}` }
        );
      }}
    >
      {isValidating && (
        <ArrowPathIcon className={clsx(["animate-spin"], ["w-4"], ["h-4"])} />
      )}
      {!isValidating && <PlusIcon className={clsx(["w-4"], ["h-4"])} />}
    </button>
  );
};

export const TagAdd: React.FC<{ className?: string; videoId: string }> = ({
  className,
  videoId,
}) => {
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(
    null
  );
  const [query, setQuery] = useState<string>("");
  const isLoggedIn = useLoggedIn();

  if (!isLoggedIn) return null;

  return (
    <div className={clsx(className, ["relative"])}>
      <div
        className={clsx(["w-full"], ["border"], ["flex", ["items-stretch"]])}
      >
        <DelayedInput
          className={clsx(["flex-grow"], ["py-1"], ["px-2"], ["text-xs"])}
          inject={selected?.name}
          onUpdateQuery={(q) => {
            setQuery(q);
            if (q !== selected?.name) setSelected(null);
          }}
        />
        <RegisterButton
          className={clsx(["w-12"], ["flex-shrink-0"])}
          tagId={selected?.id}
          videoId={videoId}
        />
      </div>
      <SearchBox
        classNames={clsx(
          { invisible: query === "" || selected !== null },
          ["absolute"],
          ["top-100"],
          ["w-full"],
          ["border"]
        )}
        query={query}
        setTag={(v) => {
          setSelected(v);
        }}
      />
    </div>
  );
};
