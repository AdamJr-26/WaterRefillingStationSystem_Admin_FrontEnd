import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";
function useFetch({ url }) {
  const { data, error, mutate, isValidating,isLoading } = useSWR(url, fetcher);
  const statusCode = error?.response.status;
  handleError(statusCode);
  return { data, error, mutate, isValidating, isLoading };
}
export default useFetch;
