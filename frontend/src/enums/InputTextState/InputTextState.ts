export const InputTextState = {
  normal: "NORMAL",
  error: "ERROR",
  ok: "OK",
} as const;

export type InputTextState =
  (typeof InputTextState)[keyof typeof InputTextState];
