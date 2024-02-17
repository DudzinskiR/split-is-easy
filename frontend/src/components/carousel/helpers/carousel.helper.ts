export const selectIndex = (
  currentIndex: number,
  change: number,
  numberOfIndexes: number
) => {
  return (currentIndex + change + numberOfIndexes) % numberOfIndexes;
};

export const calcTimeToNextChange = (
  timeLastChange: number,
  animationDuration: number,
  timeout: number
) => {
  const currentTime = new Date().getTime();

  return (
    Math.max(timeLastChange + animationDuration - currentTime, 0) + timeout
  );
};
