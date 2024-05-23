export const smoothStep = (x: number, k: number = 1) => {
  if (x <= 0) {
    return 0;
  } else if (x >= k) {
    return 1;
  } else {
    return x / k;
  }
};
