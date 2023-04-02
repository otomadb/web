import React, { useEffect } from "react";
import SuperTokens from "supertokens-auth-react";

import SuperTokensComponent from "~/supertokens/Component";

export default function Auth(): JSX.Element {
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      SuperTokens.redirectToAuth({ redirectBack: false });
    }
  }, []);

  return (
    <div>
      <main>
        <SuperTokensComponent />
      </main>
    </div>
  );
}
