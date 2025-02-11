export const SplitType = {
  EQUAL: "EQUAL",
  AMOUNT: "AMOUNT",
} as const;

export type SplitType = (typeof SplitType)[keyof typeof SplitType];
