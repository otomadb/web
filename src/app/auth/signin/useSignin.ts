import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";
import { SigninFailedMessage } from "~/gql/graphql";

export const Mutation = graphql(`
  mutation SigninPage_Signin($username: String!, $password: String!) {
    signin(input: { username: $username, password: $password }) {
      __typename
      ... on SigninSucceededPayload {
        ...SigninPage_Signin_SucceededToast
        user {
          id
          ...AuthPagesGuard
          ...GlobalNav_Profile
        }
      }
      ... on SigninFailedPayload {
        message
      }
    }
  }
`);
export const useSignin = ({
  onSuccess,
  onUserNotFound,
  onWrongPassword,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["signin"],
      { __typename: "SigninSucceededPayload" }
    >
  ): void;
  onUserNotFound(): void;
  onWrongPassword(): void;
}) => {
  const [, signin] = useMutation(Mutation);

  return useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const { data, error } = await signin({ username, password });
      if (error || !data) {
        // TODO: エラー処理
        return;
      }
      switch (data.signin.__typename) {
        case "SigninFailedPayload":
          {
            const { message } = data.signin;
            switch (message) {
              case SigninFailedMessage.UserNotFound:
                onUserNotFound();
                return;
              case SigninFailedMessage.WrongPassword:
                onWrongPassword();
                return;
            }
          }
          return;
        case "SigninSucceededPayload":
          onSuccess(data.signin);
          return;
      }
    },
    [onSuccess, onUserNotFound, onWrongPassword, signin]
  );
};
