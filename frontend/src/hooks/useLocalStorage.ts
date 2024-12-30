import { useEffect, useState } from "react";

function useLocalStorage(key: string) {
  const [item, setItem] = useState<string | null>("");

  useEffect(() => {
    setItem(window.localStorage.getItem(key));
  }, []);

  return item;
}

export default useLocalStorage;
