export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor();
  constructor(vector: Vector3);
  constructor(x: number, y: number, z: number);
  constructor(arg1?: number | Vector3, y?: number, z?: number) {
    if (arg1 && arg1 instanceof Vector3) {
      this._x = arg1.x;
      this._y = arg1.y;
      this._z = arg1.z;
    } else if (arg1 !== undefined && y !== undefined && z !== undefined) {
      this._x = arg1;
      this._y = y;
      this._z = z;
    } else {
      this._x = 0;
      this._y = 0;
      this._z = 0;
    }
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get z() {
    return this._z;
  }

  public set x(x: number) {
    this._x = x;
  }
  public set y(y: number) {
    this._y = y;
  }
  public set z(z: number) {
    this._z = z;
  }

  public static get zero() {
    return new Vector3(0, 0, 0);
  }

  public add(x: number, y: number, z: number): void;
  public add(vector: Vector3): void;
  public add(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._x += arg1.x;
      this._y += arg1.y;
      this._z += arg1.z;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._x += arg1;
      this._y += y;
      this._z += z;
    } else {
      throw new Error("Invalid arguments provided to add function");
    }
  }
}
