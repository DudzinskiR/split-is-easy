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

  public static get zero() {
    return new Vector3(0, 0, 0);
  }

  public static get up() {
    return new Vector3(0, 1, 0);
  }

  public static get down() {
    return new Vector3(0, -1, 0);
  }

  public static get right() {
    return new Vector3(1, 0, 0);
  }

  public static get left() {
    return new Vector3(-1, 0, 0);
  }

  public static get forward() {
    return new Vector3(0, 0, 1);
  }

  public static get backward() {
    return new Vector3(0, 0, -1);
  }

  public static distance(
    vectorA: Vector3 | { x: number; y: number; z: number },
    vectorB: Vector3 | { x: number; y: number; z: number }
  ) {
    if (vectorA instanceof Vector3) {
      if (vectorB instanceof Vector3) {
        return vectorA.distanceTo(vectorB);
      } else {
        return vectorA.distanceTo(vectorB.x, vectorB.y, vectorB.z);
      }
    } else {
      if (vectorB instanceof Vector3) {
        return new Vector3(vectorA.x, vectorA.y, vectorA.z).distanceTo(vectorB);
      } else {
        return new Vector3(vectorA.x, vectorA.y, vectorA.z).distanceTo(
          vectorB.x,
          vectorB.y,
          vectorB.z
        );
      }
    }
  }

  public set(vector: Vector3): void;
  public set(x: number, y: number, z: number): void;
  public set(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._x = arg1.x;
      this._y = arg1.y;
      this._z = arg1.z;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._x = arg1;
      this._y = y;
      this._z = z;
    } else {
      throw new Error("Invalid arguments provided to set function");
    }
  }

  public add(vector: Vector3): Vector3;
  public add(x: number, y: number, z: number): Vector3;
  public add(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._x += arg1.x;
      this._y += arg1.y;
      this._z += arg1.z;
      return this;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._x += arg1;
      this._y += y;
      this._z += z;
      return this;
    } else {
      throw new Error("Invalid arguments provided to add function");
    }
  }

  public sub(vector: Vector3): Vector3;
  public sub(x: number, y: number, z: number): Vector3;
  public sub(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._x -= arg1.x;
      this._y -= arg1.y;
      this._z -= arg1.z;
      return this;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._x -= arg1;
      this._y -= y;
      this._z -= z;
      return this;
    } else {
      throw new Error("Invalid arguments provided to sub function");
    }
  }

  public mul(vector: Vector3): Vector3;
  public mul(x: number, y: number, z: number): Vector3;
  public mul(value: number): Vector3;
  public mul(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._x *= arg1.x;
      this._y *= arg1.y;
      this._z *= arg1.z;
      return this;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._x *= arg1;
      this._y *= y;
      this._z *= z;
      return this;
    } else if (typeof arg1 === "number" && y === undefined && z === undefined) {
      this._x *= arg1;
      this._y *= arg1;
      this._z *= arg1;
      return this;
    } else {
      throw new Error("Invalid arguments provided to mul function");
    }
  }

  public distanceTo(vector: Vector3): number;
  public distanceTo(x: number, y: number, z: number): number;
  public distanceTo(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      return Math.sqrt(
        (arg1.x - this.x) ** 2 + (arg1.y - this.y) ** 2 + (arg1.z - this.z) ** 2
      );
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      return Math.sqrt(
        (arg1 - this.x) ** 2 + (y - this.y) ** 2 + (z - this.z) ** 2
      );
    } else {
      throw new Error("Invalid arguments provided to distanceTo function");
    }
  }

  public toArray(): [number, number, number] {
    return [this._x, this._y, this._z];
  }
}
