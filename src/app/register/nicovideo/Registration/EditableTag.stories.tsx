import { ComponentMeta, ComponentStory } from "@storybook/react";
import { graphql } from "msw";

import { RegisterNiconicoPage_TagInfoDocument, TagType } from "~/gql/graphql";

import { EditableTag } from "./EditableTag";

export default {
  title: "RegisterNiconico/RegisterForm/EditableTag",
  component: EditableTag,
  parameters: {},
} as ComponentMeta<typeof EditableTag>;

const Template: ComponentStory<typeof EditableTag> = (args) => (
  <EditableTag {...args} />
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
