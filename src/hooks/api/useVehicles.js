import fetcher from "./fetcher";
import useSWR from "swr";
import handleError from "../../services/axios.handleError";

function useVehicles({ url }) {
  const { data: vehicles, error: vehiclesError } = useSWR(url, fetcher);
  const statusCode = vehiclesError?.response.status;
  handleError(statusCode);
  return { vehicles, vehiclesError };
}
export default useVehicles;
