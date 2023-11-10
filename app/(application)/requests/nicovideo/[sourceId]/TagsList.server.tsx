import CommonTagLink from "~/components/CommonTagLink";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment NicovideoRequestPage_TagsList on NicovideoRegistrationRequest {
    taggings {
      id
      tag {
        ...CommonTagLink
      }
      note
    }
  }
`);
export function TagsList({
  fragment,
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const { taggings } = useFragment(Fragment, fragment);

  return (
    <div>
      {taggings.map((tagging) => (
        <div key={tagging.id}>
          <div>
            <CommonTagLink size="small" fragment={tagging.tag} />
          </div>
          <div>{tagging.note && <span>{tagging.note}</span>}</div>
        </div>
      ))}
    </div>
  );
}
