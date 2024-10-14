import { SetStateAction, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (prev: SetStateAction<T>) => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (valueOrUpdater: SetStateAction<T>): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        valueOrUpdater instanceof Function
          ? valueOrUpdater(storedValue)
          : valueOrUpdater;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
