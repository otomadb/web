"use client";

import clsx from "clsx";
import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, className, ...props }) => (
      <h1
        {...props}
        id={children?.toString()}
        className={clsx(className, ["mb-2 text-3xl font-bold text-slate-800"])}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2
        {...props}
        id={children?.toString()}
        className={clsx(className, [
          "mb-1 mt-8 text-2xl font-bold text-slate-800",
        ])}
      >
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3
        {...props}
        id={children?.toString()}
        className={clsx(className, [
          "mb-1 mt-2 text-lg font-semibold text-slate-800",
        ])}
      >
        {children}
      </h3>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(className, ["my-2 flex list-disc flex-col pl-8"])}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(className, ["my-2 flex list-decimal flex-col pl-8"])}
      >
        {children}
      </ul>
    ),
    li: ({ children, className, ...props }) => (
      <li {...props} className={clsx(className, "text-sm text-slate-900")}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        {...props}
        className={clsx(className, [
          "my-2 border-l-4 border-slate-500 bg-slate-200 px-4 py-2 text-slate-900",
        ])}
      >
        {children}
      </blockquote>
    ),
    hr: ({ children, className, ...props }) => (
      <hr {...props} className={clsx(className, "my-2")}>
        {children}
      </hr>
    ),
    p: ({ children, className, ...props }) => (
      <p {...props} className={clsx(className, "text-base  text-slate-900")}>
        {children}
      </p>
    ),
    a: ({ children, className, ...props }) => (
      <a
        {...props}
        className={clsx(className, "text-blue-600 hover:underline")}
      >
        {children}
      </a>
    ),
    em: ({ children, className, ...props }) => (
      <em {...props} className={clsx(className, "italic")}>
        {children}
      </em>
    ),
    strong: ({ children, className, ...props }) => (
      <strong
        {...props}
        className={clsx(className, "font-semibold text-slate-700")}
      >
        {children}
      </strong>
    ),
    code: ({ children, className, ...props }) => (
      <code
        {...props}
        className={clsx(className, "bg-blue-100 px-0.5 font-mono")}
      >
        {children}
      </code>
    ),
    ...components,
  };
}
