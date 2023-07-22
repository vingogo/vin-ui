function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(value: string, allowDot = true, allowMinus = true) {
  let result = value;
  if (allowDot) {
    result = trimExtraChar(value, '.', /\./g);
  } else {
    result = value.split('.')[0];
  }

  if (allowMinus) {
    result = trimExtraChar(result, '-', /-/g);
  } else {
    result = result.replace(/-/, '');
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return result.replace(regExp, '');
}
