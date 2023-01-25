import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";
function usePersonnels({ url }) {
  const { data: personnels, error: personnelsError } = useSWR(url, fetcher);
  const statusCode = personnelsError?.response.status;
  handleError(statusCode);
  return { personnels, personnelsError };
}
export default usePersonnels;
