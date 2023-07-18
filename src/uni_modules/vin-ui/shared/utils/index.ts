export * from './normalizeProp';

// 变量类型判断
export const TypeOfFun = (value: any) => {
  if (value === null) {
    return 'null';
  }

  const type = typeof value;
  if (type === 'undefined' || type === 'string') {
    return type;
  }

  const typeString = toString.call(value);
  switch (typeString) {
    case '[object Array]':
      return 'array';
    case '[object Date]':
      return 'date';
    case '[object Boolean]':
      return 'boolean';
    case '[object Number]':
      return 'number';
    case '[object Function]':
      return 'function';
    case '[object RegExp]':
      return 'regexp';
    case '[object Object]':
      if (undefined !== value.nodeType) {
        if (value.nodeType === 3) {
          return /\S/.test(value.nodeValue) ? 'textnode' : 'whitespace';
        }
        return 'element';
      }
      return 'object';

    default:
      return 'unknow';
  }
};
//
export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string => objectToString.call(value);

export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1);
};
export const { isArray } = Array;
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';

export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const getPropByPath = (obj: any, keyPath: string) => {
  try {
    return keyPath.split('.').reduce((prev, curr) => prev[curr], obj);
  } catch (error) {
    return '';
  }
};

export const floatData = (format: any, dataOp: any, mapOps: any) => {
  const mergeFormat = { ...format };
  const mergeMapOps = { ...mapOps };

  if (Object.keys(dataOp).length > 0) {
    Object.keys(mergeFormat).forEach((keys) => {
      if (Object.prototype.hasOwnProperty.call(mergeMapOps, keys)) {
        const tof = TypeOfFun(mergeMapOps[keys]);
        if (tof === 'function') {
          mergeFormat[keys] = mergeMapOps[keys](dataOp);
        }

        if (tof === 'string') {
          mergeFormat[keys] = dataOp[mergeMapOps[keys]];
        }
      } else if (dataOp[keys]) mergeFormat[keys] = dataOp[keys];
    });
    return mergeFormat;
  }

  return format;
};

export const deepMerge = (target: any, newObj: any) => {
  Object.keys(newObj).forEach((key) => {
    const targetValue = target[key];
    const newObjValue = newObj[key];
    if (isObject(targetValue) && isObject(newObjValue)) {
      deepMerge(targetValue, newObjValue);
    } else {
      target[key] = newObjValue;
    }
  });
  return target;
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const omit = (obj: Record<string, unknown>, keys: string[]) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return obj;
  }

  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {} as Record<string, unknown>);
};

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    // eslint-disable-next-line no-return-assign
    return hit || (cache[str] = fn(str));
  }) as T;
};

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase(),
);

export const kebabCase = (str: string): string => {
  return str
    .replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
    .replace(/([a-z])([A-Z])/g, (_, p1, p2) => `${p1}-${p2.toLowerCase()}`);
};

export const colorHexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b),
  );

  /* eslint-disable */
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  /* eslint-enable */
};
