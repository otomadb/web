import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import MyLikesPageLink from "../me/likes/Link";
import { ModalOpener } from "./ModalOpener";
import Timeline from "./Timeline";

export const dynamic = "force-dynamic";

export default withPageAuthRequired(
  async () => {
    const { accessToken } = await getAccessToken();
    if (!accessToken) throw new Error("accessToken is null");

    const result = await makeGraphQLClient({}).request(
      graphql(`
        query HomePage {
          viewer {
            id
            likes {
              registrations(first: 8) {
                nodes {
                  id
                  video {
                    id
                    ...CommonMadBlock
                  }
                }
              }
            }
          }
        }
      `),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );
    const { viewer } = result;
    if (!viewer) throw new Error("viewer is null");

    const { likes } = viewer;

    return (
      <>
        <ModalOpener />
        <main className={clsx("mx-auto max-w-screen-2xl @container/page")}>
          <div className={clsx("flex flex-col gap-4 @[1280px]/page:flex-row")}>
            <Timeline
              className={clsx(
                "order-2 w-full grow @[1280px]/page:order-1 @[1280px]/page:w-auto"
              )}
            />
            <div
              className={clsx(
                "order-1 flex w-full shrink-0 flex-col @[1280px]/page:order-2 @[1280px]/page:w-128"
              )}
            >
              <section
                className={clsx(
                  "rounded-lg border border-obsidian-primary bg-obsidian-darker p-4 @container/likes"
                )}
              >
                <div className={clsx("flex items-center px-4")}>
                  <p
                    className={clsx(
                      "grow text-base font-bold text-snow-primary"
                    )}
                  >
                    あなたがいいねした音MAD
                  </p>
                  <MyLikesPageLink
                    className={clsx(
                      "text-xs text-snow-darker hover:text-vivid-primary hover:underline"
                    )}
                  >
                    もっと見る
                  </MyLikesPageLink>
                </div>
                <div className={clsx("mt-2 flex flex-col items-stretch")}>
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
                </div>
              </section>
            </div>
          </div>
        </main>
      </>
    );
  },
  { returnTo: "/" }
);
