import clsx from "clsx";

import { LoginForm } from "./LoginForm";

const Page = async (_: Record<string, never>) => {
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <LoginForm />
    </main>
  );
};

export default Page;
