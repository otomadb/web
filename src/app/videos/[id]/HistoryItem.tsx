import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, ReactNode } from "react";

import { Tag } from "./Tag";

/*
export const generateStaticParams = (): { id: string }[] => {
  return [{ id: "1" }, { id: "2" }];
};
*/

const HistItemTemplate: React.FC<{
  className?: string;
  children?: ReactNode;
  id: string;
  user: { name: string; displayName: string; icon: string };
  createdAt: Date;
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
            className={clsx(["w-6"], ["h-6"])}
            alt={user.name}
          />
          <span className={clsx(["ml-2"], ["text-sm"])}>
            {user.displayName}
          </span>
        </Link>
        <span className={clsx(["ml-2"], ["text-xs"], ["text-gray-600"])}>
          {createdAt.toString()}
        </span>
      </div>
    </div>
  );
};

type Register = {
  type: "REGISTER";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex"])}>
      <span className={clsx(["text-sm"])}>動画の追加</span>
    </div>
  </HistItemTemplate>
);

type AddTitle = {
  type: "ADD_TITLE";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex", ["items-center"]])}>
      <span className={clsx(["text-sm"])}>タイトルの追加</span>
      <span className={clsx(["ml-2"], ["text-sm"], ["text-gray-700"])}>
        {title}
      </span>
    </div>
  </HistItemTemplate>
);

type DeleteTitle = {
  type: "DELETE_TITLE";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex", ["items-center"]])}>
      <span className={clsx(["text-sm"])}>タイトルの削除</span>
      <span className={clsx(["ml-2"], ["text-sm"], ["text-gray-700"])}>
        {title}
      </span>
    </div>
  </HistItemTemplate>
);

type ChangePrimaryTitle = {
  type: "CHANGE_PRIMARY_TITLE";
  id: string;
  createdAt: any;
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
> = (props) => (
  <HistItemTemplate {...props}>
    <div className={clsx(["flex"])}>
      <span className={clsx(["text-sm"])}>主タイトルの変更</span>
    </div>
  </HistItemTemplate>
);

type AddThumbnail = {
  type: "ADD_THUMBNAIL";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex"])}>
      <span className={clsx(["text-sm"])}>サムネイルの追加</span>
    </div>
  </HistItemTemplate>
);

type DeleteThumbnail = {
  type: "DELETE_THUMBNAIL";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex"])}>
      <span className={clsx(["text-sm"])}>サムネイルの削除</span>
    </div>
  </HistItemTemplate>
);

type ChangePrimaryThumbnail = {
  type: "CHANGE_PRIMARY_THUMBNAIL";
  id: string;
  createdAt: any;
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
    <div className={clsx(["flex"])}>
      <span className={clsx(["text-sm"])}>主サムネイルの変更</span>
    </div>
  </HistItemTemplate>
);

type AddTagItem = {
  type: "ADD_TAG";
  id: string;
  createdAt: any;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  tag: {
    id: string;
    name: string;
    type: string;
  };
};
export const AddTagItem: React.FC<
  { className?: string } & Omit<AddTagItem, "type">
> = ({ tag, ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <div className={clsx(["flex"], ["items-center"])}>
        <span className={clsx(["text-sm"])}>タグの追加</span>
        <Tag
          className={clsx(["ml-2"])}
          id={tag.id}
          name={tag.name}
          type={tag.type}
          context_name={null}
        />
      </div>
    </HistItemTemplate>
  );
};

type DeleteTagItem = {
  type: "DELETE_TAG";
  id: string;
  createdAt: any;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
  tag: {
    id: string;
    name: string;
    type: string;
  };
};
export const DeleteTagItem: React.FC<
  { className?: string } & Omit<DeleteTagItem, "type">
> = ({ tag, ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <div className={clsx(["flex"], ["items-center"])}>
        <span className={clsx(["text-sm"])}>タグの削除</span>
        <Tag
          className={clsx(["ml-2"])}
          id={tag.id}
          name={tag.name}
          type={tag.type}
          context_name={null}
        />
      </div>
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
    | DeleteTagItem;
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
    </Fragment>
  );
};
