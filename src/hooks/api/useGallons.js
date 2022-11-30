import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";

function useGallons({ url }) {
  const { data: gallons, error: gallonsError } = useSWR(url, fetcher);
  const statusCode = gallonsError?.response.status;
  handleError(statusCode)
  return { gallons, gallonsError };
}
export default useGallons;
