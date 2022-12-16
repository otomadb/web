import { useViewer } from "./useViewer";

export const useIsLogin = (): undefined | boolean => {
  const [result] = useViewer();
  const { data } = result;
  if (!data || data.whoami === undefined) return undefined;
  if (data.whoami === null) return false;
  return true;
};
