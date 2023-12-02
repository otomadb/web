import { GraphQLClient } from "graphql-request";
import { notFound } from "next/navigation";

import Header from "~/app/(v2)/users/[name]/Header";
import { graphql } from "~/gql";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const result = await new GraphQLClient(
    "http://localhost:3000/api/graphql"
  ).request(
    graphql(`
      query MeUserPageLayout {
        viewer {
          ...UserPage_Header
        }
      }
    `)
  );
  if (!result.viewer) return notFound();

  return (
    <div>
      <Header fragment={result.viewer} />
      {children}
    </div>
  );
}
