import fetcher from "./fetcher";
import useSWR from "swr";

function useGallons({ url }) {
  const { data: gallons, error: gallonsError } = useSWR(url, fetcher);
  console.log("gallonsError",gallonsError)
  return { gallons, gallonsError };
}
export default useGallons;
