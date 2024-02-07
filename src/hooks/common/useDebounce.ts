import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 지연시간 지난 후 값 업데이트
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      // 값이 바뀌거나 언마운트되면 기존 타이머 취소
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
