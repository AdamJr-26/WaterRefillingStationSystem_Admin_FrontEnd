import { axios } from "../../axios";

export const updatePassword = (payload) => {
  return axios.post("/auth/admin/update-password", payload);
};
