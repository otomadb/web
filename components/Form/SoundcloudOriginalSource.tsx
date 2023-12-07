"use client";

import clsx from "clsx";

import { CoolImage } from "~/components/CoolImage";
import { ExternalLinkPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const SoundcloudRegisterOriginalSourceFragment = graphql(`
  fragment RegisterFromSoundcloudForm_OriginalSource on SoundcloudOriginalSource {
    title
    sourceId
    url
    thumbnailUrl(scale: LARGE)
  }
`);
export default function OriginalSource({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>;
}) {
  const fragment = useFragment(
    SoundcloudRegisterOriginalSourceFragment,
    props.fragment
  );

  return (
    <div className={clsx(className, ["flex flex-col gap-y-2"])}>
      <div className={clsx(["flex gap-x-4"])}>
        <div className={clsx(["flex shrink-0 flex-col gap-y-4"])}>
          {
            // TODO: 画像がない場合の挙動
            fragment.thumbnailUrl && (
              <CoolImage
                className={clsx(["h-[64px] w-[96px]"])}
                src={fragment.thumbnailUrl}
                width={96}
                height={64}
                alt={`${fragment.sourceId}のサムネイル`}
                unoptimized={true}
              />
            )
          }
        </div>
        <div className={clsx(["flex grow flex-col py-2"])}>
          <div className={clsx(["text-sm font-bold text-slate-300"])}>
            {fragment.title}
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
