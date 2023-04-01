import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import SuperTokens from "supertokens-auth-react";

const SuperTokensComponentNoSSR = dynamic<
  React.ComponentProps<typeof SuperTokens.getRoutingComponent>
>(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

export default function Auth(): JSX.Element {
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      SuperTokens.redirectToAuth({
        redirectBack: false,
      });
    }
  }, []);

  return (
    <div>
      <main>
        <p>AA</p>
      </main>
    </div>
  );
}
