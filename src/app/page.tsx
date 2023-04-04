import "server-only";

import AboutPage from "~/app/about/page";

export default async function Page() {
  return (
    <>
      {/* @ts-expect-error for Server Component*/}
      <AboutPage />
    </>
  );
}
