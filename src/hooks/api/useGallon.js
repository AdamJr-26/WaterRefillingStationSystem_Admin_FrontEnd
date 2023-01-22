import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";

function useGallon({ url }) {
  const { data: gallon, error: gallonError } = useSWR(url, fetcher);
  const statusCode = gallonError?.response.status;
  handleError(statusCode);
  return { gallon, gallonError };
}
export default useGallon;
