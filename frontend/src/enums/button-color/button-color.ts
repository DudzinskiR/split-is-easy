export const ButtonColor = {
  BLUE: "bg-gradient-to-r from-sky-500 to-indigo-500",
  RED: "bg-gradient-to-r from-red-500 to-rose-600",
  GREEN: "bg-gradient-to-r from-lime-600 to-green-600",
  PURPLE: "bg-gradient-to-r from-indigo-500 to-indigo-600",
} as const;

export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];
