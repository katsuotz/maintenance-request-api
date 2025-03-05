export const numberFormat = (value: number, precision: number = 2): number => {
  return +parseFloat(String(value)).toFixed(precision);
};
