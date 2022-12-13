import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";
function useFetch({ url }) {
  const { data, error } = useSWR(url, fetcher);
  const statusCode = error?.response.status;
  handleError(statusCode);
  return { data, error };
}
export default useFetch;
