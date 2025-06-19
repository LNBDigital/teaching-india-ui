// global.ts
import { useEffect, useState } from "react";

export const useMacCheck = (): boolean => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.userAgent));
  }, []);

  return isMac;
};
