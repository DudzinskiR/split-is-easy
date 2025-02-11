import axios from "axios";

import { getToken } from "../firebase/firebaseHelper";
import { DefaultResponse } from "src/types/response/DefaultResponse";

export class API {
  private static API_ROOT = `${import.meta.env.VITE_API_ROOT}/api`;

  private static async getTokenID() {
    try {
      return await getToken();
    } catch (e) {
      return "";
    }
  }

  private static async prepareHeaders(headers?: object) {
    return { ...headers, Authorization: `Bearer ${await this.getTokenID()}` };
  }

  public static async get<T>(url: string, headers?: object) {
    try {
      const res = await axios.get<T>(`${this.API_ROOT}/${url}`, {
        headers: await this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async post<T>(url: string, body?: unknown, headers?: object) {
    try {
      const res = await axios.post<T>(`${this.API_ROOT}/${url}`, body, {
        headers: await this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async put<T>(url: string, body?: unknown, headers?: object) {
    try {
      const res = await axios.put<T>(`${this.API_ROOT}/${url}`, body, {
        headers: await this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async delete<T>(url: string, headers?: object) {
    try {
      const res = await axios.delete<T>(`${this.API_ROOT}/${url}`, {
        headers: await this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static isOk(res: unknown): res is DefaultResponse {
    if (typeof res !== "object") return false;
    if (res === null) return false;
    if ("status" in res === false) return false;
    if (typeof res.status !== "string") return false;
    if (res.status !== "ok") return false;

    return true;
  }
}
