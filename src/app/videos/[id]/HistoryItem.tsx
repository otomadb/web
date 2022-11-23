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
        ["px-4"],
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

type RegisterVideoItem = {
  type: "REGSITER_VIDEO";
  id: string;
  createdAt: any;
  user: {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  };
};
export const RegisterHistory: React.FC<
  { className?: string } & Omit<RegisterVideoItem, "type">
> = (props) => (
  <HistItemTemplate {...props}>
    <div className={clsx(["flex"])}>
      <span>動画の追加</span>
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
export const AddTag: React.FC<
  { className?: string } & Omit<AddTagItem, "type">
> = ({ tag, ...rest }) => {
  return (
    <HistItemTemplate {...rest}>
      <div className={clsx(["flex"], ["items-center"])}>
        <span>タグの追加</span>
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
  item: RegisterVideoItem | AddTagItem;
}> = ({ className, item }) => {
  return (
    <Fragment key={item.id}>
      {item.type === "REGSITER_VIDEO" && (
        <RegisterHistory className={className} {...item} />
      )}
      {item.type === "ADD_TAG" && <AddTag className={className} {...item} />}
    </Fragment>
  );
};
