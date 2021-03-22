import { useEffect } from 'react';

export const useMount = (fn: () => void) => {
  return useEffect(() => {
    fn();
  }, []);
};
