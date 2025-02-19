/**
 * Searches for a value in an object representing an enumeration type.
 * @param enumType Object representing an enumeration type, where keys are enum value names, and values are corresponding strings.
 * @param searchValue Value to search for in the enumeration type.
 * @param unknownValue Default value to be returned if searchValue is not found in enumType.
 * @returns The found value or unknownValue if searchValue does not exist in enumType.
 *
 * @example
 * ```typescript
 * enum Color {
 *   Red = "RED",
 *   Blue = "BLUE",
 *   Green = "GREEN",
 * }
 *
 * const result = findValue(Color, "BLUE", Color.Red);
 * console.log(result); // Returns "BLUE"
 * ```
 */
export const findValue = <T extends string>(
  enumType: { [key in string]: T },
  searchValue: string,
  unknownValue: T
): T => {
  if (Object.values(enumType).includes(searchValue as T)) {
    return searchValue as T;
  } else {
    return unknownValue;
  }
};
