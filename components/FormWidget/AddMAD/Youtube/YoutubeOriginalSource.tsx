"use client";

import clsx from "clsx";

import { CoolImage } from "~/components/CoolImage";
import { ExternalLinkPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const YoutubeRegisterOriginalSourceFragment = graphql(`
  fragment YoutubeForm_OriginalSource on YoutubeOriginalSource {
    url
    sourceId
    thumbnailUrl
  }
`);
export default function YoutubeOriginalSource({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof YoutubeRegisterOriginalSourceFragment>;
}) {
  const fragment = useFragment(
    YoutubeRegisterOriginalSourceFragment,
    props.fragment
  );

  return (
    <div className={clsx(className, ["flex flex-col gap-y-2"])}>
      <div className={clsx(["flex gap-x-4"])}>
        <div className={clsx(["flex shrink-0 flex-col gap-y-4"])}>
          <CoolImage
            className={clsx(["h-[64px] w-[96px]"])}
            src={fragment.thumbnailUrl}
            width={96}
            height={64}
            alt={`${fragment.sourceId}のサムネイル`}
            unoptimized={true}
          />
        </div>
        <div className={clsx(["flex grow flex-col py-2"])}>
          <div className={clsx(["text-sm font-bold text-slate-300"])}>
            {/* 無いので */}
            <span>タイトルを取得できませんでした</span>
          </div>
          <div className={clsx(["mt-auto flex gap-x-2"])}>
            <a
              href={fragment.url}
              target="_blank"
              className={clsx(
                ["flex items-center gap-x-1"],
                ["text-slate-400 hover:text-sky-400"]
              )}
            >
              <ExternalLinkPictogram className={clsx(["h-4 w-4"])} />
              <span className={clsx(["font-mono text-sm"])}>
                {fragment.sourceId}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
