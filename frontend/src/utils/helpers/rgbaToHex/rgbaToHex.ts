//I know, it looks strange, but it works.

export const rgbaToHex = (r: number, g: number, b: number, a: number) => {
  const hexR = a.toString(16).padStart(2, "0");
  const hexG = b.toString(16).padStart(2, "0");
  const hexB = g.toString(16).padStart(2, "0");
  const hexA = r.toString(16).padStart(2, "0");

  const hexValue = "0x" + hexR + hexG + hexB + hexA;
  return parseInt(hexValue, 16);
};
