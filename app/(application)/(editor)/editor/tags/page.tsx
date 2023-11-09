import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import clsx from "clsx";
import type { Metadata } from "next";

import { RegisterTagForm } from "./Form";

export const metadata: Metadata = {
  title: "タグの登録",
};

export default withPageAuthRequired(
  async function Page() {
    return (
      <main className={clsx(["max-w-screen-2xl", "w-full"], ["mx-auto"])}>
        <RegisterTagForm
          className={clsx(["py-8"], ["h-[calc(100vh-64px)]"], ["w-full"])}
        />
      </main>
    );
  },
  {
    returnTo: "/editor/tags",
  }
);
