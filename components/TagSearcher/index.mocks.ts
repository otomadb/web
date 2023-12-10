import { graphql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";

import { Query } from ".";
import { SuggestItemFragment } from "./SuggestItem";
import { SuggestsFragment } from "./Suggests";

export const mockTagSearcher = graphql.query(Query, (req, res, ctx) =>
  res(
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
                      id: "tag:1",
                      ...makeFragmentData(
                        {
                          name: "ぼっち・ざ・ろっく！",
                          belongTo: {
                            keyword: "copyright",
                          },
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
                      id: "tag:2",
                      ...makeFragmentData(
                        {
                          name: "後藤ひとり",
                          belongTo: { keyword: "character" },
                          explicitParent: {
                            id: "tag:1",
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
                      id: "tag:3",
                      ...makeFragmentData(
                        {
                          name: "伊地知虹夏",
                          belongTo: { keyword: "character" },
                          explicitParent: {
                            id: "tag:1",
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
  )
);

export const mockTagSearcherNothing = graphql.query(Query, (req, res, ctx) =>
  res(
    ctx.data({
      searchTags: {
        ...makeFragmentData(
          {
            items: [],
          },
          SuggestsFragment
        ),
      },
    })
  )
);

export const mockTagSearcherLoading = graphql.query(Query, (req, res, ctx) =>
  res(ctx.delay("infinite"))
);
