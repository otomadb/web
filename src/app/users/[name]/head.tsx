import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Head({ params }: { params: { name: string } }) {
  const { user } = await gqlRequest(
    graphql(`
      query UserPage_Title($name: String!) {
        user(name: $name) {
          name
          displayName
        }
      }
    `),
    { name: params.name }
  );

  return (
    <>
      <CommonHead />
      <title>{`${user.displayName}(@${user.name}) - Otomad Database`}</title>
    </>
  );
}
