import {
  ArrowSmallRightIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, ReactNode } from "react";

import { DateTime } from "./DateTime";
import { Tag } from "./Tag";
import { TagType } from "./types";

const HistItemTemplate: React.FC<{
  className?: string;
  children?: ReactNode;
  id: string;
  createdAt: string;
  user: { name: string; displayName: string; icon: string };
}> = ({ className, user, children, createdAt }) => {
  return (
    <div
      className={clsx(
        className,
        ["px-2"],
        ["py-1"],
        ["border", "border-gray-200"],
        ["rounded"]
      )}
    >
      {children}
      <div className={clsx(["mt-1"], ["flex", ["items-center"]])}>
        <Link
          href={`/users/${user.name}`}
          className={clsx(["flex", ["items-center"]])}
        >
          <Image
            src={user.icon}
            width={24}
            height={24}
            className={clsx(["w-4"], ["h-4"])}
            alt={user.name}
          />
          <span className={clsx(["ml-1"], ["text-sm"], ["text-gray-700"])}>
            {user.displayName}
          </span>
        </Link>
        <DateTime
          className={clsx(["ml-2"], ["text-xs"], ["text-gray-600"])}
          date={createdAt}
        />
      </div>
    </div>
  );
};

type Register = {
  type: "REGISTER";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
};
export const RegisterItem: React.FC<
  { className?: string } & Omit<Register, "type">
> = (props) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      動画の追加
    </span>
  </HistItemTemplate>
);

type AddTitle = {
  type: "ADD_TITLE";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  title: string;
};
export const AddTitleItem: React.FC<
  { className?: string } & Omit<AddTitle, "type">
> = ({ title, ...props }) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      タイトルの追加
    </span>
    <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
      <PlusSmallIcon className={clsx(["w-4"], ["text-gray-500"])} />
      <span
        className={clsx(
          ["ml-1"],
          ["line-clamp-2"],
          ["text-xs"],
          ["text-gray-700"]
        )}
      >
        {title}
      </span>
    </div>
  </HistItemTemplate>
);

type DeleteTitle = {
  type: "DELETE_TITLE";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  title: string;
};
export const DeleteTitleItem: React.FC<
  { className?: string } & Omit<DeleteTitle, "type">
> = ({ title, ...props }) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      タイトルの削除
    </span>
    <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
      <MinusSmallIcon className={clsx(["w-4"], ["text-gray-500"])} />
      <span
        className={clsx(
          ["ml-1"],
          ["line-clamp-2"],
          ["text-xs"],
          ["text-gray-700"]
        )}
      >
        {title}
      </span>
    </div>
  </HistItemTemplate>
);

type ChangePrimaryTitle = {
  type: "CHANGE_PRIMARY_TITLE";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  from: string | null;
  to: string;
};
export const ChangePrimaryTitleItem: React.FC<
  { className?: string } & Omit<ChangePrimaryTitle, "type">
> = ({ from, to, ...props }) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      主タイトルの変更
    </span>
    {from && (
      <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
        <MinusSmallIcon className={clsx(["w-4"], ["text-gray-500"])} />
        <span
          className={clsx(
            ["ml-1"],
            ["line-clamp-2"],
            ["text-xs"],
            ["text-gray-700"]
          )}
        >
          {from}
        </span>
      </div>
    )}
    <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
      <ArrowSmallRightIcon className={clsx(["w-4"], ["text-gray-500"])} />
      <span
        className={clsx(
          ["ml-1"],
          ["line-clamp-2"],
          ["text-xs"],
          ["text-gray-700"]
        )}
      >
        {to}
      </span>
    </div>
  </HistItemTemplate>
);

type AddThumbnail = {
  type: "ADD_THUMBNAIL";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  thumbnail: string;
};
export const AddThumbnailItem: React.FC<
  { className?: string } & Omit<AddThumbnail, "type">
> = (props) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      サムネイルの追加
    </span>
  </HistItemTemplate>
);

type DeleteThumbnail = {
  type: "DELETE_THUMBNAIL";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  thumbnail: string;
};
export const DeleteThumbnail: React.FC<
  { className?: string } & Omit<DeleteThumbnail, "type">
> = (props) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      サムネイルの削除
    </span>
  </HistItemTemplate>
);

