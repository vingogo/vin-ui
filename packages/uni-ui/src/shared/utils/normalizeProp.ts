import { isArray, isString, isObject, hyphenate } from '.';

export type NormalizedStyle = Record<string, string | number>;

const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {};
  cssText
    .replace(styleCommentRE, '')
    .split(listDelimiterRE)
    .forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
  return ret;
}

export function normalizeStyle(value: unknown): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle);
      if (normalized) {
        // eslint-disable-next-line guard-for-in
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  }
  if (isString(value)) {
    return value;
  }
  if (isObject(value)) {
    return value;
  }
}

export function stringifyStyle(styles: NormalizedStyle | string | undefined): string {
  let ret = '';
  if (!styles || isString(styles)) {
    return ret;
  }
  // eslint-disable-next-line guard-for-in
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith('--') ? key : hyphenate(key);
    if (isString(value) || typeof value === 'number') {
      // only render valid values
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}

export function normalizeClass(value: unknown): string {
  let res = '';
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += `${normalized} `;
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += `${name} `;
      }
    }
  }
  return res.trim();
}
