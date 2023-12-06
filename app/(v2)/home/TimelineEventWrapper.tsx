import clsx from "clsx";

import DateTime2 from "~/components/DateTime2";
import { PictogramType } from "~/components/Pictogram";
import UserDisplayNameLink from "~/components/UserLink/UserDisplayNameLink";
import UserIconLink from "~/components/UserLink/UserIconLink";
import { FragmentType, graphql, useFragment } from "~/gql";

export const TimelineEventWrapperFragment = graphql(`
  fragment MyTopPage_TimelineSegment_TimelineEventWrapper on TimelineEvent {
    createdAt
    event {
      id
      user {
        id
        ...UserIconLink
        ...UserDisplayNameLink
      }
    }
  }
`);
export const TimelineEventWrapper = ({
  className,
  style,
  Title,
  Main,
  Details,
  Icon,
  Widgets,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof TimelineEventWrapperFragment>;
  Icon: PictogramType;
  Title: React.FC<{ className?: string }>;
  Main: React.FC<{ className?: string }>;
  Details: {
    title: string;
    Content: React.FC<{ className?: string }>;
  }[];
  Widgets?: React.FC<{ className?: string }>[];
}) => {
  const fragment = useFragment(TimelineEventWrapperFragment, props.fragment);
  const { event, createdAt } = fragment;

  return (
    <div
      className={clsx(
        className,
        "flex flex-col gap-y-4 rounded border border-obsidian-lighter bg-obsidian-primary p-4"
      )}
      style={style}
    >
      <div className={clsx("flex items-center")}>
        <Icon className={clsx("h-8 w-8 rounded border p-1")} />
        <div className={clsx("flex grow items-center")}>
          <div className={clsx("ml-4 flex grow items-center gap-x-2")}>
            <UserIconLink fragment={event.user} size="small" />
            <p className={clsx("text-sm font-bold text-snow-primary")}>
              <Title />
            </p>
          </div>
          <div className={clsx("shrink-0")}>
            <DateTime2
              date={createdAt}
              className={clsx("font-mono text-xs text-snow-darkest")}
            />
          </div>
        </div>
      </div>
      <div className={clsx("flex gap-x-4")}>
        <div>
          <Main />
        </div>
        <div className={clsx("flex grow flex-col gap-y-2")}>
          <div
            className={clsx(
              "flex grow flex-col gap-y-4 rounded border border-obsidian-lighter bg-obsidian-darker p-4"
            )}
          >
            <div
              className={clsx(
                "flex items-center gap-x-2 border-l-2 border-l-obsidian-lighter px-2"
              )}
            >
              <p className={clsx("text-xs text-snow-darker")}>した人</p>
              <div className={clsx("flex grow justify-end")}>
                <UserDisplayNameLink
                  fragment={event.user}
                  className={clsx(
                    "text-sm text-snow-primary hover:text-vivid-primary hover:underline"
                  )}
                />
              </div>
            </div>
            {Details.map(({ title, Content }, i) => (
              <div
                key={i}
                className={clsx(
                  "flex items-center gap-x-2 border-l-2 border-l-obsidian-lighter px-2"
                )}
              >
                <p className={clsx("text-xs text-snow-darker")}>{title}</p>
                <div className={clsx("flex grow justify-end")}>
                  <Content />
                </div>
              </div>
            ))}
          </div>
          {Widgets && (
            <div className={clsx("flex shrink-0 justify-end")}>
              {Widgets?.map((Widget, i) => (
                <Widget key={i} className={clsx("h-6 w-6")} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
