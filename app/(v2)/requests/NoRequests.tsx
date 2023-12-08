import clsx from "clsx";
import { ReactNode } from "react";

export default function NoRequests({ Title }: { Title: ReactNode }) {
  return (
    <main className={clsx("flex flex-col @container/page")}>
      <header className={clsx("flex w-full items-center px-8 py-4")}>
        <h1 className="text-xl font-bold text-snow-primary">{Title}</h1>
      </header>
    </main>
  );
}
