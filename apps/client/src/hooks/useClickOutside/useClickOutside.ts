import { RefObject, useCallback, useEffect, useRef } from "react";

const useClickOutside = ({
  elementRef,
  callback,
}: {
  elementRef: RefObject<Element | null>;
  callback: () => void;
}) => {
  const updatableCallbackRef = useRef<() => void>(null);
  updatableCallbackRef.current = callback;

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        elementRef &&
        !elementRef.current?.contains(e.target as Element) &&
        updatableCallbackRef.current
      ) {
        updatableCallbackRef.current();
      }
    },
    [elementRef],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;
