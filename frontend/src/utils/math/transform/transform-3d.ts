import { Vector3 } from "src/utils/math";

export class Transform3D {
  private _position: Vector3;
  private _rotation: Vector3;

  constructor(transform: Transform3D);
  constructor(position?: Vector3, rotation?: Vector3);
  constructor(arg1: Transform3D | Vector3 | undefined, rotation?: Vector3) {
    if (arg1) {
      if (arg1 instanceof Transform3D) {
        this._position = new Vector3(arg1._position);
        this._rotation = new Vector3(arg1._rotation);
      } else if (arg1 instanceof Vector3) {
        this._position = arg1;
        if (rotation) {
          this._rotation = rotation;
        } else {
          this._rotation = Vector3.zero;
        }
      } else {
        this._position = Vector3.zero;
        if (rotation) {
          this._rotation = rotation;
        } else {
          this._rotation = Vector3.zero;
        }
      }
    } else {
      this._position = Vector3.zero;
      if (rotation) {
        this._rotation = rotation;
      } else {
        this._rotation = Vector3.zero;
      }
    }
  }

  public static get zero() {
    return new Transform3D(Vector3.zero, Vector3.zero);
  }

  public get position() {
    return this._position;
  }

  public get rotation() {
    return this._rotation;
  }

  public setPosition(position: Vector3): Transform3D;
  public setPosition(x: number, y: number, z: number): Transform3D;
  public setPosition(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._position = arg1;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._position = new Vector3(arg1, y, z);
    } else {
      throw new Error("Invalid arguments provided to add rotation function");
    }

    return this;
  }

  public setRotate(position: Vector3): Transform3D;
  public setRotate(x: number, y: number, z: number): Transform3D;
  public setRotate(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._rotation = arg1;
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._rotation = new Vector3(arg1, y, z);
    } else {
      throw new Error("Invalid arguments provided to add rotation function");
    }

    return this;
  }

  public addRotation(vector: Vector3): Transform3D;
  public addRotation(x: number, y: number, z: number): Transform3D;
  public addRotation(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._rotation.add(arg1);
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._rotation.add(arg1, y, z);
    } else {
      throw new Error("Invalid arguments provided to add rotation function");
    }

    return this;
  }

  public addPosition(vector: Vector3): Transform3D;
  public addPosition(x: number, y: number, z: number): Transform3D;
  public addPosition(arg1: number | Vector3, y?: number, z?: number) {
    if (arg1 instanceof Vector3) {
      this._position.add(arg1);
    } else if (
      typeof arg1 === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this._position.add(arg1, y, z);
    } else {
      throw new Error("Invalid arguments provided to add position function");
    }

    return this;
  }

  public toCSS() {
    let result = `translate3d(${this._position.x}px, ${this._position.y}px, ${this._position.z}px) `;
    result += `rotateZ(${this._rotation.z}deg) `;
    result += `rotateY(${this._rotation.y}deg) `;
    result += `rotateX(${this._rotation.x}deg)`;

    return result;
  }
}
