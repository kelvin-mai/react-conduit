export const arrayToMap = (arr: any[], prop: string) =>
  arr.reduce((acc, curr) => ({ ...acc, [curr[prop]]: curr }), {});

export const appendToMap = (original: any, toAppend: any) => ({
  ...original,
  ...toAppend,
});
