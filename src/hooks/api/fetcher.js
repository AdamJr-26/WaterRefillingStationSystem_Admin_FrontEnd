import axiosAPI from "../../services/axios";

const fetcher = async (...args) => {
  const res = await axiosAPI().get(...args);
  return res.data;
};

export default fetcher;
