type I18nPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? I18nPartial<U>[]
    : T[P] extends object
      ? I18nPartial<T[P]>
      : string;
};

export default I18nPartial;
