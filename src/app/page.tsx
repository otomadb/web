import "server-only";

import AboutPage from "~/app/about/page";

import LoginCheck from "./LoginCheck";

export default async function Page() {
  return (
    <LoginCheck>
      <AboutPage />
    </LoginCheck>
  );
}
