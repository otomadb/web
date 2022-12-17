import { MylistPageDocument } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { ExistsCheck, PageInner } from "./PageInner";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const fallback = await gqlRequest(MylistPageDocument, {
    id: `mylist:${params.id}`,
  });

  if (!fallback.findMylist) return <ExistsCheck mylistId={params.id} />;
  return <PageInner mylistId={params.id} fallback={fallback.findMylist} />;
}
