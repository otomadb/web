import {
  ArrowPathRoundedSquareIcon,
  DocumentPlusIcon,
  LinkIcon,
  MinusIcon,
  PlusSmallIcon,
  TagIcon,
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
          <span className={clsx(["ml-1"], ["text-xs"], ["text-slate-700"])}>
            {user.displayName}
          </span>
        </Link>
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
  <HistItemTemplate
    {...props}
    title={"動画の追加"}
    icon={({ className }) => (
      <DocumentPlusIcon className={clsx(className, ["text-teal-500"])} />
    )}
  />
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
  <HistItemTemplate
    {...props}
    title={"タイトルの追加"}
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
  <HistItemTemplate
    {...props}
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
  <HistItemTemplate
    {...props}
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
  <HistItemTemplate
    {...props}
    title={"サムネイルの追加"}
    icon={({ className }) => (
      <PlusSmallIcon className={clsx(className, ["text-teal-500"])} />
    )}
  />
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
  <HistItemTemplate
    {...props}
    title={"サムネイルの削除"}
    icon={({ className }) => (
      <MinusIcon className={clsx(className, ["text-red-400"])} />
    )}
  />
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
  <HistItemTemplate
    {...props}
    title={"主サムネイルの変更"}
    icon={({ className }) => (
      <ArrowPathRoundedSquareIcon
        className={clsx(className, ["text-purple-500"])}
      />
    )}
  />
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
    <HistItemTemplate
      {...rest}
      title={"タグの追加"}
      icon={({ className }) => (
        <TagIcon className={clsx(className, ["text-teal-400"])} />
      )}
    >
      <Tag id={tag.id} name={tag.name} contextName={tag.explicitParent?.name} />
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
    <HistItemTemplate
      {...rest}
      title={"タグの削除"}
      icon={({ className }) => (
        <MinusIcon className={clsx(className, ["text-red-400"])} />
      )}
    >
      <Tag id={tag.id} name={tag.name} contextName={tag.explicitParent?.name} />
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
    <HistItemTemplate
      {...rest}
      title={"ニコニコ動画との紐付け"}
      icon={({ className }) => (
        <LinkIcon className={clsx(className, ["text-teal-500"])} />
      )}
    />
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
