import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

import { Tag } from "./Tag";

/*
export const generateStaticParams = (): { id: string }[] => {
  return [{ id: "1" }, { id: "2" }];
};
*/

export const HistItem: React.FC<{
  classNames?: string;
  children?: ReactNode;
  id: string;
  user: {
    name: string;
    displayName: string;
    icon: string;
  };
  createdAt: Date;
}> = ({ classNames, user, children, createdAt }) => {
  return (
    <div
      className={clsx(
        classNames,
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

export const RegisterHistory: React.FC<{
  classNames?: string;
  id: string;
  user: {
    name: string;
    displayName: string;
    icon: string;
  };
  createdAt: Date;
}> = (props) => (
  <HistItem {...props}>
    <div className={clsx(["flex"])}>
      <span>動画の追加</span>
    </div>
  </HistItem>
);

export const AddTag: React.FC<{
  classNames?: string;
  id: string;
  user: {
    name: string;
    displayName: string;
    icon: string;
  };
  tag: { id: string; name: string; type: string };
  createdAt: Date;
}> = ({ tag, ...rest }) => {
  return (
    <HistItem {...rest}>
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
    </HistItem>
  );
};
