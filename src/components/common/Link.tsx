import Link from "next/link";
import React, { ComponentProps } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type LinkProps<T = {}> = Omit<ComponentProps<typeof Link>, "href"> & T;

export const LinkTop: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/"} {...props}>
    {children}
  </Link>
);

export const LinkLogin: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/login"} {...props}>
    {children}
  </Link>
);

export const LinkVideo: React.FC<LinkProps<{ videoId: string }>> = ({
  children,
  videoId,
  ...props
}) => (
  <Link href={`/videos/${videoId}`} {...props}>
    {children}
  </Link>
);

export const LinkTag: React.FC<LinkProps<{ tagId: string }>> = ({
  children,
  tagId,
  ...props
}) => (
  <Link href={`/tags/${tagId}`} {...props}>
    {children}
  </Link>
);

export const LinkUser: React.FC<LinkProps<{ name: string }>> = ({
  children,
  name,
  ...props
}) => (
  <Link href={`/users/${name}`} {...props}>
    {children}
  </Link>
);

export const LinkUserLikes: React.FC<LinkProps<{ name: string }>> = ({
  children,
  name,
  ...props
}) => (
  <Link href={`/users/${name}/likes`} {...props}>
    {children}
  </Link>
);

export const LinkUserMylists: React.FC<LinkProps<{ name: string }>> = ({
  children,
  name,
  ...props
}) => (
  <Link href={`/users/${name}/mylists`} {...props}>
    {children}
  </Link>
);

export const LinkUserMylist: React.FC<
  LinkProps<{
    userName: string;
    mylistId: string;
  }>
> = ({ children, userName, mylistId, ...props }) => (
  <Link href={`/users/${userName}/mylists/${mylistId}`} {...props}>
    {children}
  </Link>
);

export const LinkSignup: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/signup"} {...props}>
    {children}
  </Link>
);

export const LinkSignin: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/login"} {...props}>
    {children}
  </Link>
);

export const LinkRegisterNicovideo: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <Link href={"/editor/nicovideo"} {...props}>
    {children}
  </Link>
);

export const LinkRegisterTag: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <Link href={"/editor/tags"} {...props}>
    {children}
  </Link>
);

export const LinkRegisterSemitag: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <Link href={"/editor/semitags"} {...props}>
    {children}
  </Link>
);

export const LinkYou: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/you"} {...props}>
    {children}
  </Link>
);

export const LinkYouLikes: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/you/likes"} {...props}>
    {children}
  </Link>
);

export const LinkYouMylists: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/you/mylists"} {...props}>
    {children}
  </Link>
);

export const LinkYouMylist: React.FC<LinkProps<{ mylistId: string }>> = ({
  mylistId,
  children,
  ...props
}) => (
  <Link href={`/you/mylists/${mylistId}`} {...props}>
    {children}
  </Link>
);
