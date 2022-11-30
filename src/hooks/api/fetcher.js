import axiosAPI from "../../services/axios";
// const fetcher = (...args) => axios.get(...args).then((res) => res.data);
const fetcher = async (...args) => {
  const res = await axiosAPI().get(...args);
  return res.data;
};

export default fetcher;
