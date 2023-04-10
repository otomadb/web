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
        className={clsx(
          className,
          ["text-slate-800", "font-bold", "text-3xl"],
          ["mb-2"]
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2
        {...props}
        id={children?.toString()}
        className={clsx(
          className,
          ["text-slate-800", "text-2xl", "font-bold"],
          ["mt-8", "mb-1"]
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3
        {...props}
        id={children?.toString()}
        className={clsx(
          className,
          ["text-slate-800", "text-lg", "font-semibold"],
          ["mt-2", "mb-1"]
        )}
      >
        {children}
      </h3>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(
          className,
          ["flex", "flex-col"],
          ["list-disc"],
          ["pl-8"],
          ["my-2"]
        )}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(
          className,
          ["flex", "flex-col"],
          ["list-decimal"],
          ["pl-8"],
          ["my-2"]
        )}
      >
        {children}
      </ul>
    ),
    li: ({ children, className, ...props }) => (
      <li {...props} className={clsx(className, ["text-slate-900", "text-sm"])}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        {...props}
        className={clsx(
          className,
          ["bg-slate-200"],
          ["border-l-4", "border-slate-500"],
          ["py-2", "px-4"],
          ["my-2"],
          ["text-slate-900"]
        )}
      >
        {children}
      </blockquote>
    ),
    hr: ({ children, className, ...props }) => (
      <hr {...props} className={clsx(className, ["my-2"])}>
        {children}
      </hr>
    ),
    p: ({ children, className, ...props }) => (
      <p {...props} className={clsx(className, ["text-slate-900", "text-md"])}>
        {children}
      </p>
    ),
    a: ({ children, className, ...props }) => (
      <a
        {...props}
        className={clsx(className, ["hover:underline"], ["text-blue-600"])}
      >
        {children}
      </a>
    ),
    em: ({ children, className, ...props }) => (
      <em {...props} className={clsx(className, ["font-italic"])}>
        {children}
      </em>
    ),
    strong: ({ children, className, ...props }) => (
      <strong
        {...props}
        className={clsx(className, ["text-slate-700", "font-semibold"])}
      >
        {children}
      </strong>
    ),
    code: ({ children, className, ...props }) => (
      <code
        {...props}
        className={clsx(className, ["font-mono"], ["px-0.5"], ["bg-blue-100"])}
      >
        {children}
      </code>
    ),
    ...components,
  };
}
