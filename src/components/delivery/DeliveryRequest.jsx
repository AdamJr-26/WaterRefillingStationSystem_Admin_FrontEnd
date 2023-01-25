import React, { useState } from "react";
import useFetch from "../../hooks/api/useFetch";
import { DeliveryAccept } from "../../services/api/delivery/delivery.accept";
import useSWR, { useSWRConfig } from "swr";
import { useToast, Button } from "@chakra-ui/react";
import NoData from "../general/NoData";

function DeliveryRequest() {
  const { data, error } = useFetch({ url: "/api/deliveries/pending" });
  const deliveries = data?.data;
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  if (deliveries && !error) {
    //update deliveries list->object
    let gallon_total = 0;
    for (let i = 0; i < deliveries?.length; i++) {
      for (let j = 0; j < deliveries[i].delivery_items.length; j++) {
        gallon_total = gallon_total + deliveries[i]?.delivery_items[j].total;
      }
      deliveries[i].total_item = gallon_total;
    }

    const handleAccept = async (delivery) => {
      setIsLoadingAccept(true);
      const { data: acceptDelivery, error: acceptDeliveryError } =
        await DeliveryAccept(delivery);
      if (acceptDelivery && !acceptDeliveryError) {
        mutate("/api/deliveries/pending");
        setIsLoadingAccept(false);
        toast({
          title: "Accept Delivery ",
          description: "Accept Delivery Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setIsLoadingAccept(false);
        toast({
          title: "Accept Delivery",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    return (
      <div className="delivery-request-wrapper--cards">
        {deliveries.length ? (
          deliveries?.map((delivery) => (
            <div
              key={delivery?._id}
              className="delivery-request-wrapper--cards__card"
            >
              <div className="delivery-card-info">
                <table className="delivery-card-info--delivery-item-table">
                  <tbody>
                    <tr>
                      <th>Gallon Name</th>
                      <th>Count</th>
                    </tr>
                    {delivery?.delivery_items?.map((item) => (
                      <tr key={item?._id}>
                        <td>{item?.gallon?.name}</td>
                        <td>{item?.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="delivery-card-info--personel-info">
                  <img
                    src="https://cdn.motor1.com/images/mgl/nOlNy/s1/1x1/elon-musk.webp"
                    alt="personel"
                    className="delivery-card-info--personel-info__image"
                  />
                  <p className="delivery-card-info--personel-info__name">
                    {delivery?.delivery_personel?.firstname +
                      " " +
                      delivery?.delivery_personel?.lastname}
                  </p>
                  <div className="delivery-card-info--personel-info__total">
                    <p>Total</p>
                    <p>{delivery?.total_item}</p>
                  </div>
                </div>
              </div>

              <div className="delivery-card-buttons">
                <div className="delivery-card-buttons--vehicle-id">
                  <p>{delivery?.vehicle?.vehicle_name}</p>
                  <p>{delivery?.vehicle?.vehicle_id}</p>
                </div>
                <div className="delivery-card-buttons--button">
                  <button>Reject</button>
                  <Button
                    isLoading={isLoadingAccept}
                    loadingText=""
                    onClick={() => handleAccept(delivery)}
                  >
                    Accept
                  </Button>
                  {/* <button >Accept</button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    );
  } else {
    return (
      <div>
        {/* USE FRAMER */}
        <h1>LOADING..</h1>
      </div>
    );
  }
}

export default DeliveryRequest;
