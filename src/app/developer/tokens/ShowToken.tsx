"use client";

import "client-only";

import clsx from "clsx";
import copy from "copy-to-clipboard";
import { useState } from "react";

import { useToaster } from "~/components/Toaster";

import Form from "./Form";

export const ShowToken = () => {
  const [token, setToken] = useState<string>();
  const callToast = useToaster();

  return (
    <div>
      <Form show={(t) => setToken(t)} />
      {token && (
        <div
          className={clsx(
            ["mt-2"],
            ["border", "border-slate-400"],
            ["bg-slate-200"],
            ["px-2"],
            ["py-1"]
          )}
        >
          <span
            role="button"
            className={clsx(
              ["select-all"],
              ["font-mono", "text-xs", "break-words"]
            )}
            onClick={(e) => {
              e.preventDefault();
              copy(token);
              callToast(<p>アクセストークンをコピーしました。</p>);
            }}
          >
            {token}
          </span>
        </div>
      )}
    </div>
  );
};
