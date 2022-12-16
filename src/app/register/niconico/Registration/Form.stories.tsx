import { ComponentMeta, ComponentStory } from "@storybook/react";
import { graphql } from "msw";
import React from "react";

import { RegisterNiconicoPage_TagInfoDocument, TagType } from "~/gql/graphql";

import { FormContext } from "../FormContext";
import { RegisterForm } from "./Form";

export default {
  title: "RegisterNiconico/RegisterForm",
  component: RegisterForm,
  parameters: {},
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = (args) => (
  <FormContext.Provider
    value={
      { tags: ["1", "2", "3", "4"] } as unknown as React.ContextType<
        typeof FormContext
      >
    }
  >
    <RegisterForm {...args} />
  </FormContext.Provider>
);

export const Successful = Template.bind({});
Successful.parameters = {
  msw: {
    handlers: [
      graphql.query(RegisterNiconicoPage_TagInfoDocument, (req, res, ctx) => {
        return res(
          ctx.data({
            tag: {
              id: "1",
              name: "ぼっち・ざ・ろっく！",
              type: TagType.Copyright,
            },
          })
        );
      }),
    ],
  },
};
