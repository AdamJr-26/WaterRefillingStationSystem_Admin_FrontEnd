import fetcher from "./fetcher";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

function SWR({ url }) {
  const [mounted, setMounted] = useState(false);
  const { data, error } = useSWR(mounted ? url : null, fetcher);
  useEffect(() => {
    setMounted(true);
  }, []);
  return { data, error };
}
export default SWR;
