import { useEffect } from "react";
import { PROJECT_NAME } from "src/utils/const/text-const";

export const useDocumentTitle = (
  documentTitle: string,
  deps: unknown[] = []
) => {
  useEffect(() => {
    document.title = documentTitle;

    return () => {
      document.title = PROJECT_NAME;
    };
  }, [documentTitle, deps]);
};
