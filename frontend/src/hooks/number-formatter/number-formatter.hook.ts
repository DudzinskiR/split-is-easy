interface Suffix {
  suffix: string;
  breakpoint: number;
}

const suffixBreakpoint: Suffix[] = [
  { suffix: "", breakpoint: 0 },
  { suffix: "K", breakpoint: 1e3 },
  { suffix: "M", breakpoint: 1e6 },
  { suffix: "B", breakpoint: 1e9 },
  { suffix: "T", breakpoint: 1e12 },
];

export const useNumberFormatter = () => {
  const shortenNumber = (value: number): string => {
    let suffix: Suffix = suffixBreakpoint[0];

    for (const item of suffixBreakpoint) {
      if (item.breakpoint <= Math.abs(value)) {
        suffix = item;
      } else {
        break;
      }
    }

    if (suffix.breakpoint === 0) {
      return `${value}`;
    } else {
      return `${(value / suffix.breakpoint).toFixed(2)}${suffix.suffix}`;
    }
  };

  return { shortenNumber };
};