type ChangePrimaryThumbnail = {
  type: "CHANGE_PRIMARY_THUMBNAIL";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  from: string | null;
  to: string;
};
export const ChangePrimaryThumbnailItem: React.FC<
  { className?: string } & Omit<ChangePrimaryThumbnail, "type">
> = (props) => (
  <HistItemTemplate {...props}>
    <span
      className={clsx(
        ["whitespace-nowrap"],
        ["text-sm"],
        ["font-bold"],
        ["text-slate-800"]
      )}
    >
      主サムネイルの変更
    </span>
  </HistItemTemplate>
);

type AddTagItem = {
  type: "ADD_TAG";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  tag: TagType;
};
export const AddTagItem: React.FC<
  { className?: string } & Omit<AddTagItem, "type">
> = ({ tag, ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <span
        className={clsx(
          ["whitespace-nowrap"],
          ["text-sm"],
          ["font-bold"],
          ["text-slate-700"]
        )}
      >
        タグの追加
      </span>
      <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
        <PlusSmallIcon className={clsx(["w-4"], ["text-gray-500"])} />
        <Tag
          className={clsx(["ml-2"])}
          id={tag.id}
          name={tag.name}
          contextName={tag.explicitParent?.name}
        />
      </div>
    </HistItemTemplate>
  );
};

type DeleteTagItem = {
  type: "DELETE_TAG";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  tag: TagType;
};
export const DeleteTagItem: React.FC<
  { className?: string } & Omit<DeleteTagItem, "type">
> = ({ tag, ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <span
        className={clsx(
          ["whitespace-nowrap"],
          ["text-sm"],
          ["font-bold"],
          ["text-slate-700"]
        )}
      >
        タグの削除
      </span>
      <div className={clsx(["mt-0.5"], ["flex"], ["flex-start"])}>
        <MinusSmallIcon className={clsx(["w-4"], ["text-gray-500"])} />
        <Tag
          className={clsx(["ml-2"])}
          id={tag.id}
          name={tag.name}
          contextName={tag.explicitParent?.name}
        />
      </div>
    </HistItemTemplate>
  );
};

type AddNiconcioSourceItem = {
  type: "ADD_NICONICO_SOURCE";
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
};
export const AddNiconcioSourceItem: React.FC<
  { className?: string } & Omit<AddNiconcioSourceItem, "type">
> = ({ ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <span
        className={clsx(
          ["whitespace-nowrap"],
          ["text-sm"],
          ["font-bold"],
          ["text-slate-700"]
        )}
      >
        ニコニコ動画との紐付け
      </span>
    </HistItemTemplate>
  );
};

export const History: React.FC<{
  className?: string;
  item:
    | Register
    | AddTitle
    | DeleteTitle
    | ChangePrimaryTitle
    | AddThumbnail
    | DeleteThumbnail
    | ChangePrimaryThumbnail
    | AddTagItem
    | DeleteTagItem
    | AddNiconcioSourceItem;
}> = ({ className, item }) => {
  return (
    <Fragment key={item.id}>
      {item.type === "REGISTER" && (
        <RegisterItem className={className} {...item} />
      )}
      {item.type === "ADD_TITLE" && (
        <AddTitleItem className={className} {...item} />
      )}
      {item.type === "DELETE_TITLE" && (
        <DeleteTitleItem className={className} {...item} />
      )}
      {item.type === "CHANGE_PRIMARY_TITLE" && (
        <ChangePrimaryTitleItem className={className} {...item} />
      )}
      {item.type === "ADD_THUMBNAIL" && (
        <AddThumbnailItem className={className} {...item} />
      )}
      {item.type === "DELETE_THUMBNAIL" && (
        <DeleteThumbnail className={className} {...item} />
      )}
      {item.type === "CHANGE_PRIMARY_THUMBNAIL" && (
        <ChangePrimaryThumbnailItem className={className} {...item} />
      )}
      {item.type === "ADD_TAG" && (
        <AddTagItem className={className} {...item} />
      )}
      {item.type === "DELETE_TAG" && (
        <DeleteTagItem className={className} {...item} />
      )}
      {item.type === "ADD_NICONICO_SOURCE" && (
        <AddNiconcioSourceItem className={className} {...item} />
      )}
    </Fragment>
  );
};
