import { useMemo, useReducer } from "react";

const useRegisterFormEditSemitaggings = () => {
  const [semitaggings, dispatchSemitags] = useReducer(
    (
      prev: { name: string }[],
      action:
        | { type: "append"; name: string }
        | { type: "remove"; name: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          return [...new Set([...prev, { name: action.name }])];
        case "remove":
          return prev.filter(({ name }) => name !== action.name);
        case "clear":
          return [];
      }
    },
    []
  );
  const payload = useMemo(
    () => semitaggings.map(({ name }) => name),
    [semitaggings]
  );

  return {
    semitaggings,
    semitaggingsPayload: payload,
    isIncludeSemitag: (name: string) =>
      semitaggings.map(({ name }) => name).includes(name),
    appendSemitag: (name: string) => dispatchSemitags({ type: "append", name }),
    removeSemitag: (name: string) => dispatchSemitags({ type: "remove", name }),
    clearSemitags: () => dispatchSemitags({ type: "clear" }),
  };
};

export default useRegisterFormEditSemitaggings;
