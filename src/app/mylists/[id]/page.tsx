import { PageInner } from "~/components/Mylists/PageInner";
import { MylistPageDocument } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { CheckPrivate } from "./CheckPrivate";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const data = await gqlRequest(MylistPageDocument, {
    id: `mylist:${params.id}`,
  });

  if (!data.findMylist) return <CheckPrivate mylistId={params.id} />;
  return <PageInner mylistId={params.id} fragment={data.findMylist} />;
}
