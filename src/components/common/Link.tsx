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
  <Link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/videos/${videoId.split(":").at(1)!}`}
    {...props}
  >
    {children}
  </Link>
);

export const LinkTag: React.FC<LinkProps<{ tagId: string }>> = ({
  children,
  tagId,
  ...props
}) => (
  <Link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/tags/${tagId.split(":").at(1)!}`}
    {...props}
  >
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

export const LinkMylist: React.FC<LinkProps<{ mylistId: string }>> = ({
  children,
  mylistId,
  ...props
}) => (
  <Link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/mylists/${mylistId.split(":").at(1)!}`}
    {...props}
  >
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

export const LinkProfile: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link href={"/profile"} {...props}>
    {children}
  </Link>
);

export const LinkProfileLikes: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <Link href={"/profile/likes"} {...props}>
    {children}
  </Link>
);

export const LinkProfileMylists: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <Link href={"/profile/mylists"} {...props}>
    {children}
  </Link>
);
