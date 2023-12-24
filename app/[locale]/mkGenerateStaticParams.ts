import { getStaticParams } from "~/locales/server";

const mkGenerateStaticParams = <TPP extends Record<string, unknown>>(
  pps: TPP[]
): ({ locale: string } & TPP)[] => {
  const lps = getStaticParams() as { locale: string }[];
  return pps.map((pp) => lps.map((lp) => ({ ...lp, ...pp }))).flat();
};
export default mkGenerateStaticParams;
