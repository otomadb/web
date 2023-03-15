import { graphql, useFragment } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistPage_DetailsFragmentDoc,
  UserMylistPage_RegistrationsFragmentDoc,
  UserMylistPageFragment,
} from "~/gql/graphql";

import { UserMylistTemplate } from "./Template";

graphql(`
  fragment UserMylistPage on Mylist {
    ...UserMylistPage_Registrations
    ...UserMylistPage_Details
    holder {
      mylists(range: [PUBLIC]) {
        ...MylistPageCommon_SideMylistList
      }
    }
  }
`);
export const UserMylist: React.FC<{
  fragment: UserMylistPageFragment;
}> = ({ fragment }) => {
  return (
    <UserMylistTemplate
      sidelist={useFragment(
        MylistPageCommon_SideMylistListFragmentDoc,
        fragment.holder.mylists
      )}
      details={useFragment(UserMylistPage_DetailsFragmentDoc, fragment)}
      registrations={useFragment(
        UserMylistPage_RegistrationsFragmentDoc,
        fragment
      )}
    />
  );
};
