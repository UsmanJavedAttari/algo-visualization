import { AnyObject } from './types';

export const slugify = (str: string | null): string =>
  str
    ? str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '')
    : '';

export const randomStr = (): string =>
  Math.random()
    .toString(36)
    .substring(7);

export const delay = (ms: number) =>
  new Promise(res =>
    setTimeout(() => {
      res();
    }, ms)
  );

export const resolveObjPath = (path: string, obj: AnyObject): string | object =>
  path.split('.').reduce((o, key) => (o?.[key] ? o[key] : null), obj);
