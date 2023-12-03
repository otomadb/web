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
        className={clsx(className, "mb-2 text-3xl font-bold text-snow-lighter")}
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
          "mb-1 mt-12 text-2xl font-bold text-snow-lighter"
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
          "mb-1 mt-4 text-lg font-semibold text-snow-lighter"
        )}
      >
        {children}
      </h3>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(className, "my-2 flex list-disc flex-col pl-8")}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={clsx(className, "my-2 flex list-decimal flex-col pl-8")}
      >
        {children}
      </ul>
    ),
    li: ({ children, className, ...props }) => (
      <li {...props} className={clsx(className, "text-sm text-snow-primary")}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        {...props}
        className={clsx(
          className,
          "my-4 border-l-4 border-obsidian-lightest bg-obsidian-lighter px-4 py-2 text-snow-lighter"
        )}
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
      <p
        {...props}
        className={clsx(
          className,
          "text-base  leading-relaxed text-snow-primary"
        )}
      >
        {children}
      </p>
    ),
    a: ({ children, className, ...props }) => (
      <a
        {...props}
        className={clsx(className, "text-vivid-primary hover:underline")}
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
        className={clsx(className, "font-semibold text-snow-lighter")}
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
