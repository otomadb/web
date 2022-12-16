import { useMemo } from "react";
import { useQuery } from "urql";

import { WhoamiDocument } from "~/gql/graphql";

export const useIsLoggedIn = (): boolean | undefined => {
  const [result] = useQuery({ query: WhoamiDocument });
  return useMemo(() => {
    const { data } = result;
    if (!data) return undefined;

    return !!data.whoami?.id;
  }, [result]);
};
