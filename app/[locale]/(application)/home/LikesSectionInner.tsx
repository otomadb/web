import clsx from "clsx";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

export const dynamic = "force-dynamic";

const LikesSectionInner = async () => {
  const result = await (
    await makeGraphQLClient2({ auth: "required" })
  ).request(
    graphql(`
      query HomePage_LikesSection {
        whoami {
          likes {
            registrations(first: 8) {
              nodes {
                id
                video {
                  ...CommonMadBlock
                }
              }
            }
          }
        }
      }
    `),
    {}
  );

  const {
    whoami: { likes },
  } = result;

  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-2 scrollbar-thin scrollbar-track-obsidian-primary scrollbar-thumb-obsidian-lighter scrollbar-w-[4px] @[512px]/likes:flex @[512px]/likes:overflow-x-scroll @[512px]/likes:pb-4"
      )}
    >
      {likes.registrations.nodes.map((node) => (
        <div key={node.id} className={clsx("shrink-0")}>
          <CommonMadBlock
            size="small"
            fragment={node.video}
            classNames={clsx("h-full @[512px]/likes:w-48")}
          />
        </div>
      ))}
    </div>
  );
};
export default LikesSectionInner;
