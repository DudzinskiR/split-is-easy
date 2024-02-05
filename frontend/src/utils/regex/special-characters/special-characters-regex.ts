export const specialCharacterRegex = () => {
  const pattern = RegExp(/[!@#$%^&*(),.?":{}|<>]/);

  return pattern;
};
