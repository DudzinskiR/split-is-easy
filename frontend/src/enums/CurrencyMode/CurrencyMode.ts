export const CurrencyMode = {
  SymbolFirst: "CURRENCY_FIST",
  ValueFirst: "VALUE_FIRST",
  WithoutSymbol: "WITHOUT_SYMBOL",
} as const;

export type CurrencyMode = (typeof CurrencyMode)[keyof typeof CurrencyMode];
