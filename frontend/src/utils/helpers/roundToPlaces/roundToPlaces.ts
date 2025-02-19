/**
 * Rounds a numeric or string value to a specified number of decimal places.
 *
 * @param {number | string | undefined} value - The numeric or string value to be rounded.
 * @param {number} decimalPlaces - The number of decimal places to round to. If less than 0, it is set to 0.
 * @returns {number} - The rounded number.
 */
export const roundToPlaces = (
  value: number | string | undefined,
  decimalPlaces: number | undefined
) => {
  const validDecimalPlaces = Math.max(0, decimalPlaces || 0);
  const num = parseValue(value);

  const roundedNumber = Number(num.toFixed(validDecimalPlaces));

  return roundedNumber;
};

/**
 * Parses a numeric or string value, returning a numeric representation.
 *
 * @param {number | string | undefined} value - The numeric or string value to be parsed.
 * @returns {number} - The parsed numeric value. If the input is not a valid numeric string, returns 0.
 */
const parseValue = (value: number | string | undefined): number => {
  if (typeof value === "string") {
    return parseFloat(value);
  }

  if (value) {
    return value;
  }

  return 0;
};
