import { useEffect, useState } from "react";
import { RequestStatus } from "src/enums";
import { API } from "src/utils/api";

interface ApiConfig<T> {
  endpoint: string;
  initValue?: T;
  onSuccess?: (data?: T) => void;
  onError?: (error?: string) => void;
}

export const useFetch = <T>(config: string | ApiConfig<T>) => {
  const [data, setData] = useState<T | undefined>(
    typeof config === "string" ? undefined : config.initValue
  );
  const [status, setStatus] = useState(RequestStatus.IDLE as RequestStatus);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(RequestStatus.LOADING);

        const res = await API.get<T>(
          typeof config === "string" ? config : config.endpoint
        );

        setStatus(RequestStatus.SUCCESS);
        setError("");
        setData(res);

        if (typeof config !== "string" && config.onSuccess) {
          config.onSuccess(res);
        }
      } catch (e) {
        setStatus(RequestStatus.ERROR);
        setError("Error");
        if (typeof config !== "string" && config.onError) {
          config.onError("Error");
        }
      }
    };

    fetchData();
  }, [config]);

  return { data, status, error };
};
