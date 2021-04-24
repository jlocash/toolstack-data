type Translator = (s: string) => string;

export const toUnderscore: Translator = (s: string): string => s.replace(/-/g, '_');
export const fromUnderscore: Translator = (s: string): string => s.replace(/_/g, '-');

export const translate = <T>(obj: Record<string, unknown>, t: Translator = toUnderscore): T => {
  const newObj = <T>{};
  Object.keys(obj).forEach((key) => {
    const k = t(key) as keyof T;
    const v = obj[key] as typeof newObj[typeof k];
    newObj[k] = v;
  });
  return newObj;
};
