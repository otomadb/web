import {
  faGithub,
  faSoundcloud,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  HeartIcon as OutlineHeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  HeartIcon as FilledHeartIcon,
  NoSymbolIcon,
  PencilIcon,
  PlusIcon,
  TagIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

import BilibiliSVG from "./bilibili.svg";
import NicovideoSVG from "./nicovideo.svg";

export type PictogramType = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => JSX.Element;

export const XMarkPictogram: PictogramType = (props) => (
  <XMarkIcon {...props} />
);

export const PlusPictogram: PictogramType = (props) => <PlusIcon {...props} />;

export const SearchPictogram: PictogramType = (props) => (
  <MagnifyingGlassIcon {...props} />
);

export const CopyPictogram: PictogramType = (props) => (
  <ClipboardDocumentIcon {...props} />
);

export const LoadingPictogram: PictogramType = ({ className, ...props }) => (
  <ArrowPathIcon {...props} className={clsx(className, "animate-spin")} />
);

export const FilledHeartPictogram: PictogramType = (props) => (
  <FilledHeartIcon {...props} />
);

export const OutlineHeartPictogram: PictogramType = (props) => (
  <OutlineHeartIcon {...props} />
);

export const TagPictogram: PictogramType = (props) => <TagIcon {...props} />;

export const CheckPictogram: PictogramType = (props) => (
  <CheckIcon {...props} />
);

export const NotePictogram: PictogramType = (props) => (
  <PencilIcon {...props} />
);

export const AcceptPictogram: PictogramType = (props) => (
  <CheckCircleIcon {...props} />
);

export const RejectPictogram: PictogramType = (props) => (
  <NoSymbolIcon {...props} />
);

export const SignInPictogram: PictogramType = (props) => (
  <ArrowLeftOnRectangleIcon {...props} />
);

export const SignUpPictogram: PictogramType = (props) => (
  <UserPlusIcon {...props} />
);

export const ExternalLinkPictogram = (props: { className?: string }) => (
  <ArrowTopRightOnSquareIcon {...props} />
);

export const TwitterPictogram: PictogramType = (props) => (
  <FontAwesomeIcon icon={faTwitter} {...props} />
);

export const GithubPictogram: PictogramType = (props) => (
  <FontAwesomeIcon icon={faGithub} {...props} />
);

export const NicovideoPictogram: PictogramType = (props) => (
  <NicovideoSVG {...props} />
);

export const BilibiliPictogram: PictogramType = (props) => (
  <BilibiliSVG {...props} />
);

export const YoutubePictogram: PictogramType = (props) => (
  <FontAwesomeIcon icon={faYoutube} {...props} />
);

export const SoundcloudPictogram: PictogramType = (props) => (
  <FontAwesomeIcon icon={faSoundcloud} {...props} />
);
