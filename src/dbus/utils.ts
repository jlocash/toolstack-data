export const toUnderscore = (s: string): string => s.replace(/-/g, '_');
export const fromUnderscore = (s: string): string => s.replace(/_/g, '-');

export const translate = <T>(obj: Record<string, unknown>, t: (key: string) => string): T => {
  const newObj = <T>{};
  Object.keys(obj).forEach((key) => {
    const k = t(key) as keyof T;
    const v = obj[key] as typeof newObj[typeof k];
    newObj[k] = v;
  });
  return newObj;
};

export const unwrap = <T>(arr: T[][]): T[] => {
  const newArr: T[] = [];
  arr.forEach((item) => {
    newArr.push(...item);
  });
  return newArr;
};

export const merge = <T>(...objs: Record<string, unknown>[]): T => {
  const newObj: Record<string, unknown> = {};
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      newObj[key] = obj[key];
    });
  });

  return newObj as T;
};
