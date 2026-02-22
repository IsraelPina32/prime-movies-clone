import { useEffect, useState } from "react";

/**
 * Hook of the lodaing is updated with value after a delay.
 * @param value the value change faster (input)
 * @param delay the delay time in milliseconds
 */

export function useDebounce<T>(value: T, delay: number):  T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};