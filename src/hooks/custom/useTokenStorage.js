import { useState, useEffect } from "react";

export default function useTokenStorage(key, new_token) {
  const [token, setToken] = useState('');

//   set token

  useEffect(() => {
    const getSavedToken = async () => {
      const savedToken = localStorage.getItem(key);
      if (savedToken) {
        setToken(savedToken);
      }
    };
    getSavedToken();
  }, [token]);

  return [token];
}
 