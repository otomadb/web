import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { CommonMadBlockFragment } from "~/components/CommonMadBlock";
import { makeFragmentData } from "~/gql";

import EditMylistRegistrationForm, {
  AddToMylistFormMadFragment,
  AddToMylistFormMadInMutation,
  AddToMylistFormMadOutMutation,
  MylistFragment,
  QueryFetchMylists,
} from ".";

export const mockFetchUser = mockGql.query(QueryFetchMylists, (req, res, ctx) =>
  res(
    ctx.data({
      viewer: {
        allMylists: [
          {
            id: "mylist:1",
            ...makeFragmentData(
              {
                slug: "mylist1",
                title: "Mylist 1",
                isIncludesVideo: false,
                isLikeList: false,
              },
              MylistFragment
            ),
          },
          {
            id: "mylist:2",
            ...makeFragmentData(
              {
                slug: "mylist2",
                title: "Mylist 2",
                isIncludesVideo: true,
                isLikeList: false,
              },
              MylistFragment
            ),
          },
          {
            id: "mylist:3",
            ...makeFragmentData(
              {
                slug: "mylist3",
                title: "Mylist 4",
                isIncludesVideo: false,
                isLikeList: false,
              },
              MylistFragment
            ),
          },
        ],
      },
    })
  )
);
export const mockAddSuccessful = mockGql.mutation(
  AddToMylistFormMadInMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        addVideoToMylist: {
          __typename: "AddVideoToMylistSucceededPayload",
          registration: {
            id: "registration:1",
            mylist: {
              id: "mylist:1",
              title: "Mylist 1",
              isLikeList: false,
              slug: "mylist1",
              isIncludesVideo: true,
            } as any,
          },
        },
      })
    )
);
export const mockRemoveSuccessful = mockGql.mutation(
  AddToMylistFormMadOutMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        removeVideoFromMylist: {
          __typename: "RemoveVideoFromMylistSucceededPayload",
          mylist: {
            id: "mylist:1",
            isIncludesVideo: false,
          } as any,
        },
      })
    )
);

const meta = {
  excludeStories: /^mock/,
  component: EditMylistRegistrationForm,
  args: {
    style: {
      width: 640,
      height: 480,
    },
    fragment: makeFragmentData(
      {
        id: "mad:1",
        title: "Test",
        ...makeFragmentData(
          {
            id: "mad:1",
            title: "Test",
            serial: 1,
            thumbnailUrl: "/thumbnail.jpg",
            taggings: { nodes: [] },
          },
          CommonMadBlockFragment
        ),
      },
      AddToMylistFormMadFragment
    ),
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockFetchUser, mockAddSuccessful, mockRemoveSuccessful],
      },
    },
  },
} as Meta<typeof EditMylistRegistrationForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
