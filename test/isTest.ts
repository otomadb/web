/**
 * @deprecated ほとんどの場合テストをスキップするため使うべきではない．
 */

export const isTest = import.meta.env?.MODE === "test";
