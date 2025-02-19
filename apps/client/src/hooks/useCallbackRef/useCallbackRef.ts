import { useEffect, useMemo, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCallbackRef = <T extends (...arg: any[]) => any>(
  callback: T | undefined,
): T => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...arg) => callbackRef.current?.(...arg)) as T, []);
};

export default useCallbackRef;
