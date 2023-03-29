import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { ToastContext } from "~/app/ToastProvider";
import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { aSemitagRejecting, aSemitagResolving, TagType } from "~/gql/graphql";

import SemitagRow, { Fragment } from "./SemitagRow";
import { Mutation as RejectMutation } from "./useReject";
import { Mutation as ResolveMutation } from "./useResolve";

const meta = {
  component: SemitagRow,
  args: {},
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <ToastContext.Provider value={{ call: action("callToast") }}>
          <SemitagRow {...args} />
        </ToastContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(ResolveMutation, (req, res, ctx) => {
          return res(
            ctx.data({
              resovleSemitag: {
                __typename: "ResolveSemitagSucceededPayload",
                resolving: aSemitagResolving({}),
              },
            })
          );
        }),
        graphql.mutation(RejectMutation, (req, res, ctx) => {
          return res(
            ctx.data({
              rejectSemitag: {
                __typename: "RejectSemitagSucceededPayload",
                rejecting: aSemitagRejecting({}),
              },
            })
          );
        }),
      ],
    },
  },
} as Meta<typeof SemitagRow>;
export default meta;

export const NotChecked: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "",
          title: "",
        },
        checked: false,
        suggestTags: {
          __typename: "SemitagSuggestTagsReturn",
          items: [
            {
              canResolveTo: true,
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: false,
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: true,
              name: { id: "t3name", name: "Tag 3", primary: true },
              tag: {
                id: "t3",
                ...makeFragmentData(
                  { name: "Tag 3", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};

export const Checked: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "",
          title: "",
        },
        checked: true,
        suggestTags: {
          __typename: "SemitagSuggestTagsReturn",
          items: [
            {
              canResolveTo: true,
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              canResolveTo: false,
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};
