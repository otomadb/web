import { getFragment, graphql } from "~/gql";
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
      sidelist={getFragment(
        MylistPageCommon_SideMylistListFragmentDoc,
        fragment.holder.mylists
      )}
      details={getFragment(UserMylistPage_DetailsFragmentDoc, fragment)}
      registrations={getFragment(
        UserMylistPage_RegistrationsFragmentDoc,
        fragment
      )}
    />
  );
};
