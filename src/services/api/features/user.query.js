import axiosAPI from "../../axios";
import handleError from "../../axios.handleError";

export const updatePassword = (payload) => {
  return axiosAPI().post("/auth/admin/update-password", payload);
  
};
