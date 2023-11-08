export const ok = <TData>(data: TData) => ({ status: "ok", data }) as const;
export type Ok<TResult> = TResult extends ReturnType<typeof ok<infer TData>>
  ? ReturnType<typeof ok<TData>>
  : never;
export type OkData<TResult> = Ok<TResult>["data"];
export const isOk = <TError, TData>(
  res: Result<TError, TData>
): res is Ok<Result<TError, TData>> => res.status === "ok";
export type ReturnOk<TFn extends (...args: never) => unknown> = Ok<
  Awaited<ReturnType<TFn>>
>;

export const err = <TError>(error: TError) =>
  ({ status: "err", error }) as const;
export type Err<TResult> = TResult extends ReturnType<typeof err<infer TError>>
  ? ReturnType<typeof err<TError>>
  : never;
export type ErrError<TResult> = Err<TResult>["error"];
export const isErr = <TError, TData>(
  res: Result<TError, TData>
): res is Err<Result<TError, TData>> => res.status === "err";
export type ReturnErr<TFn extends (...args: never) => unknown> = Err<
  Awaited<ReturnType<TFn>>
>;

export type Result<TError, TData> =
  | ReturnType<typeof err<TError>>
  | ReturnType<typeof ok<TData>>;
