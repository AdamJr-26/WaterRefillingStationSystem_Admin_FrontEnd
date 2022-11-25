import fetcher from "./fetcher";
import useSWR from "swr";

function useGallon({ url }) {
  const { data: gallon, error: gallonError } = useSWR(url, fetcher);
  return { gallon, gallonError };
}
export default useGallon;
