import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  NoSymbolIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Pictogram({
  icon,
  ...props
}: {
  icon:
    | "x"
    | "plus"
    | "search"
    | "copy"
    | "loading"
    | "note"
    | "accept"
    | "reject"
    | "like"
    | "check"
    | "external-link";
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
    case "loading":
      return (
        <ArrowPathIcon
          className={clsx(props.className, ["animate-spin"])}
          {...props}
        />
      );
    case "note":
      return <PencilIcon {...props} />;
    case "accept":
      return <CheckCircleIcon {...props} />;
    case "reject":
      return <NoSymbolIcon {...props} />;
    case "like":
      return <HeartIcon {...props} />;
    case "check":
      return <CheckIcon {...props} />;
    case "external-link":
      return <ArrowTopRightOnSquareIcon {...props} />;
  }
}
