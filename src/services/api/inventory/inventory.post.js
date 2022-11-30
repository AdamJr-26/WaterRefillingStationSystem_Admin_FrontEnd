import axiosAPI from "../../axios";
import handleError from "../../axios.handleError";

export const addGallon = async (object, file) => {
  const formData = new FormData();
  console.log("file", file);
  formData.append("data", JSON.stringify(object));
  formData.append("image", file);
  try {
    const res = await axiosAPI().post("/api/gallon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: res.data };
  } catch (error) {
    const statusCode = error?.response.status;
    handleError(statusCode);
    return { error };
  }
};

export const addVehicle = async (object, file) => {
  console.log("file", file);
  const formData = new FormData();
  formData.append("data", JSON.stringify(object));
  formData.append("image", file);
  try {
    const res = await axiosAPI().post("/api/vehicle", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: res.data };
  } catch (error) {
    const statusCode = error?.response.status;
    handleError(statusCode);
    return { error };
  }
};

export const updateGallon = async ({ url, payload }) => {
  try {
    const data = payload;
    const res = await axiosAPI().put(url, data);
    return { updatedGallon: res };
  } catch (error) {
    const statusCode = error?.response.status;
    handleError(statusCode);
    return { error };
  }
};
