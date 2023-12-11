import clsx from "clsx";
import Link from "next/link";

import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

const Page = async () => {
  const result = await (
    await makeGraphQLClient2({
      next: {
        revalidate: 60 * 15,
      },
    })
  ).request(
    graphql(`
      query GroupsPage {
        getAllAbstractGroups {
          keyword
          name
        }
      }
    `)
  );

  const { getAllAbstractGroups } = result;

  return (
    <main className={clsx("px-8 py-4 @container/page")}>
      <ul>
        {getAllAbstractGroups.map((group) => (
          <li key={group.keyword}>
            <Link
              href={{ pathname: `/groups/${group.keyword}/well-created` }}
              className={clsx(
                "text-snow-primary hover:text-vivid-primary hover:underline"
              )}
            >
              よく音MADが作られている{group.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Page;
