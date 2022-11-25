import { axios } from "../../axios";

export const addGallon = async (object, file) => {
  const formData = new FormData();
  console.log("file", file);
  formData.append("data", JSON.stringify(object));
  formData.append("image", file);
  try {
    const res = await axios.post("/api/gallon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};

export const addVehicle = async (object, file) => {
  console.log("file", file);
  const formData = new FormData();
  formData.append("data", JSON.stringify(object));
  formData.append("image", file);
  try {
    const res = await axios.post("/api/vehicle", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};

export const updateGallon = async ({ url, payload }) => {
  try {
    const data = payload;
    const res = await axios.put(url, data);
    return { updatedGallon: res };
  } catch (error) {
    return { error };
  }
};
