import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment NicovideoRequestPage_SemitagsList on NicovideoRegistrationRequest {
    semitaggings {
      id
      name
      note
    }
  }
`);
export function SemitagsList({
  fragment,
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const { semitaggings } = getFragment(Fragment, fragment);

  return (
    <div>
      {semitaggings.map((semitagging) => (
        <div key={semitagging.id}>
          <div>
            <span>{semitagging.name}</span>
          </div>
          <div>{semitagging.note && <span>{semitagging.note}</span>}</div>
        </div>
      ))}
    </div>
  );
}
