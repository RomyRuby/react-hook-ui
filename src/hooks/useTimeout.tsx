import { useEffect, useRef, useCallback } from "react";

const useTimeout = (fn: () => void, delay?: number) => {
  const timerRef = useRef<number>(0);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    const test = setTimeout(fn, delay);
    timerRef.current = test;
    return clear;
  }, [delay]);
};

export default useTimeout;
