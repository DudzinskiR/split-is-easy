export class Vector2 {
  private _x: number;
  private _y: number;

  constructor();
  constructor(vector: Vector2);
  constructor(x: number, y: number);
  constructor(arg1?: number | Vector2, y?: number) {
    if (arg1 && arg1 instanceof Vector2) {
      this._x = arg1.x;
      this._y = arg1.y;
    } else if (arg1 !== undefined && y !== undefined) {
      this._x = arg1;
      this._y = y;
    } else {
      this._x = 0;
      this._y = 0;
    }
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public static get zero() {
    return new Vector2(0, 0);
  }

  public set(vector: Vector2): void;
  public set(x: number, y: number): void;
  public set(arg1: number | Vector2, y?: number) {
    if (arg1 instanceof Vector2) {
      this._x = arg1.x;
      this._y = arg1._y;
    } else if (typeof arg1 === "number" && typeof y === "number") {
      this._x = arg1;
      this._y = y;
    } else {
      throw new Error("Invalid arguments provided to set function");
    }
  }

  public add(vector: Vector2): Vector2;
  public add(x: number, y: number): Vector2;
  public add(arg1: number | Vector2, y?: number) {
    if (arg1 instanceof Vector2) {
      this._x += arg1.x;
      this._y += arg1.y;
      return this;
    } else if (typeof arg1 === "number" && typeof y === "number") {
      this._x += arg1;
      this._y += y;

      return this;
    } else {
      throw new Error("Invalid arguments provided to add function");
    }
  }
}
