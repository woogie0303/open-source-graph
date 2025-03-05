import { useCallbackRef } from "@/hooks/useCallbackRef";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (value: T) => void;
}

const useControllableState = <T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>) => {
  const [unControlledProp, setUnControlledProp] = useUnControlledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : unControlledProp;
  const onChangeCallbackRef = useCallbackRef(onChange);

  const setValue: React.Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const value =
          typeof nextValue === "function"
            ? (nextValue as (pre: T) => T)(prop)
            : nextValue;

        if (value !== prop) {
          onChangeCallbackRef(nextValue as T);
        }
      }

      if (!isControlled) {
        setUnControlledProp(nextValue);
      }
    },
    [isControlled, onChangeCallbackRef, prop, setUnControlledProp],
  );

  return [value, setValue] as const;
};

function useUnControlledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const unControlledState = useState<T | undefined>(defaultProp);
  const [value] = unControlledState;
  const preValueRef = useRef(value);
  const onChangeCallbackRef = useCallbackRef(onChange);

  useEffect(() => {
    if (value !== preValueRef.current) {
      onChangeCallbackRef(value as T);
      preValueRef.current = value;
    }
  }, [onChangeCallbackRef, value]);

  return unControlledState;
}

export default useControllableState;
