import clsx from "clsx";

import { LoginForm } from "./LoginForm";

const Page = async () => {
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <LoginForm />
    </main>
  );
};

export default Page;
