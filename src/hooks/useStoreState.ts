import { useCallback, useState } from "react";

type UseStorableState<T> = [value: T, setValue: (value: T) => void];
type Validator<T> = (value: unknown) => value is T;

const getItem = <T>(key: string, fallback: T, validator?: Validator<T>): T => {
  const json = localStorage.getItem(key);
  if (json == null) return fallback;

  try {
    const value: unknown = JSON.parse(json);
    if (validator && !validator(value)) return fallback;

    return value as T;
  } catch (err) {
    console.error(err);
    return fallback;
  }
};

const setItem = <T>(key: string, value: T): void => {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
};

export const useStoreState = <T>(
  key: string,
  fallback: T,
  validator?: Validator<T>
): UseStorableState<T> => {
  const [value, setValue] = useState<T>(getItem(key, fallback, validator));
  const setStoreValue = useCallback(
    (value: T) => {
      setValue(value);
      setItem(key, value);
    },
    [key]
  );

  return [value, setStoreValue];
};
