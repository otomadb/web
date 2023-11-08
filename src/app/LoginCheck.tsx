"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import Quote, { quotes } from "~/components/Quote";

export default function LoginCheck({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const [quote, setQuote] = useState<number | undefined>();

  useEffect(() => {
    if (isAuthenticated) router.replace("/me");
  }, [isAuthenticated, router]);

  useEffect(
    () => {
      if (!quote) setQuote(Math.floor(Math.random() * quotes.length));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!isLoading && !isAuthenticated) return <>{children}</>;

  return (
    <div
      className={clsx([
        "flex h-[calc(100vh-[64px])] w-full flex-col items-center justify-center",
      ])}
    >
      {quote !== undefined && (
        <Quote className={clsx("mt-2 w-96")} index={quote} />
      )}
    </div>
  );
}
