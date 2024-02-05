/**
 * Checks if a given value is within the specified error margin when compared to another number.
 *
 * @param {number} value - The value to be compared.
 * @param {number} numberToCompare - The number against which the value is compared.
 * @param {number} errorMargin - The acceptable error margin for the comparison.
 * @returns {boolean} - Returns true if the value is within the error margin, otherwise returns false.
 */
export const checkIsWithinErrorMargin = (
  value: number,
  numberToCompare: number,
  errorMargin: number
) => {
  if (value === numberToCompare) return true;
  if (Math.abs(value - numberToCompare) <= errorMargin) return true;
  return false;
};
