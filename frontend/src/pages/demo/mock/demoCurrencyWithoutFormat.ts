export const demoCurrencyWithoutFormat = (value: number) => {
  const isNegative = value < 0;
  const valueToShow = calcValue(Math.abs(value));

  return `${isNegative ? "-" : ""}$${valueToShow}`;
};

const calcValue = (value: number) => {
  const divider = 10 ** 2;
  return (value / divider).toFixed(2);
};
