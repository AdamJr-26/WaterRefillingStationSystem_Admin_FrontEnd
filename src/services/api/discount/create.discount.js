import axiosAPI from "../../axios";
import handleError from "../../axios.handleError";

export const createDiscount = async ({ url, payload }) => {
  console.log("payload", payload);
  try {
    const data = payload;
    const res = await axiosAPI().post(url, data);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
