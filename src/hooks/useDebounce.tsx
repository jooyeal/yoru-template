import React, { useState, useEffect } from "react";

type Props = {
  value: string;
  delay: number;
};

const useDebounce = ({ value, delay }: Props): string => {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
