"use client";

import clsx from "clsx";

import { CoolImage } from "~/components/CoolImage";
import Pictogram from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterFromYoutubeForm_OriginalSource on YoutubeOriginalSource {
    url
    sourceId
    thumbnailUrl
  }
`);
export default function OriginalSource({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["flex"], ["gap-x-4"])}>
        <div className={clsx(["shrink-0"], ["flex", "flex-col", "gap-y-4"])}>
          <CoolImage
            className={clsx(["w-[96px]"], ["h-[64px]"])}
            src={fragment.thumbnailUrl}
            width={96}
            height={64}
            alt={`${fragment.sourceId}のサムネイル`}
            unoptimized={true}
          />
        </div>
        <div className={clsx(["py-2"], ["grow"], ["flex", "flex-col"])}>
          <div className={clsx(["text-slate-300"], ["text-sm", "font-bold"])}>
            {/* 無いので */}
            <span>タイトルを取得できませんでした</span>
          </div>
          <div className={clsx(["mt-auto"], ["flex", "gap-x-2"])}>
            <a
              href={fragment.url}
              target="_blank"
              className={clsx(
                ["flex", "items-center", "gap-x-1"],
                ["text-slate-400", "hover:text-sky-400"]
              )}
            >
              <Pictogram
                icon="external-link"
                className={clsx(["w-4", "h-4"])}
              />
              <span className={clsx(["text-sm", "font-mono"])}>
                {fragment.sourceId}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
