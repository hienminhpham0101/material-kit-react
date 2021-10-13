export function fCurrency(number) {
  return number.format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return (number / 100).format('0.0%');
}

export function fNumber(number) {
  return number;
}

export function fShortenNumber(number) {
  return number;
}

export function fData(number) {
  return number.format('0.0 b');
}
