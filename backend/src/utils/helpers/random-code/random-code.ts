const randomize = (size: number = 8, alphabet: string) => {
  const newAlphabet =
    alphabet ||
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * newAlphabet.length);
    result += newAlphabet.charAt(randomIndex);
  }

  return result;
};

export const customAlphabet = (alphabet: string, defaultSize?: number) => {
  return (size?: number) => randomize(size || defaultSize || 21, alphabet);
};

export const randomCode = (defaultSize?: number) => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  return (size?: number) => randomize(size || defaultSize || 21, alphabet);
};
