import { css } from "@emotion/css";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  RegisterTagPage_Semitags_FindSemitagsDocument,
  RegisterTagPage_Semitags_SelectedDocument,
  Semitag,
} from "~/gql/graphql";
import { aSemitag } from "~/gql/mock";

import { Semitags } from "./Semitags";

const meta = {
  component: Semitags,
  args: {
    className: css`
      width: 640px;
    `,
    append: action("append"),
    remove: action("remove"),
    setTemporaryPrimaryTitle: action("setTemporaryPrimaryTitle"),
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({ url: "/graphql", exchanges: [] })}
      >
        <Semitags {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(
          RegisterTagPage_Semitags_FindSemitagsDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                findSemitags: {
                  nodes: (() => {
                    const rtn: Semitag[] = [];
                    // if (!req.variables.except.includes("st1"))
                    rtn.push(aSemitag({ id: "st1", name: "Semitag 1" }));
                    // if (!req.variables.except.includes("st2"))
                    rtn.push(aSemitag({ id: "st2", name: "Semitag 2" }));
                    // if (!req.variables.except.includes("st3"))
                    rtn.push(aSemitag({ id: "st3", name: "Semitag 3" }));
                    // if (!req.variables.except.includes("st4"))
                    rtn.push(aSemitag({ id: "st4", name: "Semitag 4" }));
                    // if (!req.variables.except.includes("st5"))
                    rtn.push(aSemitag({ id: "st5", name: "Semitag 5" }));
                    return rtn;
                  })(),
                },
              })
            )
        ),
        graphql.query(
          RegisterTagPage_Semitags_SelectedDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "st1":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st1", name: "Semitag 1" }),
                  })
                );
              case "st2":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st2", name: "Semitag 2" }),
                  })
                );
              case "st3":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st3", name: "Semitag 3" }),
                  })
                );
              case "st4":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st4", name: "Semitag 4" }),
                  })
                );
              case "st5":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st5", name: "Semitag" }),
                  })
                );
              default:
                return res(ctx.errors([{ message: "not found" }]));
            }
          }
        ),
      ],
    },
  },
} as Meta<typeof Semitags>;
export default meta;

export const NotSelected: StoryObj<typeof meta> = {
  args: {
    fields: [],
  },
};

export const Selected: StoryObj<typeof meta> = {
  args: {
    fields: [
      { id: "id:st1", semitagId: "st1" },
      { id: "id:st2", semitagId: "st2" },
    ],
  },
};
