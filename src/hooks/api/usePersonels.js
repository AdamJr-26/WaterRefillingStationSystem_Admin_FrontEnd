import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";
function usePersonels({ url }) {
  const { data: personels, error: personelsError } = useSWR(url, fetcher);
  const statusCode = personelsError?.response.status;
  handleError(statusCode)
  return { personels, personelsError };
}
export default usePersonels;
