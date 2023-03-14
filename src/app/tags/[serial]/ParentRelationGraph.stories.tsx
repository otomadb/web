import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { aTag, aTagParent, aTagParentConnection } from "~/gql/graphql";

import { Fragment, ParentRelationGraph } from "./ParentRelationGraph";

const meta = {
  component: ParentRelationGraph,
  args: {},
} as Meta<typeof ParentRelationGraph>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    className: css`
      width: 40rem;
      height: 20rem;
    `,
    fragment: makeFragmentData(
      aTag({
        id: "t1",
        name: "Tag 1",
        explicitParent: aTag({ id: "t1.1", name: "Tag 1.1", serial: 11 }),
        parents: aTagParentConnection({
          nodes: [
            aTagParent({
              id: "tp1.1",
              parent: aTag({
                id: "t1.1",
                name: "Tag 1.1",
                serial: 11,
                explicitParent: null,
              }),
            }),
            aTagParent({
              id: "tp1.2",
              parent: aTag({
                id: "t1.2",
                name: "Tag 1.2",
                serial: 12,
                explicitParent: null,
              }),
            }),
          ],
        }),
        children: aTagParentConnection({
          nodes: [
            aTagParent({
              id: "tp2.1",
              child: aTag({
                id: "t2.1",
                name: "Tag 2.1",
                serial: 21,
                explicitParent: null,
              }),
            }),
          ],
        }),
      }),
      Fragment
    ),
  },
};
