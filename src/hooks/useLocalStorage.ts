import { useCallback, useState } from 'react';

export const useLocalStorage = <T = unknown>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        throw new Error('unable to set value');
      }
    },
    [key, setStoredValue],
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch {
      throw new Error('unable to remove value');
    }
  }, [key, setStoredValue]);

  return [storedValue, setValue, removeValue];
};
