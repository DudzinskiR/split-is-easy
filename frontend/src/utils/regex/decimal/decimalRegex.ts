export const decimalRegex = (precision: number = 0) => {
  const pattern = new RegExp(
    `^[0-9]*(${precision > 0 ? "[.,]" : ""}[0-9]{0,${precision}})?$`
  );

  return pattern;
};
