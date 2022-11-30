import axiosAPI from "../../axios";
import handleError from "../../axios.handleError";

export const applyNewPersonel = async ({ payload, url }) => {
  try {
    const data = payload;
    const res = await axiosAPI().post(url, data);
    return { personelApplyData: res.data };
  } catch (error) {
    const statusCode = error?.response.status;
    handleError(statusCode);
    const err = error?.response?.data?.errors;
    return { error: err };
  }
};
