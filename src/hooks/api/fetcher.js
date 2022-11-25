import { axios } from "../../services/axios";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default fetcher;
