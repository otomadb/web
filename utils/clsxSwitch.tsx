import { ClassValue } from "clsx";

const clsxSwitch =
  (ts: Record<string, ClassValue>, f: ClassValue) =>
  (t: string | undefined) => {
    return typeof t === "string" && Object.keys(ts).includes(t) ? ts[t] : f;
  };
export default clsxSwitch;
