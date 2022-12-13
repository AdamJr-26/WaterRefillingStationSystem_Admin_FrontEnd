import axiosAPI from "../../axios";
import handleError from "../../axios.handleError";

export const DeliveryAccept = async (delivery) => {
  try {
    console.log("deliverydelivery", delivery);
    const delivery_personel_id = delivery.delivery_personel._id;
    const vehicle_id = delivery.vehicle._id;
    const delivery_id = delivery._id;
    // popuplate gallons list
    const gallons = [];
    const delivery_items = delivery?.delivery_items;
    for (let i = 0; i < delivery_items.length; i++) {
      const _id = delivery_items[i]?.gallon?._id;
      const total = delivery_items[i]?.total;
      gallons.push({ _id, total });
    }
    const payload = {
      delivery_personel_id,
      vehicle_id,
      delivery_id,
      gallons,
    };
    console.log("delivery_personel", delivery_personel_id);
    // call api here

    const res = await axiosAPI().put("/api/delivery", payload);
    // return { personelApplyData: res.data };
    return { data: res?.data };
  } catch (error) {
    // const statusCode = error?.response?.status;
    // handleError(statusCode);
    console.log("erro", error)
    return { error };
  }
};
