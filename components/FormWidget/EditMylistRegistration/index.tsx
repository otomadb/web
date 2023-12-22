"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CSSProperties, useMemo } from "react";
import { useMutation, useQuery } from "urql";

import YouMylistPageLink from "~/app/[locale]/(application)/me/mylists/[slug]/Link";
import CommonMadBlock from "~/components/CommonMadBlock";
import { ExternalLinkPictogram, PlusPictogram } from "~/components/Pictogram";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormWrapper2 } from "../FormWrapper";

export const MylistFragment = graphql(`
  fragment EditMylistRegistrationForm_Mylist on Mylist {
    ...YouMylistPageLink
    title
    slug
    isIncludesVideo(id: $madId)
  }
`);
export const Mylist: React.FC<{
  frozen: boolean;
  fragment: FragmentType<typeof MylistFragment>;
  handleAdd(): void;
  handleRemove(): void;
}> = ({ frozen, fragment, handleAdd, handleRemove }) => {
  const mylist = useFragment(MylistFragment, fragment);
  const { title, isIncludesVideo } = mylist;

  return (
    <label className={clsx("flex gap-x-2")}>
      <input
        type="checkbox"
        disabled={frozen}
        checked={isIncludesVideo}
        onChange={async (e) => {
          if (e.currentTarget.checked) handleAdd();
          else handleRemove();
        }}
      ></input>
      <div className={clsx("flex items-center gap-x-2")}>
        <div className={clsx("text-lg font-bold text-snow-primary")}>
          {title}
        </div>
        <YouMylistPageLink
          fragment={mylist}
          className={clsx(
            "block h-6 w-6 p-1 text-snow-darker hover:text-vivid-primary"
          )}
        >
          <ExternalLinkPictogram className={clsx("h-full w-full")} />
        </YouMylistPageLink>
      </div>
    </label>
  );
};

export const AddToMylistFormMadFragment = graphql(`
  fragment AddToMylistForm_Mad on Video {
    id
    title
    ...CommonMadBlock
  }
`);
export const QueryFetchMylists = graphql(`
  query AddToMylistForm_User($madId: ID!) {
    viewer {
      allMylists {
        id
        ...EditMylistRegistrationForm_Mylist
      }
    }
  }
`);
export const AddToMylistFormMadInMutation = graphql(`
  mutation AddToMylistFormMad_In($mylistId: ID!, $madId: ID!) {
    addVideoToMylist(input: { mylistId: $mylistId, videoId: $madId }) {
      __typename
      ... on AddVideoToMylistSucceededPayload {
        registration {
          id
          mylist {
            id
            title
            ...YouMylistPageLink
            ...EditMylistRegistrationForm_Mylist
          }
        }
      }
    }
  }
`);
export const AddToMylistFormMadOutMutation = graphql(`
  mutation AddToMylistFormMad_Out($mylistId: ID!, $madId: ID!) {
    removeVideoFromMylist(input: { mylistId: $mylistId, videoId: $madId }) {
      __typename
      ... on RemoveVideoFromMylistSucceededPayload {
        mylist {
          id
          title
          ...YouMylistPageLink
          ...EditMylistRegistrationForm_Mylist
        }
      }
    }
  }
`);
const EditMylistRegistrationForm = ({
  className,
  style,
  fragment,
}: {
  className?: string;
  style?: CSSProperties;
  fragment: FragmentType<typeof AddToMylistFormMadFragment>;
}) => {
  const madF = useFragment(AddToMylistFormMadFragment, fragment);
  const { id: madId } = madF;

  const [{ data, fetching }, reload] = useQuery({
    query: QueryFetchMylists,
    variables: { madId },
  });
  const [{ fetching: fetchingAdd }, add] = useMutation(
    AddToMylistFormMadInMutation
  );
  const [{ fetching: fetchingRemove }, remove] = useMutation(
    AddToMylistFormMadOutMutation
  );
  const toast = useToaster();
  const router = useRouter();

  const frozen = useMemo(
    () => fetching || fetchingAdd || fetchingRemove,
    [fetching, fetchingAdd, fetchingRemove]
  );

  return (
    <FormWrapper2
      className={clsx(className)}
      style={style}
      Icon={PlusPictogram}
      Title={
        <>
          <span>{madF.title}</span>をマイリストに追加する
        </>
      }
    >
      <div className={clsx("flex w-full flex-col gap-y-4")}>
        {!fetching && !data?.viewer && (
          <p className={clsx("text-xs text-snow-darkest")}>
            マイリストに追加するためにはログインしてください．
          </p>
        )}
        {data?.viewer && (
          <>
            <div className={clsx("w-full")}>
              <div className={clsx("text-xs font-bold text-snow-darker")}>
                追加する動画
              </div>
              <CommonMadBlock
                fragment={madF}
                size="small"
                classNames={clsx("mt-1")}
              />
            </div>
            <div className={clsx("w-full")}>
              <div className={clsx("text-xs font-bold text-snow-darker")}>
                マイリスト
              </div>
              <div className={clsx("mt-1 flex flex-col")}>
                {fetching && !data && (
                  <p className={clsx("text-xs text-snow-darkest")}>
                    Loading...
                  </p>
                )}
                {data.viewer.allMylists.map((mylist) => (
                  <Mylist
                    key={mylist.id}
                    fragment={mylist}
                    frozen={frozen}
                    handleAdd={async () => {
                      const d = await add({ mylistId: mylist.id, madId });
                      if (
                        !d.data ||
                        d.data.addVideoToMylist.__typename !==
                          "AddVideoToMylistSucceededPayload"
                      ) {
                        toast(<>マイリストへの追加に失敗しました</>, {
                          type: "error",
                        });
                      } else {
                        toast(
                          <>
                            <YouMylistPageLink
                              fragment={
                                d.data.addVideoToMylist.registration.mylist
                              }
                              className={clsx("text-vivid-primary")}
                            >
                              {
                                d.data.addVideoToMylist.registration.mylist
                                  .title
                              }
                            </YouMylistPageLink>
                            に追加しました
                          </>
                        );
                      }
                      reload();
                      router.refresh();
                    }}
                    handleRemove={async () => {
                      const d = await remove({ mylistId: mylist.id, madId });
                      if (
                        !d.data ||
                        d.data.removeVideoFromMylist.__typename !==
                          "RemoveVideoFromMylistSucceededPayload"
                      ) {
                        toast(<>マイリストからの削除に失敗しました</>, {
                          type: "error",
                        });
                        return;
                      } else {
                        toast(
                          <>
                            <YouMylistPageLink
                              fragment={d.data.removeVideoFromMylist.mylist}
                              className={clsx("text-vivid-primary")}
                            >
                              {d.data.removeVideoFromMylist.mylist.title}
                            </YouMylistPageLink>
                            から削除しました
                          </>
                        );
                      }
                      reload();
                      router.refresh();
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </FormWrapper2>
  );
};

export default EditMylistRegistrationForm;
