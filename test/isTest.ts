/**
 * Storybookの`play`内でテストをスキップするために使う．
 *
 * @deprecated 当然使うべきではない．
 */
export const isTest = import.meta.env?.MODE === "test";
