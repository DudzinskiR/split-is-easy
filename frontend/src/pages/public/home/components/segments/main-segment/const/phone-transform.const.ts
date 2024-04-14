import { Transform3D } from "src/utils/math";

export const startPhoneATransform = new Transform3D()
  .setPosition(-2000, 0, 0)
  .setRotate(10, 400, 50);

export const startPhoneBTransform = new Transform3D()
  .setPosition(1500, 20, 40)
  .setRotate(10, -800, 50);

export const finishPhoneATransform = new Transform3D()
  .setPosition(0, 0, 0)
  .setRotate(10, 20, 0);

export const finishPhoneBTransform = new Transform3D()
  .setPosition(240, 20, 40)
  .setRotate(10, -20, 0);
