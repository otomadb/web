import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { CommonMadBlockFragment } from "~/components/CommonMadBlock";
import { makeFragmentData } from "~/gql";

import EditMylistRegistrationForm, {
  AddToMylistFormMadFragment,
  AddToMylistFormMadInMutation,
  AddToMylistFormMadOutMutation,
  newLocal,
} from ".";

export const mockFetchUser = mockGql.query(newLocal, (req, res, ctx) =>
  res(
    ctx.data({
      ensuredViewer: {
        allMylists: [
          {
            id: "mylist:1",
            slug: "mylist1",
            title: "Mylist 1",
            isIncludesVideo: false,
          },
          {
            id: "mylist:2",
            slug: "mylist2",
            title: "Mylist 2",
            isIncludesVideo: false,
          },
          {
            id: "mylist:3",
            slug: "mylist3",
            title: "Mylist 3",
            isIncludesVideo: true,
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
              isIncludesVideo: true,
            },
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
            isIncludesVideo: true,
          },
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
