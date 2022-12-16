export const delay = (ms = 10000) =>
  new Promise((resolve) => setTimeout(() => resolve({}), ms));
