import {
  ArrowPathRoundedSquareIcon,
  DocumentPlusIcon,
  LinkIcon,
  MinusIcon,
  PlusSmallIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { ReactNode } from "react";

import { DateTime } from "~/components/common/DateTime";
import { LinkUser } from "~/components/common/Link";
import { Tag } from "~/components/common/Tag";
import { UserIcon } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragment,
  Component_TagFragmentDoc,
  VideoPage_HistoryItemFragment,
  VideoPage_HistoryItemUserFragment,
  VideoPage_HistoryItemUserFragmentDoc,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_HistoryItemUser on User {
    id
    name
    displayName
    icon
  }

  fragment VideoPage_HistoryItem on VideoHistoryItem {
    type: __typename
    id
    createdAt
    user {
      ...VideoPage_HistoryItemUser
    }
    ... on VideoAddTitleHistoryItem {
      title
    }
    ... on VideoDeleteTitleHistoryItem {
      title
    }
    ... on VideoChangePrimaryTitleHistoryItem {
      from
      to
    }
    ... on VideoAddThumbnailHistoryItem {
      thumbnail
    }
    ... on VideoDeleteThumbnailHistoryItem {
      thumbnail
    }
    ... on VideoChangePrimaryThumbnailHistoryItem {
      from
      to
    }
    ... on VideoAddTagHistoryItem {
      tag {
        ...Component_Tag
      }
    }
    ... on VideoDeleteTagHistoryItem {
      tag {
        ...Component_Tag
      }
    }
    ... on VideoAddNicovideoVideoSourceHistoryItem {
      source {
        id
      }
    }
  }
`);

const HistItemTemplate: React.FC<{
  className?: string;
  children?: ReactNode;
  id: string;
  createdAt: string;
  user: VideoPage_HistoryItemUserFragment;
  icon: React.FC<{ className?: string | undefined }>;
  title: string;
}> = ({ className, user, children, createdAt, icon: Icon, title }) => {
  return (
    <div
      className={clsx(
        className,
        ["border", "border-gray-200"],
        ["rounded"],
        [["px-4"], ["py-1"]],
        ["bg-slate-50"]
      )}
    >
      <div className={clsx(["flex"], ["items-center"])}>
        <div className={clsx(["flex"])}>
          <Icon className={clsx(["w-4"], ["h-4"])} />
          <div
            className={clsx(
              ["ml-1"],
              ["whitespace-nowrap"],
              ["text-xs"],
              ["text-slate-700"]
            )}
          >
            {title}
          </div>
        </div>
        <div className={clsx(["ml-2"])}>{children}</div>
      </div>
      <div
        className={clsx(
          ["mt-1"],
          ["flex-skrink-0"],
          ["flex", ["items-center"]]
        )}
      >
        <LinkUser name={user.name} className={clsx(["flex", ["items-center"]])}>
          <UserIcon
            className={clsx(["w-4"], ["h-4"])}
            src={user.icon}
            name={user.name}
          />
          <span className={clsx(["ml-1"], ["text-xs"], ["text-slate-700"])}>
            {user.displayName}
          </span>
        </LinkUser>
        <DateTime
          className={clsx(
            ["flex-grow"],
            ["ml-2"],
            ["text-right"],
            ["text-xs"],
            ["text-slate-500"],
            ["select-none"]
          )}
          date={createdAt}
        />
      </div>
    </div>
  );
};

export const RegisterItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"動画の追加"}
    icon={({ className }) => (
      <DocumentPlusIcon className={clsx(className, ["text-teal-500"])} />
    )}
  />
);

export const AddTitleItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    title: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ item: { id, createdAt, title, user } }) => (
  <HistItemTemplate
    id={id}
    title={"タイトルの追加"}
    createdAt={createdAt}
    user={user}
    icon={({ className }) => (
      <PlusSmallIcon className={clsx(className, ["text-teal-500"])} />
    )}
  >
    <div
      className={clsx(
        ["line-clamp-2"],
        ["text-xs"],
        ["font-bold"],
        ["text-slate-700"]
      )}
    >
      {title}
    </div>
  </HistItemTemplate>
);

export const DeleteTitleItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    title: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, title, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"タイトルの削除"}
    icon={({ className }) => (
      <MinusIcon className={clsx(className, ["text-red-500"])} />
    )}
  >
    <div
      className={clsx(
        ["line-clamp-2"],
        ["text-xs"],
        ["font-bold"],
        ["text-slate-700"]
      )}
    >
      {title}
    </div>
  </HistItemTemplate>
);

export const ChangePrimaryTitleItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    from: string | null;
    to: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, from, to, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"主タイトルの変更"}
    icon={({ className }) => (
      <ArrowPathRoundedSquareIcon
        className={clsx(className, ["text-purple-500"])}
      />
    )}
  >
    <div className={clsx(["line-clamp-2"], ["text-xs"])}>
      {from && (
        <>
          <span className={clsx(["font-bold"], ["text-slate-700"])}>
            {from}
          </span>
          <span className={clsx(["text-slate-500"])}>から</span>
        </>
      )}
      <>
        <span className={clsx(["font-bold"], ["text-slate-700"])}>{to}</span>
        <span className={clsx(["text-slate-500"])}>に変更</span>
      </>
    </div>
  </HistItemTemplate>
);

export const AddThumbnailItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    thumbnail: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"サムネイルの追加"}
    icon={({ className }) => (
      <PlusSmallIcon className={clsx(className, ["text-teal-500"])} />
    )}
  />
);

export const DeleteThumbnail: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    thumbnail: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"サムネイルの削除"}
    icon={({ className }) => (
      <MinusIcon className={clsx(className, ["text-red-400"])} />
    )}
  />
);

export const ChangePrimaryThumbnailItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    user: VideoPage_HistoryItemUserFragment;
    from: string | null;
    to: string;
  };
}> = ({ className, item: { id, createdAt, from, to, user } }) => (
  <HistItemTemplate
    className={className}
    id={id}
    createdAt={createdAt}
    user={user}
    title={"主サムネイルの変更"}
    icon={({ className }) => (
      <ArrowPathRoundedSquareIcon
        className={clsx(className, ["text-purple-500"])}
      />
    )}
  />
);

export const AddTagItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    user: VideoPage_HistoryItemUserFragment;
    tag: Component_TagFragment;
  };
}> = ({ className, item: { id, createdAt, user, tag } }) => {
  return (
    <HistItemTemplate
      className={className}
      id={id}
      createdAt={createdAt}
      user={user}
      title={"タグの追加"}
      icon={({ className }) => (
        <TagIcon className={clsx(className, ["text-teal-400"])} />
      )}
    >
      <Tag tagId={tag.id} />
    </HistItemTemplate>
  );
};

export const DeleteTagItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    user: VideoPage_HistoryItemUserFragment;
    tag: Component_TagFragment;
  };
}> = ({ className, item: { id, createdAt, user, tag } }) => {
  return (
    <HistItemTemplate
      className={className}
      id={id}
      createdAt={createdAt}
      user={user}
      title={"タグの削除"}
      icon={({ className }) => (
        <MinusIcon className={clsx(className, ["text-red-400"])} />
      )}
    >
      <Tag tagId={tag.id} />
    </HistItemTemplate>
  );
};

export const AddNiconcioSourceItem: React.FC<{
  className?: string;
  item: {
    id: string;
    createdAt: string;
    user: VideoPage_HistoryItemUserFragment;
  };
}> = ({ className, item: { id, createdAt, user } }) => {
  return (
    <HistItemTemplate
      className={className}
      id={id}
      createdAt={createdAt}
      user={user}
      title={"ニコニコ動画との紐付け"}
      icon={({ className }) => (
        <LinkIcon className={clsx(className, ["text-teal-500"])} />
      )}
    />
  );
};

export const History: React.FC<{
  className?: string;
  item: VideoPage_HistoryItemFragment;
}> = ({ className, item }) => {
  if (item.type === "VideoRegisterHistoryItem")
    return (
      <RegisterItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
        }}
      />
    );
  if (item.type === "VideoAddTitleHistoryItem")
    return (
      <AddTitleItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          title: item.title,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
        }}
      />
    );
  if (item.type === "VideoDeleteTitleHistoryItem")
    return (
      <DeleteTitleItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          title: item.title,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
        }}
      />
    );
  if (item.type === "VideoChangePrimaryTitleHistoryItem")
    return (
      <ChangePrimaryTitleItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          from: item.from || null,
          to: item.to,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
        }}
      />
    );
  if (item.type === "VideoAddThumbnailHistoryItem")
    return (
      <AddThumbnailItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
          thumbnail: item.thumbnail,
        }}
      />
    );
  if (item.type === "VideoDeleteThumbnailHistoryItem")
    return (
      <DeleteThumbnail
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
          thumbnail: item.thumbnail,
        }}
      />
    );
  if (item.type === "VideoChangePrimaryThumbnailHistoryItem")
    return (
      <ChangePrimaryThumbnailItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
          from: item.from || null,
          to: item.to,
        }}
      />
    );
  if (item.type === "VideoAddTagHistoryItem")
    return (
      <AddTagItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
          tag: getFragment(Component_TagFragmentDoc, item.tag),
        }}
      />
    );
  if (item.type === "VideoDeleteTagHistoryItem")
    return (
      <DeleteTagItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
          tag: getFragment(Component_TagFragmentDoc, item.tag),
        }}
      />
    );
  if (item.type === "VideoAddNicovideoVideoSourceHistoryItem")
    return (
      <AddNiconcioSourceItem
        className={className}
        item={{
          id: item.id,
          createdAt: item.createdAt,
          user: getFragment(VideoPage_HistoryItemUserFragmentDoc, item.user),
        }}
      />
    );
  else return null;
};
