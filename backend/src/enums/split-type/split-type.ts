export const SplitType = {
  EQUAL: "EQUAL",
  AMOUNT: "AMOUNT",
  UNKNOWN: "UNKNOWN",
} as const;

export type SplitType = (typeof SplitType)[keyof typeof SplitType];
