import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ClipboardDocumentIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Pictogram({
  icon,
  ...props
}: {
  icon: "x" | "plus" | "search" | "copy";
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  switch (icon) {
    case "x":
      return <XMarkIcon {...props} />;
    case "plus":
      return <PlusIcon {...props} />;
    case "search":
      return <MagnifyingGlassIcon {...props} />;
    case "copy":
      return <ClipboardDocumentIcon {...props} />;
  }
}
