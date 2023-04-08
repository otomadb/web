import { graphql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Query } from "./SearchBox";
import { Fragment as SuggestItemFragment } from "./SuggestItem";
import { Fragment as SuggestsFragment } from "./Suggests";

export const mockSearchBox = graphql.query(Query, (req, res, ctx) => {
  return res(
    ctx.data({
      searchTags: {
        ...makeFragmentData(
          {
            items: [
              {
                ...makeFragmentData(
                  {
                    name: {
                      id: "n1",
                      primary: false,
                      name: "ぼっち・ざ・まっど！",
                    },
                    tag: {
                      id: "t1",
                      ...makeFragmentData(
                        {
                          name: "ぼっち・ざ・ろっく！",
                          type: TagType.Copyright,
                          explicitParent: null,
                        },
                        CommonTagFragment
                      ),
                    },
                  },
                  SuggestItemFragment
                ),
              },
              {
                ...makeFragmentData(
                  {
                    name: {
                      id: "n2",
                      primary: true,
                      name: "後藤ひとり",
                    },
                    tag: {
                      id: "t2",
                      ...makeFragmentData(
                        {
                          name: "後藤ひとり",
                          type: TagType.Character,
                          explicitParent: {
                            id: "t1",
                            name: "ぼっち・ざ・ろっく！",
                          },
                        },
                        CommonTagFragment
                      ),
                    },
                  },
                  SuggestItemFragment
                ),
              },
              {
                ...makeFragmentData(
                  {
                    name: {
                      id: "n3",
                      primary: true,
                      name: "伊地知虹夏",
                    },
                    tag: {
                      id: "t3",
                      ...makeFragmentData(
                        {
                          name: "伊地知虹夏",
                          type: TagType.Character,
                          explicitParent: {
                            id: "t1",
                            name: "ぼっち・ざ・ろっく！",
                          },
                        },
                        CommonTagFragment
                      ),
                    },
                  },
                  SuggestItemFragment
                ),
              },
            ],
          },
          SuggestsFragment
        ),
      },
    })
  );
});
