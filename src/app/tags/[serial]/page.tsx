import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { VideoList } from "~/components/common/VideoList";
import { graphql, useFragment as getFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { VideoList_VideoFragmentDoc } from "~/gql/graphql";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const { findTag } = await fetchGql(
    graphql(`
      query TagPage_Title($serial: Int!) {
        findTag(input: { serial: $serial }) {
          name
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findTag) return notFound(); // TODO: これ本当にこれでいいの？

  return {
    title: findTag.name,
  };
}

export default async function Page({ params }: { params: { serial: string } }) {
  const { findTag } = await fetchGql(
    graphql(`
      query TagPage($serial: Int!) {
        findTag(input: { serial: $serial }) {
          name
          taggedVideos {
            ...VideoList_Video
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) },
    { next: { revalidate: 0 } }
  );

  if (!findTag) return notFound();

  return (
    <>
      <h1 className={clsx(["flex"], ["items-center"])}>
        <span className={clsx(["block"], ["text-2xl"], ["text-slate-800"])}>
          {findTag.name}
        </span>
      </h1>
      <div className={clsx(["mt-4"])}>
        <VideoList
          className={clsx()}
          videos={getFragment(VideoList_VideoFragmentDoc, findTag.taggedVideos)}
        />
      </div>
    </>
  );
}
