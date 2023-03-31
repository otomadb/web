import "server-only";

import AboutPage from "~/app/about/page";

import { HomeRedirector } from "./HomeRedirector";

export default async function Page() {
  return (
    <HomeRedirector>
      {/* @ts-expect-error for Server Component*/}
      <AboutPage />
    </HomeRedirector>
  );
}
