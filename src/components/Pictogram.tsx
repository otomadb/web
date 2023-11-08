import {
  faGithub,
  faSoundcloud,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  UserPlusIcon,
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
    | "external-link"
    | "nicovideo"
    | "soundcloud"
    | "youtube"
    | "bilibili"
    | "twitter"
    | "github"
    | "signup";
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
    case "signup":
      return <UserPlusIcon {...props} />;
    case "nicovideo":
      return (
        <svg viewBox="0 0 22 22" {...props}>
          <path
            d="M19.213 4.724h-5.816l2.388-2.275a.852.852 0 00.041-1.182.802.802 0 00-1.153-.043L11 4.724l-3.673-3.5a.802.802 0 00-1.153.043.85.85 0 00.042 1.182l2.387 2.275H2.788A1.8 1.8 0 001 6.535v10.863c0 1 .802 1.812 1.788 1.812h2.266l1.35 1.59a.518.518 0 00.816 0l1.35-1.59h4.86l1.35 1.59a.518.518 0 00.816 0l1.35-1.59h2.266c.99 0 1.788-.811 1.788-1.812V6.535c0-1-.799-1.81-1.787-1.81"
            fill="currentColor"
          ></path>
        </svg>
      );
    case "bilibili":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" {...props}>
          <path
            d="M3.73252 2.67094C3.33229 2.28484 3.33229 1.64373 3.73252 1.25764C4.11291 0.890684 4.71552 0.890684 5.09591 1.25764L7.21723 3.30403C7.27749 3.36218 7.32869 3.4261 7.37081 3.49407H10.5789C10.6211 3.4261 10.6723 3.36218 10.7325 3.30403L12.8538 1.25764C13.2342 0.890684 13.8368 0.890684 14.2172 1.25764C14.6175 1.64373 14.6175 2.28484 14.2172 2.67094L13.364 3.49407H14C16.2091 3.49407 18 5.28493 18 7.49407V12.9996C18 15.2087 16.2091 16.9996 14 16.9996H4C1.79086 16.9996 0 15.2087 0 12.9996V7.49406C0 5.28492 1.79086 3.49407 4 3.49407H4.58579L3.73252 2.67094ZM4 5.42343C2.89543 5.42343 2 6.31886 2 7.42343V13.0702C2 14.1748 2.89543 15.0702 4 15.0702H14C15.1046 15.0702 16 14.1748 16 13.0702V7.42343C16 6.31886 15.1046 5.42343 14 5.42343H4ZM5 9.31747C5 8.76519 5.44772 8.31747 6 8.31747C6.55228 8.31747 7 8.76519 7 9.31747V10.2115C7 10.7638 6.55228 11.2115 6 11.2115C5.44772 11.2115 5 10.7638 5 10.2115V9.31747ZM12 8.31747C11.4477 8.31747 11 8.76519 11 9.31747V10.2115C11 10.7638 11.4477 11.2115 12 11.2115C12.5523 11.2115 13 10.7638 13 10.2115V9.31747C13 8.76519 12.5523 8.31747 12 8.31747Z"
            fill="currentColor"
          ></path>
        </svg>
      );
    case "youtube":
      return <FontAwesomeIcon icon={faYoutube} {...props} />;
    case "soundcloud":
      return <FontAwesomeIcon icon={faSoundcloud} {...props} />;
    case "github":
      return <FontAwesomeIcon icon={faGithub} {...props} />;
    case "twitter":
      return <FontAwesomeIcon icon={faTwitter} {...props} />;
  }
}
