import { useCallback, useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setNextValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => {
    setNextValue(!value);
  }, [value, setNextValue]);

  return [value, toggleValue];
};
