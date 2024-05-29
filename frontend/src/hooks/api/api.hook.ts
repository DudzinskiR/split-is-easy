import { API } from "src/utils/api/api";

interface APIConfig<T> {
  url: string;
  body?: unknown;
  headers?: object;
  onSuccess?: (result: T) => void;
  onError?: (error?: Error) => void;
  onFinally?: () => void;
  checkIsOk?: boolean;
}

export const useAPI = () => {
  const put = async <T = unknown>(config: APIConfig<T>) => {
    try {
      const result = await API.put<T>(config.url, config.body, config.headers);
      if (!result) return;

      if (config.onSuccess) {
        if (config.checkIsOk) {
          checkIsOk(result, config.onSuccess);
        } else {
          config.onSuccess(result);
        }
      }
      return result;
    } catch (e) {
      if (config.onError) {
        config.onError(e as Error);
      }
    } finally {
      if (config.onFinally) config.onFinally();
    }
  };

  const post = async <T = unknown>(config: APIConfig<T>) => {
    try {
      const result = await API.post<T>(config.url, config.body, config.headers);
      if (!result) return;

      if (config.onSuccess) {
        if (config.checkIsOk) {
          checkIsOk(result, config.onSuccess);
        } else {
          config.onSuccess(result);
        }
      }
      return result;
    } catch (e) {
      if (config.onError) {
        config.onError(e as Error);
      }
    } finally {
      if (config.onFinally) config.onFinally();
    }
  };

  const del = async <T = unknown>(config: APIConfig<T>) => {
    try {
      const result = await API.delete<T>(config.url, config.headers);
      if (!result) return;

      if (config.onSuccess) {
        if (config.checkIsOk) {
          checkIsOk(result, config.onSuccess);
        } else {
          config.onSuccess(result);
        }
      }
      return result;
    } catch (e) {
      if (config.onError) {
        config.onError(e as Error);
      }
    } finally {
      if (config.onFinally) config.onFinally();
    }
  };

  const checkIsOk = <T>(result: T, onSuccess: (result: T) => void) => {
    if (API.isOk(result)) {
      onSuccess(result);
    } else {
      throw new Error("Incorrect response");
    }
  };

  return { put, post, del };
};
